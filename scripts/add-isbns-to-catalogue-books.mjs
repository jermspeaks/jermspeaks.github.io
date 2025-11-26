#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const catalogueBookDir = path.join(projectRoot, "src", "content", "catalogueBook");

function logInfo(message) {
  console.log(`ℹ️  ${message}`);
}

function logSuccess(message) {
  console.log(`✅ ${message}`);
}

function logWarn(message) {
  console.log(`⚠️  ${message}`);
}

function logError(message) {
  console.error(`❌ ${message}`);
}

async function searchOpenLibrary(title, author, limit = 10) {
  // Build search query - try with author first if available
  let query = title;
  if (author) {
    query = `title:"${title}" author:"${author}"`;
  } else {
    query = `title:"${title}"`;
  }
  
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    if (!data.docs || data.docs.length === 0) {
      return [];
    }
    
    // Format results
    return data.docs.map((doc) => {
      const isbn13 = doc.isbn?.[0] || doc.isbn_13?.[0] || null;
      const isbn10 = doc.isbn_10?.[0] || null;
      const isbn = isbn13 || isbn10 || null;
      
      return {
        title: doc.title || "Unknown Title",
        authors: doc.author_name || [],
        firstPublishedYear: doc.first_publish_year || null,
        isbn,
        isbn13,
        isbn10,
        coverId: doc.cover_i || null,
        key: doc.key || null,
      };
    });
  } catch (error) {
    logError(`Failed to search Open Library: ${error.message}`);
    return [];
  }
}

