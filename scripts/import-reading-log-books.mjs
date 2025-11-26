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

const obsidianReadingLogDir = "/Users/jeremywong/Documents/dev-journal/Calendar/Logs/Reading Log";
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

function extractWikiLink(text) {
  // Extract text from [[link]] or [[link|display text]]
  if (!text) return null;
  const match = text.match(/\[\[([^\]]+)\]\]/);
  if (!match) return null;
  const link = match[1];
  // Handle [[link|display text]] format
  const parts = link.split("|");
  return parts[0].trim();
}

function cleanAuthorName(author) {
  // Remove [[ and ]] from author names
  if (!author) return null;
  return author.replace(/\[\[/g, "").replace(/\]\]/g, "").trim();
}

function extractYearFromFilename(filename) {
  // Match "20XX Book Reading Log.md" or "20XX Reading Log.md"
  const match = filename.match(/^(\d{4})\s+(?:Book\s+)?Reading\s+Log\.md$/);
  return match ? parseInt(match[1], 10) : null;
}

function parseTableSection(lines, startIndex, sectionName) {
  const tableData = [];
  let headers = [];
  let inTable = false;

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();

    // Start parsing when we find the section
    if (!inTable && line.includes(sectionName)) {
      inTable = true;
      continue;
    }

    // Stop if we hit another section
    if (inTable && line.startsWith("###") && !line.includes(sectionName)) {
      break;
    }

    if (inTable && line.startsWith("|")) {
      const cells = line
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell.length > 0);

      if (cells.length === 0) continue;

      // Skip separator rows
      if (cells.every((cell) => cell.match(/^:?-+$/))) {
        continue;
      }

      // First row with data is headers
      if (headers.length === 0) {
        headers = cells;
        continue;
      }

      // Parse data rows
      if (cells.length >= headers.length) {
        const row = {};
        headers.forEach((header, index) => {
          const normalizedHeader = header.toLowerCase().replace(/\s+/g, " ").trim();
          row[normalizedHeader] = cells[index] || "";
        });

        const status = (row.status || "").toLowerCase();
        const finishDate = row["finish date"] || row.finishdate || row["finish"] || "";

        if (!status || status.includes("finished") || 
            status.includes("read") || 
            (finishDate && finishDate.trim() && !status.includes("reading") && 
             !status.includes("paused"))) {
          tableData.push(row);
        }
      }
    }
  }

  return tableData;
}

function parseReadingLogTable(content, year) {
  const lines = content.split("\n");
  let tableData = [];

  // For 2010-2016, try "Current Reads" or "## Log" or direct table
  tableData = parseTableSection(lines, 0, "### Current Reads");
  if (tableData.length === 0) {
    tableData = parseTableSection(lines, 0, "## Log");
  }
  // For 2010-2021, tables might start without a section header
  if (tableData.length === 0 && year <= 2021) {
    let headers = [];
    let inTable = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("|") && (line.includes("Title") || line.includes("Book"))) {
        inTable = true;
      }
      if (inTable && line.startsWith("|")) {
        const cells = line.split("|").map((c) => c.trim()).filter((c) => c.length > 0);
        if (cells.length === 0) continue;
        if (cells.every((c) => c.match(/^:?-+$/))) continue;
        if (headers.length === 0) {
          headers = cells;
          continue;
        }
        if (cells.length >= headers.length) {
          const row = {};
          headers.forEach((h, idx) => {
            row[h.toLowerCase().trim()] = cells[idx] || "";
          });
          const status = (row.status || "").toLowerCase();
          const finishDate = row["finish date"] || row.finishdate || row["finish"] || "";
          if (!status || status.includes("finished") || status.includes("read") || 
              (finishDate && finishDate.trim())) {
            tableData.push(row);
          }
        }
      }
      if (inTable && line.startsWith("##")) break;
    }
  }

  return tableData;
}

function extractBookTitle(entry) {
  const bookCell = entry.book || entry.title || entry["book"] || "";
  const wikiLink = extractWikiLink(bookCell);
  if (wikiLink) return wikiLink;
  
  // Handle [[link|display text]] format
  if (bookCell.includes("|")) {
    const parts = bookCell.split("|");
    if (parts.length > 1) {
      return parts[1].replace(/\]\]/g, "").trim();
    }
  }
  
  // Return raw text without wiki link syntax
  return bookCell.replace(/\[\[|\]\]/g, "").split("|")[0].trim();
}

function extractBookAuthor(entry) {
  const authorCell = entry.author || entry["author"] || "";
  return cleanAuthorName(authorCell);
}

function extractFinishDate(entry) {
  return entry["finish date"] || 
         entry.finishdate || 
         entry["finish"] ||
         entry["start date"] ||
         entry.startdate ||
         entry["start"] ||
         null;
}

async function searchOpenLibrary(title, author) {
  // Build search query
  let query = title;
  if (author) {
    query = `title:"${title}" author:"${author}"`;
  } else {
    query = `title:"${title}"`;
  }
  
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`;
  
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

async function promptUserForMatch(rl, readingLogEntry, searchResults) {
  const title = extractBookTitle(readingLogEntry);
  const author = extractBookAuthor(readingLogEntry);
  
  console.log("\n" + "=".repeat(60));
  logInfo(`Book from reading log:`);
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
  
  console.log("\nOpen Library matches:");
  searchResults.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.title}`);
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

