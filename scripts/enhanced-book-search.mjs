#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";
import sharp from "sharp";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const catalogueBookDir = path.join(projectRoot, "src", "content", "catalogueBook");
const imagesDir = path.join(projectRoot, "src", "images", "catalogueBook");

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

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
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

// ============================================================================
// Strategy 1: Title Variations
// ============================================================================

function extractMainTitle(title) {
  if (!title) return "";
  
  // Remove subtitle (everything after : or ;)
  let mainTitle = title.split(/[:;]/)[0].trim();
  
  // Remove common prefixes
  const prefixes = ["The ", "A ", "An "];
  for (const prefix of prefixes) {
    if (mainTitle.toLowerCase().startsWith(prefix.toLowerCase())) {
      mainTitle = mainTitle.slice(prefix.length).trim();
      break;
    }
  }
  
  return mainTitle;
}

function normalizeTitleForSearch(title) {
  if (!title) return "";
  
  // Remove subtitle
  let normalized = extractMainTitle(title);
  
  // Normalize punctuation and spaces
  normalized = normalized
    .replace(/[^\w\s]/g, " ") // Replace special chars with space
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
  
  return normalized;
}

function getTitleVariations(title) {
  const variations = [];
  
  if (!title) return variations;
  
  // Original title
  variations.push(title);
  
  // Main title without subtitle
  const mainTitle = extractMainTitle(title);
  if (mainTitle !== title) {
    variations.push(mainTitle);
  }
  
  // Without common prefixes
  const prefixes = ["The ", "A ", "An "];
  for (const prefix of prefixes) {
    if (title.toLowerCase().startsWith(prefix.toLowerCase())) {
      variations.push(title.slice(prefix.length).trim());
      break;
    }
  }
  
  // Normalized (no punctuation)
  const normalized = normalizeTitleForSearch(title);
  if (normalized !== title && normalized.length > 0) {
    variations.push(normalized);
  }
  
  // First 3-5 words
  const words = title.split(/\s+/);
  if (words.length > 5) {
    variations.push(words.slice(0, 5).join(" "));
  }
  if (words.length > 3) {
    variations.push(words.slice(0, 3).join(" "));
  }
  
  // First word only (if title is long)
  if (words.length > 2) {
    variations.push(words[0]);
  }
  
  // Remove duplicates
  return [...new Set(variations)];
}

// ============================================================================
// Strategy 2: Author Name Variations
// ============================================================================

function splitAuthors(author) {
  if (!author) return [];
  
  // Split by common separators
  const separators = [/\s+and\s+/i, /\s*,\s*/, /\s+&\s+/];
  let authors = [author];
  
  for (const sep of separators) {
    const newAuthors = [];
    for (const auth of authors) {
      newAuthors.push(...auth.split(sep));
    }
    authors = newAuthors;
  }
  
  return authors.map(a => a.trim()).filter(a => a.length > 0);
}

function getAuthorVariations(author) {
  const variations = [];
  
  if (!author) return variations;
  
  // Original author
  variations.push(author);
  
  // Split multiple authors
  const authors = splitAuthors(author);
  if (authors.length > 1) {
    // First author only
    variations.push(authors[0]);
    
    // Each author individually
    authors.forEach(a => {
      if (a !== author) variations.push(a);
    });
  }
  
  // Last name only (assume last word is last name)
  const words = author.split(/\s+/);
  if (words.length > 1) {
    variations.push(words[words.length - 1]);
  }
  
  // Without middle initials (remove single letters)
  const withoutInitials = words
    .filter(w => w.length > 1 || !/^[A-Z]\.?$/.test(w))
    .join(" ");
  if (withoutInitials !== author && withoutInitials.length > 0) {
    variations.push(withoutInitials);
  }
  
  // Normalized (remove extra spaces)
  const normalized = author.replace(/\s+/g, " ").trim();
  if (normalized !== author) {
    variations.push(normalized);
  }
  
  // Remove duplicates
  return [...new Set(variations)];
}

// ============================================================================
// Strategy 3-6: Search Functions
// ============================================================================

async function searchOpenLibrary(query, limit = 10) {
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

async function fetchBookDetailsByISBN(isbn) {
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const bookData = data[`ISBN:${isbn}`];
    
    if (!bookData || !bookData.details) {
      return null;
    }
    
    return bookData;
  } catch (error) {
    logError(`Failed to fetch book details for ISBN ${isbn}: ${error.message}`);
    return null;
  }
}