async function fetchBookDetailsByKey(olKey) {
  if (!olKey) return null;
  
  try {
    // Open Library keys are like "/works/OL123456W" or "/books/OL123456M"
    // We need to fetch editions to get ISBNs
    const cleanKey = olKey.startsWith("/") ? olKey : `/${olKey}`;
    
    // Try to get editions for this work/book
    let editionsUrl;
    if (cleanKey.startsWith("/works/")) {
      editionsUrl = `https://openlibrary.org${cleanKey}/editions.json?limit=10`;
    } else if (cleanKey.startsWith("/books/")) {
      // For books, try to get the work first, then editions
      const bookUrl = `https://openlibrary.org${cleanKey}.json`;
      try {
        const bookResponse = await fetch(bookUrl);
        if (bookResponse.ok) {
          const bookData = await bookResponse.json();
          // Check if book has ISBNs directly
          const isbn13 = bookData.isbn_13?.[0] || bookData.identifiers?.isbn_13?.[0] || null;
          const isbn10 = bookData.isbn_10?.[0] || bookData.identifiers?.isbn_10?.[0] || null;
          const isbn = isbn13 || isbn10 || null;
          if (isbn) {
            return { isbn, isbn13, isbn10 };
          }
          // If no ISBN, try to get work key
          if (bookData.works && bookData.works.length > 0) {
            const workKey = bookData.works[0].key;
            editionsUrl = `https://openlibrary.org${workKey}/editions.json?limit=10`;
          } else {
            return null;
          }
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
    
    // Fetch editions
    const editionsResponse = await fetch(editionsUrl);
    if (!editionsResponse.ok) {
      return null;
    }
    
    const editionsData = await editionsResponse.json();
    if (!editionsData.entries || editionsData.entries.length === 0) {
      return null;
    }
    
    // Look through editions for one with ISBN
    for (const edition of editionsData.entries) {
      const isbn13 = edition.isbn_13?.[0] || edition.identifiers?.isbn_13?.[0] || null;
      const isbn10 = edition.isbn_10?.[0] || edition.identifiers?.isbn_10?.[0] || null;
      const isbn = isbn13 || isbn10 || null;
      
      if (isbn) {
        return { isbn, isbn13, isbn10 };
      }
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

function calculateSimilarity(str1, str2) {
  if (!str1 || !str2) return 0;
  
  const s1 = str1.toLowerCase().replace(/[^\w\s]/g, "").trim();
  const s2 = str2.toLowerCase().replace(/[^\w\s]/g, "").trim();
  
  if (s1 === s2) return 1.0;
  
  // Check if one contains the other
  if (s1.includes(s2) || s2.includes(s1)) {
    return 0.8;
  }
  
  // Word overlap
  const words1 = new Set(s1.split(/\s+/));
  const words2 = new Set(s2.split(/\s+/));
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

function findBestMatch(searchResults, originalTitle, originalAuthor) {
  if (searchResults.length === 0) return null;
  
  // Score results by similarity
  const scoredResults = searchResults.map(result => {
    let score = 0;
    
    // Title similarity (weighted heavily)
    const titleScore = calculateSimilarity(originalTitle, result.title);
    score += titleScore * 0.7;
    
    // Author similarity
    if (originalAuthor && result.authors.length > 0) {
      const authorScores = result.authors.map(a => 
        calculateSimilarity(originalAuthor, a)
      );
      const maxAuthorScore = Math.max(...authorScores);
      score += maxAuthorScore * 0.3;
    }
    
    // Bonus for having ISBN
    if (result.isbn) {
      score += 0.1;
    }
    
    return { ...result, score };
  }).sort((a, b) => b.score - a.score);
  
  // Return the best match if score is above threshold
  const bestMatch = scoredResults[0];
  if (bestMatch.score >= 0.6) {
    return bestMatch;
  }
  
  return null;
}

function formatFrontmatter(frontmatter) {
  const lines = ["---"];

  for (const [key, value] of Object.entries(frontmatter)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map((v) => `"${String(v).replace(/"/g, '\\"')}"`).join(", ")}]`);
    } else if (typeof value === "string") {
      const escaped = value.replace(/"/g, '\\"').replace(/\n/g, "\\n");
      lines.push(`${key}: "${escaped}"`);
    } else if (value instanceof Date) {
      lines.push(`${key}: "${value.toISOString()}"`);
    } else if (typeof value === "object") {
      lines.push(`${key}: ${JSON.stringify(value)}`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }

  lines.push("---");
  return lines.join("\n");
}

async function processBookFile(filePath) {
  const filename = path.basename(filePath);
  
  try {
    // Read markdown file
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data: frontmatter, content } = matter(fileContent);
    
    // Skip if ISBN already exists
    if (frontmatter.isbn) {
      return { status: "skipped", reason: "already_has_isbn" };
    }
    
    // Get title and author
    const title = frontmatter.title;
    const author = frontmatter.bookAuthor || (frontmatter.authors && frontmatter.authors[0]) || null;
    
    if (!title) {
      return { status: "skipped", reason: "no_title" };
    }
    
    logInfo(`Searching for: "${title}"${author ? ` by ${author}` : ""}`);
    
    // Search Open Library
    const searchResults = await searchOpenLibrary(title, author, 10);
    
    if (searchResults.length === 0) {
      logWarn(`  No results found for "${title}"`);
      return { status: "not_found", title, author };
    }
    
    // Find best match
    let bestMatch = findBestMatch(searchResults, title, author);
    
    if (!bestMatch) {
      logWarn(`  No good match found for "${title}"`);
      return { status: "no_match", title, author, searchResults };
    }
    
    // If match found but no ISBN, try to fetch it from Open Library key
    if (!bestMatch.isbn && bestMatch.key) {
      logInfo(`  Fetching ISBN from Open Library key: ${bestMatch.key}`);
      const isbnData = await fetchBookDetailsByKey(bestMatch.key);
      if (isbnData && isbnData.isbn) {
        bestMatch.isbn = isbnData.isbn;
        bestMatch.isbn13 = isbnData.isbn13;
        bestMatch.isbn10 = isbnData.isbn10;
        logInfo(`  Found ISBN: ${bestMatch.isbn}`);
      } else {
        logWarn(`  Could not fetch ISBN for "${title}"`);
        return { status: "no_isbn", title, author, bestMatch };
      }
    }
    
    if (!bestMatch.isbn) {
      logWarn(`  No ISBN available for "${title}"`);
      return { status: "no_isbn", title, author, bestMatch };
    }
    
    // Update frontmatter with ISBN
    frontmatter.isbn = bestMatch.isbn;
    
    // Write updated markdown back to file
    const updatedContent = formatFrontmatter(frontmatter) + "\n\n" + content.trim();
    await fs.writeFile(filePath, updatedContent, "utf-8");
    
    logSuccess(`  Added ISBN ${bestMatch.isbn} to "${title}"`);
    return { status: "updated", title, isbn: bestMatch.isbn };
    
  } catch (error) {
    logError(`Error processing ${filename}: ${error.message}`);
    return { status: "error", filename, error: error.message };
  }
}

async function main() {
  logInfo("Starting ISBN addition to catalogue books...");
  
  // Get all markdown files
  const files = await fs.readdir(catalogueBookDir);
  const markdownFiles = files.filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
  
  logInfo(`Found ${markdownFiles.length} catalogue book files`);
  
  let updated = 0;
  let skipped = 0;
  let notFound = 0;
  let noMatch = 0;
  let errors = 0;
  
  const notFoundBooks = [];
  const noMatchBooks = [];
  const errorBooks = [];
  
  // Process each file
  for (let i = 0; i < markdownFiles.length; i++) {
    const file = markdownFiles[i];
    const filePath = path.join(catalogueBookDir, file);
    
    logInfo(`\n[${i + 1}/${markdownFiles.length}] Processing ${file}...`);
    
    const result = await processBookFile(filePath);
    
    switch (result.status) {
      case "updated":
        updated++;
        break;
      case "skipped":
        skipped++;
        break;
      case "not_found":
        notFound++;
        notFoundBooks.push({ file, title: result.title, author: result.author });
        break;
      case "no_match":
        noMatch++;
        noMatchBooks.push({ file, title: result.title, author: result.author });
        break;
      case "error":
        errors++;
        errorBooks.push({ file, error: result.error });
        break;
    }
    
    // Add delay to avoid rate limiting (500ms between requests)
    if (i < markdownFiles.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  
  // Summary
  console.log("\n" + "=".repeat(60));
  logInfo("ISBN Addition Summary:");
  logSuccess(`  Updated with ISBN: ${updated}`);
  logWarn(`  Skipped (already has ISBN): ${skipped}`);
  if (notFound > 0) {
    logWarn(`  Not found in Open Library: ${notFound}`);
  }
  if (noMatch > 0) {
    logWarn(`  No good match found: ${noMatch}`);
  }
  if (errors > 0) {
    logError(`  Errors: ${errors}`);
  }
  console.log("=".repeat(60));
  
  // Show details for books that couldn't be matched
  if (notFoundBooks.length > 0) {
    console.log("\nBooks not found in Open Library:");
    notFoundBooks.forEach(({ file, title, author }) => {
      console.log(`  - ${file}: "${title}"${author ? ` by ${author}` : ""}`);
    });
  }
  
  if (noMatchBooks.length > 0) {
    console.log("\nBooks with no good match:");
    noMatchBooks.forEach(({ file, title, author }) => {
      console.log(`  - ${file}: "${title}"${author ? ` by ${author}` : ""}`);
    });
  }
  
  if (errorBooks.length > 0) {
    console.log("\nBooks with errors:");
    errorBooks.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }
}

main().catch((error) => {
  logError(`Fatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});