async function createBookFile(readingLogEntry, selectedMatch, finishDate, year) {
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

async function findReadingLogFiles() {
  const files = await fs.readdir(obsidianReadingLogDir);
  const readingLogFiles = files
    .filter((file) => {
      const year = extractYearFromFilename(file);
      return year !== null && year >= 2010 && year <= 2016;
    })
    .map((file) => ({
      filename: file,
      year: extractYearFromFilename(file),
      path: path.join(obsidianReadingLogDir, file),
    }))
    .sort((a, b) => b.year - a.year); // Sort descending (newest first)

  return readingLogFiles;
}

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
  
  try {
    const files = await fs.readdir(catalogueBookDir);
    const markdownFiles = files.filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
    
    logInfo(`Checking ${markdownFiles.length} existing catalogue book files...`);
    
    for (const file of markdownFiles) {
      const filePath = path.join(catalogueBookDir, file);
      try {
        const content = await fs.readFile(filePath, "utf-8");
        const { data: frontmatter } = matter(content);
        
        if (frontmatter.title) {
          const normalizedTitle = normalizeTitle(frontmatter.title);
          existingBooks.add(normalizedTitle);
          existingFiles.add(file);
        }
      } catch (error) {
        // Skip files that can't be parsed
        logWarn(`Could not parse ${file}: ${error.message}`);
      }
    }
    
    logInfo(`Found ${existingBooks.size} existing books in catalogue`);
    return { existingBooks, existingFiles };
  } catch (error) {
    if (error.code === "ENOENT") {
      // Directory doesn't exist yet, return empty sets
      return { existingBooks: new Set(), existingFiles: new Set() };
    }
    throw error;
  }
}