async function downloadCover(coverId, thumbnailUrl, outputPath) {
  let coverURL = null;
  
  // Prefer thumbnail_url if available, otherwise use coverId
  if (thumbnailUrl) {
    coverURL = thumbnailUrl.replace("-S", "-L");
  } else if (coverId) {
    // Open Library cover API: https://covers.openlibrary.org/b/id/{coverId}-L.jpg
    coverURL = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  } else {
    return false;
  }
  
  try {
    const response = await fetch(coverURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Convert to PNG
    await sharp(buffer).png().toFile(outputPath);
    
    return true;
  } catch (error) {
    logError(`Failed to download cover: ${error.message}`);
    return false;
  }
}

// Strategy 3: Progressive Query Relaxation
async function searchWithProgressiveRelaxation(title, author) {
  const strategies = [];
  
  // 1. Strict with quotes
  if (author) {
    strategies.push(`title:"${title}" author:"${author}"`);
  }
  strategies.push(`title:"${title}"`);
  
  // 2. Without quotes
  if (author) {
    strategies.push(`title:${title} author:${author}`);
  }
  strategies.push(`title:${title}`);
  
  // 3. Title only (no field prefix)
  strategies.push(title);
  
  // 4. Main title variations
  const titleVars = getTitleVariations(title);
  for (const titleVar of titleVars) {
    if (titleVar !== title) {
      strategies.push(`title:"${titleVar}"`);
      strategies.push(titleVar);
    }
  }
  
  // 5. Title + author variations
  if (author) {
    const authorVars = getAuthorVariations(author);
    for (const authorVar of authorVars) {
      if (authorVar !== author) {
        strategies.push(`title:"${title}" author:"${authorVar}"`);
        strategies.push(`${title} ${authorVar}`);
      }
    }
  }
  
  // Try each strategy
  const allResults = [];
  const seenKeys = new Set();
  
  for (const query of strategies) {
    const results = await searchOpenLibrary(query, 5);
    
    for (const result of results) {
      // Deduplicate by key
      if (result.key && !seenKeys.has(result.key)) {
        seenKeys.add(result.key);
        allResults.push(result);
      } else if (!result.key) {
        // If no key, deduplicate by title+author
        const key = `${result.title}|${result.authors.join(",")}`;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          allResults.push(result);
        }
      }
    }
    
    // If we have enough results, stop
    if (allResults.length >= 10) {
      break;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  return allResults;
}

// Strategy 4: Field-specific searches
async function searchWithFieldSpecific(title, author) {
  const queries = [];
  
  // Title field
  queries.push(`title:${title}`);
  
  // Author field
  if (author) {
    queries.push(`author:${author}`);
    
    // Combined
    queries.push(`title:${title} author:${author}`);
  }
  
  const allResults = [];
  const seenKeys = new Set();
  
  for (const query of queries) {
    const results = await searchOpenLibrary(query, 5);
    
    for (const result of results) {
      if (result.key && !seenKeys.has(result.key)) {
        seenKeys.add(result.key);
        allResults.push(result);
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  return allResults;
}

// Strategy 5: Fuzzy matching with scoring
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

function scoreResults(results, originalTitle, originalAuthor) {
  return results.map(result => {
    let score = 0;
    
    // Title similarity
    const titleScore = calculateSimilarity(originalTitle, result.title);
    score += titleScore * 0.6;
    
    // Author similarity
    if (originalAuthor && result.authors.length > 0) {
      const authorScores = result.authors.map(a => 
        calculateSimilarity(originalAuthor, a)
      );
      const maxAuthorScore = Math.max(...authorScores);
      score += maxAuthorScore * 0.4;
    }
    
    // Bonus for having ISBN
    if (result.isbn) {
      score += 0.1;
    }
    
    return { ...result, score };
  }).sort((a, b) => b.score - a.score);
}

// Strategy 6: ISBN lookup
async function searchByISBN(isbn) {
  if (!isbn) return null;
  
  try {
    const bookData = await fetchBookDetailsByISBN(isbn);
    if (!bookData || !bookData.details) {
      return null;
    }
    
    const details = bookData.details;
    return {
      title: details.title || "Unknown Title",
      authors: details.authors?.map(a => a.name) || [],
      firstPublishedYear: details.publish_date ? 
        new Date(details.publish_date).getFullYear() : null,
      isbn: isbn,
      coverId: bookData.thumbnail_url ? 
        bookData.thumbnail_url.match(/\/b\/id\/(\d+)/)?.[1] : null,
      key: bookData.key || null,
    };
  } catch (error) {
    return null;
  }
}

// ============================================================================
// Main Search Function: Try All Strategies
// ============================================================================

async function tryAllStrategies(title, author, previousSearchResults = []) {
  logInfo(`Trying enhanced search strategies for: "${title}"${author ? ` by ${author}` : ""}`);
  
  const allResults = [];
  const seenKeys = new Set();
  
  // Strategy 6: Try ISBN lookup first (if available from previous results)
  if (previousSearchResults && previousSearchResults.length > 0) {
    for (const result of previousSearchResults) {
      if (result.isbn) {
        logInfo(`  Strategy 6: Trying ISBN lookup (${result.isbn})...`);
        const isbnResult = await searchByISBN(result.isbn);
        if (isbnResult && isbnResult.key && !seenKeys.has(isbnResult.key)) {
          seenKeys.add(isbnResult.key);
          allResults.push(isbnResult);
        }
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
  }
  
  // Strategy 3: Progressive Query Relaxation
  logInfo("  Strategy 3: Progressive query relaxation...");
  const progressiveResults = await searchWithProgressiveRelaxation(title, author);
  for (const result of progressiveResults) {
    if (result.key && !seenKeys.has(result.key)) {
      seenKeys.add(result.key);
      allResults.push(result);
    }
  }
  
  if (allResults.length >= 10) {
    return scoreResults(allResults, title, author);
  }
  
  // Strategy 4: Field-specific searches
  logInfo("  Strategy 4: Field-specific searches...");
  const fieldResults = await searchWithFieldSpecific(title, author);
  for (const result of fieldResults) {
    if (result.key && !seenKeys.has(result.key)) {
      seenKeys.add(result.key);
      allResults.push(result);
    }
  }
  
  if (allResults.length >= 10) {
    return scoreResults(allResults, title, author);
  }
  
  // Strategy 1 & 2: Try title and author variations
  logInfo("  Strategy 1 & 2: Title and author variations...");
  const titleVars = getTitleVariations(title);
  const authorVars = author ? getAuthorVariations(author) : [null];
  
  for (const titleVar of titleVars) {
    for (const authorVar of authorVars) {
      const query = authorVar ? `${titleVar} ${authorVar}` : titleVar;
      const results = await searchOpenLibrary(query, 5);
      
      for (const result of results) {
        if (result.key && !seenKeys.has(result.key)) {
          seenKeys.add(result.key);
          allResults.push(result);
        }
      }
      
      if (allResults.length >= 15) {
        break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    if (allResults.length >= 15) {
      break;
    }
  }
  
  // Score and return results
  return scoreResults(allResults, title, author);
}

// ============================================================================
// User Interaction
// ============================================================================

function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function question(rl, query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function promptUserForMatch(rl, title, author, searchResults) {
  console.log("\n" + "=".repeat(60));
  logInfo(`Book from skipped list:`);
  console.log(`  Title: ${title}`);
  if (author) {
    console.log(`  Author: ${author}`);
  }
  console.log("=".repeat(60));
  
  if (searchResults.length === 0) {
    logWarn("No matches found in Open Library");
    const answer = await question(rl, "Skip this book? (y/n, default: y): ");
    return answer.toLowerCase() === "n" ? null : "skip";
  }
  
  console.log("\nOpen Library matches (sorted by relevance):");
  searchResults.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.title}${result.score ? ` (score: ${result.score.toFixed(2)})` : ""}`);
    if (result.authors.length > 0) {
      console.log(`   Author: ${result.authors.join(", ")}`);
    }
    if (result.firstPublishedYear) {
      console.log(`   Published: ${result.firstPublishedYear}`);
    }
    if (result.isbn) {
      console.log(`   ISBN: ${result.isbn}`);
    }
  });
  
  console.log(`\n${searchResults.length + 1}. Skip this book`);
  
  while (true) {
    const answer = await question(rl, `\nSelect a match (1-${searchResults.length + 1}, default: ${searchResults.length + 1}): `);
    const choice = answer.trim() || String(searchResults.length + 1);
    const choiceNum = parseInt(choice, 10);
    
    if (choiceNum >= 1 && choiceNum <= searchResults.length) {
      return searchResults[choiceNum - 1];
    } else if (choiceNum === searchResults.length + 1 || choice === "") {
      return "skip";
    } else {
      logWarn(`Invalid choice. Please enter a number between 1 and ${searchResults.length + 1}`);
    }
  }
}

// ============================================================================
// File Creation
// ============================================================================

async function createBookFile(selectedMatch, finishDate, year) {
  const title = selectedMatch.title;
  const finishDateObj = new Date(finishDate);
  
  if (isNaN(finishDateObj.getTime())) {
    throw new Error(`Invalid finish date: ${finishDate}`);
  }
  
  const dateStr = finishDateObj.toISOString().split("T")[0]; // YYYY-MM-DD
  const titleSlug = slugify(title);
  const filename = `${dateStr}-${titleSlug}.md`;
  const outputPath = path.join(catalogueBookDir, filename);
  
  // Check if file already exists
  try {
    await fs.access(outputPath);
    logWarn(`File already exists: ${filename}, skipping...`);
    return { skipped: true, filename };
  } catch (error) {
    // File doesn't exist, proceed
  }
  
  // Fetch full book details if we have an ISBN
  let bookDetails = null;
  let coverImagePath = null;
  
  if (selectedMatch.isbn) {
    bookDetails = await fetchBookDetailsByISBN(selectedMatch.isbn);
    
    // Download cover image (prefer thumbnail_url from bookDetails, fallback to coverId)
    const thumbnailUrl = bookDetails?.thumbnail_url || null;
    const coverId = selectedMatch.coverId || null;
    
    if (thumbnailUrl || coverId) {
      const coverFilename = `${titleSlug}.png`;
      coverImagePath = path.join(imagesDir, coverFilename);
      const coverDownloaded = await downloadCover(coverId, thumbnailUrl, coverImagePath);
      if (!coverDownloaded) {
        coverImagePath = null;
      }
    }
  }
  
  // Build frontmatter
  const frontmatter = {
    title,
    draft: true,
    kind: "catalogueBook",
  };
  
  if (selectedMatch.isbn) {
    frontmatter.isbn = selectedMatch.isbn;
  }
  
  if (selectedMatch.authors.length > 0) {
    frontmatter.bookAuthor = selectedMatch.authors[0];
    frontmatter.authors = selectedMatch.authors.filter(
      (author) =>
        !bookDetails?.details?.contributors?.some(
          (contributor) =>
            contributor.name === author &&
            contributor.role?.toLowerCase() === "translator"
        )
    );
  }
  
  // Use publish date from book details if available
  if (bookDetails?.details?.publish_date) {
    try {
      const publishDate = new Date(bookDetails.details.publish_date);
      if (!isNaN(publishDate.getTime())) {
        frontmatter.publishDate = publishDate.toISOString();
        frontmatter.pubDate = publishDate.toISOString();
      }
    } catch (error) {
      // Invalid date, skip
    }
  }
  
  // Fallback to first published year or finish date
  if (!frontmatter.pubDate) {
    if (selectedMatch.firstPublishedYear) {
      const publishDate = new Date(`${selectedMatch.firstPublishedYear}-01-01`);
      frontmatter.pubDate = publishDate.toISOString();
      if (!frontmatter.publishDate) {
        frontmatter.publishDate = publishDate.toISOString();
      }
    } else {
      frontmatter.pubDate = finishDateObj.toISOString();
    }
  }
  
  // Add reviewDate (finish date)
  frontmatter.reviewDate = finishDateObj.toISOString();
  
  // Add publishers if available
  if (bookDetails?.details?.publishers?.length > 0) {
    frontmatter.publishers = bookDetails.details.publishers;
  }
  
  // Add pages if available
  if (bookDetails?.details?.number_of_pages) {
    frontmatter.pages = bookDetails.details.number_of_pages;
  }
  
  // Add cover image path if downloaded
  if (coverImagePath) {
    frontmatter.coverImage = `../../images/catalogueBook/${path.basename(coverImagePath)}`;
  }
  
  // Create markdown file
  const markdownContent = formatFrontmatter(frontmatter) + "\n\n";
  await fs.writeFile(outputPath, markdownContent, "utf-8");
  
  return { skipped: false, filename };
}

// ============================================================================
// Main Function
// ============================================================================

function normalizeTitle(title) {
  if (!title) return "";
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "") // Remove punctuation
    .replace(/\s+/g, " "); // Normalize whitespace
}

async function loadExistingBooks() {
  const existingBooks = new Set();
  const existingFiles = new Set();
  const existingFilesByDate = new Map(); // Map of date -> Set of filenames
  
  try {
    const files = await fs.readdir(catalogueBookDir);
    const markdownFiles = files.filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
    
    logInfo(`Checking ${markdownFiles.length} existing catalogue book files...`);
    
    for (const file of markdownFiles) {
      existingFiles.add(file);
      
      // Extract date from filename (format: YYYY-MM-DD-title-slug.md)
      const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})-/);
      if (dateMatch) {
        const date = dateMatch[1];
        if (!existingFilesByDate.has(date)) {
          existingFilesByDate.set(date, new Set());
        }
        existingFilesByDate.get(date).add(file);
      }
      
      const filePath = path.join(catalogueBookDir, file);
      try {
        const content = await fs.readFile(filePath, "utf-8");
        const { data: frontmatter } = matter(content);
        
        if (frontmatter.title) {
          const normalizedTitle = normalizeTitle(frontmatter.title);
          existingBooks.add(normalizedTitle);
        }
      } catch (error) {
        // Skip files that can't be parsed
        logWarn(`Could not parse ${file}: ${error.message}`);
      }
    }
    
    logInfo(`Found ${existingBooks.size} existing books in catalogue`);
    return { existingBooks, existingFiles, existingFilesByDate };
  } catch (error) {
    if (error.code === "ENOENT") {
      // Directory doesn't exist yet, return empty sets
      return { existingBooks: new Set(), existingFiles: new Set(), existingFilesByDate: new Map() };
    }
    throw error;
  }
}

async function checkIfFileExists(title, finishDate, existingFiles, existingFilesByDate) {
  if (!finishDate) return false;
  
  try {
    const finishDateObj = new Date(finishDate);
    if (isNaN(finishDateObj.getTime())) {
      return false;
    }
    
    const dateStr = finishDateObj.toISOString().split("T")[0]; // YYYY-MM-DD
    
    // Check if any files exist with this date
    const filesForDate = existingFilesByDate.get(dateStr);
    if (!filesForDate || filesForDate.size === 0) {
      return false;
    }
    
    // Check if a file with this date and a matching title slug exists
    const titleSlug = slugify(title);
    const expectedFilename = `${dateStr}-${titleSlug}.md`;
    
    if (existingFiles.has(expectedFilename)) {
      return true;
    }
    
    // Also check for partial matches (in case title variations exist)
    const normalizedTitle = normalizeTitle(title);
    for (const filename of filesForDate) {
      // Extract title from filename and compare
      const filenameTitleMatch = filename.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
      if (filenameTitleMatch) {
        const filenameTitleSlug = filenameTitleMatch[1];
        // Try to extract title from existing file to compare
        try {
          const filePath = path.join(catalogueBookDir, filename);
          const content = await fs.readFile(filePath, "utf-8");
          const { data: frontmatter } = matter(content);
          
          if (frontmatter.title) {
            const existingNormalizedTitle = normalizeTitle(frontmatter.title);
            // If normalized titles match, consider it the same book
            if (existingNormalizedTitle === normalizedTitle) {
              return true;
            }
          }
        } catch (error) {
          // Skip files that can't be parsed
        }
      }
    }
    
    return false;
  } catch (error) {
    return false;
  }
}

async function main() {
  logInfo("Starting enhanced book search for skipped books...");
  
  const skippedBooksPath = path.join(projectRoot, "scripts", "skipped-books.json");
  
  try {
    await fs.access(skippedBooksPath);
  } catch (error) {
    logError(`Skipped books file not found: ${skippedBooksPath}`);
    logInfo("Run the main import script first to generate skipped-books.json");
    process.exit(1);
  }
  
  logInfo("Loading skipped books from file...");
  const skippedBooksContent = await fs.readFile(skippedBooksPath, "utf-8");
  const skippedBooks = JSON.parse(skippedBooksContent);
  
  logInfo(`Found ${skippedBooks.length} skipped books to retry`);
  
  // Ensure output directories exist
  await fs.mkdir(catalogueBookDir, { recursive: true });
  await fs.mkdir(imagesDir, { recursive: true });
  
  // Load existing books to skip
  const { existingBooks, existingFiles, existingFilesByDate } = await loadExistingBooks();
  
  // Create readline interface for user interaction
  const rl = createReadlineInterface();
  
  let imported = 0;
  let skipped = 0;
  const errors = [];
  const stillSkipped = [];
  
  // Process each skipped book
  for (let i = 0; i < skippedBooks.length; i++) {
    const { title, author, year, finishDate, reason, searchResults: previousSearchResults } = skippedBooks[i];
    
    // Skip if reason indicates file already exists
    if (reason === "file_already_exists") {
      logInfo(`\n[${i + 1}/${skippedBooks.length}] Skipping "${title}" - marked as file_already_exists`);
      skipped++;
      continue;
    }
    
    // Check if this book already exists by normalized title
    const normalizedTitle = normalizeTitle(title);
    if (existingBooks.has(normalizedTitle)) {
      logInfo(`\n[${i + 1}/${skippedBooks.length}] Skipping "${title}" - already exists in catalogue (by title)`);
      skipped++;
      continue;
    }
    
    // Check if a file with this finish date and title already exists
    const fileExists = await checkIfFileExists(title, finishDate, existingFiles, existingFilesByDate);
    if (fileExists) {
      logInfo(`\n[${i + 1}/${skippedBooks.length}] Skipping "${title}" - file already exists for finish date ${finishDate}`);
      skipped++;
      continue;
    }
    
    logInfo(`\n[${i + 1}/${skippedBooks.length}] Retrying: ${title}${author ? ` by ${author}` : ""}`);
    logInfo(`Previous reason: ${reason}`);
    
    try {
      // Try all enhanced search strategies
      const searchResults = await tryAllStrategies(title, author, previousSearchResults);
      
      // Limit to top 10 results
      const topResults = searchResults.slice(0, 10);
      
      // Prompt user for match
      const selectedMatch = await promptUserForMatch(rl, title, author, topResults);
      
      if (selectedMatch === "skip") {
        logWarn("Skipped by user");
        skipped++;
        stillSkipped.push(skippedBooks[i]);
        continue;
      }
      
      if (!selectedMatch) {
        logWarn("No match selected");
        skipped++;
        stillSkipped.push({
          ...skippedBooks[i],
          searchResults: topResults.map(r => ({
            title: r.title,
            authors: r.authors,
            firstPublishedYear: r.firstPublishedYear,
            isbn: r.isbn,
          })),
        });
        continue;
      }
      
      // Create book file
      const result = await createBookFile(selectedMatch, finishDate, year);
      
      if (result.skipped) {
        skipped++;
        stillSkipped.push(skippedBooks[i]);
      } else {
        logSuccess(`Imported: ${selectedMatch.title} (${year}) → ${result.filename}`);
        imported++;
      }
      
      // Add delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      logError(`Error processing "${title}": ${error.message}`);
      errors.push({ title, error: error.message });
      stillSkipped.push({
        ...skippedBooks[i],
        error: error.message,
      });
    }
  }
  
  // Close readline interface
  rl.close();
  
  // Update skipped books file with remaining skipped books
  if (stillSkipped.length > 0) {
    await fs.writeFile(
      skippedBooksPath,
      JSON.stringify(stillSkipped, null, 2),
      "utf-8"
    );
    logInfo(`\nUpdated skipped books list: ${skippedBooksPath} (${stillSkipped.length} remaining)`);
  } else {
    // Remove the file if all books were processed
    try {
      await fs.unlink(skippedBooksPath);
      logSuccess(`\nAll books processed! Removed skipped-books.json`);
    } catch (error) {
      // File might not exist, ignore
    }
  }
  
  // Summary
  console.log("\n" + "=".repeat(60));
  logInfo("Enhanced Search Summary:");
  logSuccess(`  Imported: ${imported}`);
  logWarn(`  Still Skipped: ${skipped}`);
  if (errors.length > 0) {
    logError(`  Errors: ${errors.length}`);
    errors.forEach(({ title, error }) => {
      logError(`    - ${title}: ${error}`);
    });
  }
  console.log("=".repeat(60));
}

main().catch((error) => {
  logError(`Fatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});