async function retrySkippedBooks() {
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
  const { existingBooks } = await loadExistingBooks();

  // Create readline interface for user interaction
  const rl = createReadlineInterface();

  let imported = 0;
  let skipped = 0;
  const errors = [];
  const stillSkipped = [];

  // Process each skipped book
  for (let i = 0; i < skippedBooks.length; i++) {
    const { title, author, year, finishDate, reason, searchResults: previousSearchResults } = skippedBooks[i];
    
    // Check if this book already exists
    const normalizedTitle = normalizeTitle(title);
    if (existingBooks.has(normalizedTitle)) {
      logInfo(`\n[${i + 1}/${skippedBooks.length}] Skipping "${title}" - already exists in catalogue`);
      skipped++;
      continue;
    }
    
    logInfo(`\n[${i + 1}/${skippedBooks.length}] Retrying: ${title}${author ? ` by ${author}` : ""}`);
    logInfo(`Previous reason: ${reason}`);

    try {
      // Search Open Library (try different variations)
      logInfo("Searching Open Library...");
      
      // Try original search first
      let searchResults = await searchOpenLibrary(title, author);
      
      // If no results and we have author, try without author
      if (searchResults.length === 0 && author) {
        logInfo("No results with author, trying without author...");
        searchResults = await searchOpenLibrary(title, null);
      }
      
      // If still no results, try just the title without quotes
      if (searchResults.length === 0) {
        logInfo("Trying title-only search without quotes...");
        const simpleQuery = encodeURIComponent(title);
        const url = `https://openlibrary.org/search.json?q=${simpleQuery}&limit=5`;
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            if (data.docs && data.docs.length > 0) {
              searchResults = data.docs.map((doc) => {
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
            }
          }
        } catch (error) {
          // Ignore search errors, continue with empty results
        }
      }
      
      // Create a mock entry for promptUserForMatch
      const mockEntry = {
        book: title,
        author: author || "",
      };
      
      // Prompt user for match
      const selectedMatch = await promptUserForMatch(rl, mockEntry, searchResults);
      
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
          searchResults: searchResults.map(r => ({
            title: r.title,
            authors: r.authors,
            firstPublishedYear: r.firstPublishedYear,
            isbn: r.isbn,
          })),
        });
        continue;
      }
      
      // Create book file
      const result = await createBookFile(mockEntry, selectedMatch, finishDate, year);
      
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
    const skippedBooksPath = path.join(projectRoot, "scripts", "skipped-books.json");
    await fs.writeFile(
      skippedBooksPath,
      JSON.stringify(stillSkipped, null, 2),
      "utf-8"
    );
    logInfo(`\nUpdated skipped books list: ${skippedBooksPath} (${stillSkipped.length} remaining)`);
  } else {
    // Remove the file if all books were processed
    const skippedBooksPath = path.join(projectRoot, "scripts", "skipped-books.json");
    try {
      await fs.unlink(skippedBooksPath);
      logSuccess(`\nAll books processed! Removed skipped-books.json`);
    } catch (error) {
      // File might not exist, ignore
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  logInfo("Retry Summary:");
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

async function main() {
  // Check if we're in retry mode
  const args = process.argv.slice(2);
  if (args.includes("--retry") || args.includes("-r")) {
    await retrySkippedBooks();
    return;
  }

  logInfo("Starting reading log books import (2010-2016)...");

  // Check if source directory exists
  try {
    await fs.access(obsidianReadingLogDir);
  } catch (error) {
    logError(`Source directory not found: ${error.message}`);
    process.exit(1);
  }

  // Ensure output directories exist
  await fs.mkdir(catalogueBookDir, { recursive: true });
  await fs.mkdir(imagesDir, { recursive: true });

  // Load existing books to skip
  const { existingBooks, existingFiles } = await loadExistingBooks();

  // Find reading log files for 2010-2016
  logInfo("Finding reading log files...");
  const readingLogFiles = await findReadingLogFiles();
  logInfo(`Found ${readingLogFiles.length} reading log files`);

  if (readingLogFiles.length === 0) {
    logWarn("No reading log files found for years 2010-2016");
    return;
  }

  // Create readline interface for user interaction
  const rl = createReadlineInterface();

  // Collect all entries from all reading logs
  const allEntries = [];
  for (const readingLogFile of readingLogFiles) {
    const { filename, year, path: logPath } = readingLogFile;
    logInfo(`\nProcessing ${filename} (${year})...`);

    try {
      const readingLogContent = await fs.readFile(logPath, "utf-8");
      const readingLogEntries = parseReadingLogTable(readingLogContent, year);
      logInfo(`  Found ${readingLogEntries.length} finished/read entries`);

      for (const entry of readingLogEntries) {
        const title = extractBookTitle(entry);
        if (!title || title.trim() === "") {
          continue;
        }
        
        // Check if this book already exists
        const normalizedTitle = normalizeTitle(title);
        if (existingBooks.has(normalizedTitle)) {
          logInfo(`  Skipping "${title}" - already exists in catalogue`);
          continue;
        }
        
        const finishDate = extractFinishDate(entry);
        if (!finishDate) {
          continue;
        }

        allEntries.push({
          entry,
          year,
          title,
          author: extractBookAuthor(entry),
          finishDate,
        });
      }
    } catch (error) {
      logError(`Error processing ${filename}: ${error.message}`);
    }
  }

  logInfo(`\nFound ${allEntries.length} total book entries to process`);

  let imported = 0;
  let skipped = 0;
  const errors = [];
  const skippedBooks = [];

  // Process each entry
  for (let i = 0; i < allEntries.length; i++) {
    const { entry, year, title, author, finishDate } = allEntries[i];
    
    logInfo(`\n[${i + 1}/${allEntries.length}] Processing: ${title}${author ? ` by ${author}` : ""}`);

    try {
      // Search Open Library
      logInfo("Searching Open Library...");
      const searchResults = await searchOpenLibrary(title, author);
      
      // Prompt user for match
      const selectedMatch = await promptUserForMatch(rl, entry, searchResults);
      
      if (selectedMatch === "skip") {
        logWarn("Skipped by user");
        skipped++;
        skippedBooks.push({
          title,
          author: author || null,
          year,
          finishDate,
          reason: "skipped_by_user",
          searchResults: searchResults.map(r => ({
            title: r.title,
            authors: r.authors,
            firstPublishedYear: r.firstPublishedYear,
            isbn: r.isbn,
          })),
        });
        continue;
      }
      
      if (!selectedMatch) {
        logWarn("No match selected");
        skipped++;
        skippedBooks.push({
          title,
          author: author || null,
          year,
          finishDate,
          reason: "no_match_found",
          searchResults: [],
        });
        continue;
      }
      
      // Create book file
      const result = await createBookFile(entry, selectedMatch, finishDate, year);
      
      if (result.skipped) {
        skipped++;
        skippedBooks.push({
          title,
          author: author || null,
          year,
          finishDate,
          reason: "file_already_exists",
          searchResults: [{
            title: selectedMatch.title,
            authors: selectedMatch.authors,
            firstPublishedYear: selectedMatch.firstPublishedYear,
            isbn: selectedMatch.isbn,
          }],
        });
      } else {
        logSuccess(`Imported: ${selectedMatch.title} (${year}) → ${result.filename}`);
        imported++;
      }
      
      // Add delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      logError(`Error processing "${title}": ${error.message}`);
      errors.push({ title, error: error.message });
      skippedBooks.push({
        title,
        author: author || null,
        year,
        finishDate,
        reason: "error",
        error: error.message,
        searchResults: [],
      });
    }
  }

  // Close readline interface
  rl.close();

  // Save skipped books to file
  if (skippedBooks.length > 0) {
    const skippedBooksPath = path.join(projectRoot, "scripts", "skipped-books.json");
    await fs.writeFile(
      skippedBooksPath,
      JSON.stringify(skippedBooks, null, 2),
      "utf-8"
    );
    logInfo(`\nSkipped books list saved to: ${skippedBooksPath}`);
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  logInfo("Import Summary:");
  logSuccess(`  Imported: ${imported}`);
  logWarn(`  Skipped: ${skipped}`);
  if (skippedBooks.length > 0) {
    logInfo(`  Skipped books list: scripts/skipped-books.json`);
  }
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

