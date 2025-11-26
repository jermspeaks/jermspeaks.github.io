#!/usr/bin/env node

import matter from "gray-matter";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const obsidianBooksDir = "/Users/jeremywong/Documents/dev-journal/Atlas/Sources/Books";
const obsidianReadingLogDir = "/Users/jeremywong/Documents/dev-journal/Calendar/Logs/Reading Log";
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

function getReadingLogReference(year) {
  // Format: [[202X Book Reading Log]] (2021-2025) or [[202X Reading Log]] (2010-2020)
  if (year >= 2021) {
    return `[[${year} Book Reading Log]]`;
  } else {
    return `[[${year} Reading Log]]`;
  }
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

  // Try to parse "Completed Reads" first (for 2023-2025)
  if (year >= 2023) {
    tableData = parseTableSection(lines, 0, "### Completed Reads");
    // If no entries found, try "Current Reads"
    if (tableData.length === 0) {
      tableData = parseTableSection(lines, 0, "### Current Reads");
    }
  } else {
    // For older years, try "Current Reads" or "## Log" or direct table
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
  }

  return tableData;
}

function matchBookWithReadingLog(bookTitle, bookBy, readingLogEntries) {
  // Try to match by title first
  for (const entry of readingLogEntries) {
    // Handle different column names
    const bookCell = entry.book || entry.title || entry["book"] || "";
    const wikiLink = extractWikiLink(bookCell);
    const displayText = bookCell.includes("|") ? bookCell.split("|")[1].replace(/\]\]/g, "").trim() : null;

    // Match by wiki link text or display text
    if (wikiLink && wikiLink.toLowerCase() === bookTitle.toLowerCase()) {
      return entry;
    }
    if (displayText && displayText.toLowerCase() === bookTitle.toLowerCase()) {
      return entry;
    }
    // Also try matching the raw cell text (without wiki link syntax)
    const cellText = bookCell.replace(/\[\[|\]\]/g, "").split("|")[0].trim();
    if (cellText.toLowerCase() === bookTitle.toLowerCase()) {
      return entry;
    }
  }

  // Try matching by author if available
  if (bookBy && bookBy.length > 0) {
    const firstAuthor = cleanAuthorName(bookBy[0]);
    for (const entry of readingLogEntries) {
      const authorCell = entry.author || entry["author"] || "";
      if (authorCell.toLowerCase().includes(firstAuthor.toLowerCase()) || 
          firstAuthor.toLowerCase().includes(authorCell.toLowerCase())) {
        // Double check title similarity
        const bookCell = entry.book || entry.title || entry["book"] || "";
        const cellText = bookCell.replace(/\[\[|\]\]/g, "").split("|")[0].trim();
        if (cellText.length > 0 && bookTitle.length > 0) {
          // Fuzzy match - check if significant portion matches
          const titleWords = bookTitle.toLowerCase().split(/\s+/);
          const cellWords = cellText.toLowerCase().split(/\s+/);
          const matchingWords = titleWords.filter(word => 
            cellWords.some(cellWord => cellWord.includes(word) || word.includes(cellWord))
          );
          if (matchingWords.length >= Math.min(2, titleWords.length)) {
            return entry;
          }
        }
      }
    }
  }

  return null;
}

function formatDate(dateString) {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toISOString();
  } catch (error) {
    return null;
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

async function findReadingLogFiles() {
  const files = await fs.readdir(obsidianReadingLogDir);
  const readingLogFiles = files
    .filter((file) => {
      const year = extractYearFromFilename(file);
      return year !== null && year >= 2010 && year <= 2025;
    })
    .map((file) => ({
      filename: file,
      year: extractYearFromFilename(file),
      path: path.join(obsidianReadingLogDir, file),
    }))
    .sort((a, b) => b.year - a.year); // Sort descending (newest first)

  return readingLogFiles;
}

async function main() {
  logInfo("Starting Obsidian books import (all years)...");

  // Check if source directories exist
  try {
    await fs.access(obsidianBooksDir);
    await fs.access(obsidianReadingLogDir);
  } catch (error) {
    logError(`Source directory not found: ${error.message}`);
    process.exit(1);
  }

  // Find all reading log files
  logInfo("Finding reading log files...");
  const readingLogFiles = await findReadingLogFiles();
  logInfo(`Found ${readingLogFiles.length} reading log files`);

  // Read all book files
  logInfo("Reading book files from Obsidian vault...");
  const bookFiles = await fs.readdir(obsidianBooksDir);
  const markdownFiles = bookFiles.filter((file) => file.endsWith(".md"));
  logInfo(`Found ${markdownFiles.length} book files`);

  // Load all books into memory
  const allBooks = new Map(); // title -> { book data, years: Set }
  for (const file of markdownFiles) {
    const filePath = path.join(obsidianBooksDir, file);
    try {
      const content = await fs.readFile(filePath, "utf-8");
      const { data: frontmatter } = matter(content);
      const title = frontmatter.title;
      
      if (!title) continue;

      const inArray = frontmatter.in || [];
      const years = new Set();
      
      // Find which reading logs this book belongs to
      for (const readingLogFile of readingLogFiles) {
        const reference = getReadingLogReference(readingLogFile.year);
        if (inArray.some((item) => item === reference || item.includes(reference.replace(/\[\[|\]\]/g, "")))) {
          years.add(readingLogFile.year);
        }
      }

      if (years.size > 0) {
        allBooks.set(title, {
          filename: file,
          filePath,
          frontmatter,
          content,
          years,
        });
      }
    } catch (error) {
      logWarn(`Error reading ${file}: ${error.message}`);
    }
  }

  logInfo(`Found ${allBooks.size} books across all reading logs`);

  // Ensure catalogueBook directory exists
  await fs.mkdir(catalogueBookDir, { recursive: true });

  // Track all books to import (title -> best entry)
  const booksToImport = new Map();

  // Process each reading log
  for (const readingLogFile of readingLogFiles) {
    const { filename, year, path: logPath } = readingLogFile;
    logInfo(`\nProcessing ${filename} (${year})...`);

    try {
      const readingLogContent = await fs.readFile(logPath, "utf-8");
      const readingLogEntries = parseReadingLogTable(readingLogContent, year);
      logInfo(`  Found ${readingLogEntries.length} finished/read entries`);

      // Find books for this year
      const reference = getReadingLogReference(year);
      const booksForYear = Array.from(allBooks.entries())
        .filter(([title, bookData]) => bookData.years.has(year))
        .map(([title, bookData]) => bookData);

      logInfo(`  Found ${booksForYear.length} books in ${year} reading log`);

      // Process each book for this year
      for (const book of booksForYear) {
        const { frontmatter } = book;
        const title = frontmatter.title;

        if (!title) continue;

        // Match with reading log entry
        const byArray = frontmatter.by || [];
        const readingLogEntry = matchBookWithReadingLog(title, byArray, readingLogEntries);

        if (!readingLogEntry) {
          continue; // Skip if no match
        }

        // Extract finish date (handle different column names)
        const finishDate = readingLogEntry["finish date"] || 
                          readingLogEntry.finishdate || 
                          readingLogEntry["finish"] ||
                          readingLogEntry["finish date"] ||
                          null;

        if (!finishDate) {
          // Try start date as fallback
          const startDate = readingLogEntry["start date"] || 
                           readingLogEntry.startdate || 
                           readingLogEntry["start"] ||
                           null;
          if (!startDate) continue;
        }

        const finishDateObj = finishDate ? new Date(finishDate) : null;
        if (finishDate && isNaN(finishDateObj.getTime())) {
          continue; // Invalid date
        }

        // Check if we already have this book with a more recent finish date
        const existing = booksToImport.get(title);
        if (existing && finishDateObj) {
          const existingDate = new Date(existing.finishDate);
          if (existingDate > finishDateObj) {
            continue; // Existing entry is more recent
          }
        }

        // Store or update book entry
        booksToImport.set(title, {
          book,
          year,
          finishDate: finishDate || readingLogEntry["start date"] || readingLogEntry.startdate || readingLogEntry["start"],
          readingLogEntry,
        });
      }
    } catch (error) {
      logError(`Error processing ${filename}: ${error.message}`);
    }
  }

  logInfo(`\nFound ${booksToImport.size} unique books to import`);

  let imported = 0;
  let skipped = 0;
  const errors = [];

  // Process each book to import
  for (const [title, { book, year, finishDate, readingLogEntry }] of booksToImport.entries()) {
    try {
      const { frontmatter } = book;

      // Extract ISBN (prefer isbn13)
      const isbn = frontmatter.isbn13 || frontmatter.isbn10 || null;

      // Extract author
      const byArray = frontmatter.by || [];
      const bookAuthor = byArray.length > 0 ? cleanAuthorName(byArray[0]) : null;

      // Extract published date
      const publishedDate = frontmatter.published ? formatDate(frontmatter.published) : null;

      // Format finish date for filename
      const finishDateObj = new Date(finishDate);
      if (isNaN(finishDateObj.getTime())) {
        logWarn(`Invalid finish date "${finishDate}" for "${title}", skipping...`);
        skipped++;
        continue;
      }

      const dateStr = finishDateObj.toISOString().split("T")[0]; // YYYY-MM-DD
      const titleSlug = slugify(title);
      const filename = `${dateStr}-${titleSlug}.md`;
      const outputPath = path.join(catalogueBookDir, filename);

      // Check if file already exists
      try {
        await fs.access(outputPath);
        logWarn(`File already exists: ${filename}, skipping...`);
        skipped++;
        continue;
      } catch (error) {
        // File doesn't exist, proceed
      }

      // Build frontmatter
      const newFrontmatter = {
        title,
        draft: true,
        kind: "catalogueBook",
      };

      if (isbn) {
        newFrontmatter.isbn = isbn;
      }

      if (bookAuthor) {
        newFrontmatter.bookAuthor = bookAuthor;
      }

      // Use published date for pubDate (as per user preference)
      if (publishedDate) {
        newFrontmatter.pubDate = publishedDate;
        newFrontmatter.publishDate = publishedDate;
      } else {
        // Fallback to finish date if no published date
        newFrontmatter.pubDate = finishDateObj.toISOString();
      }

      // Add reviewDate (finish date)
      newFrontmatter.reviewDate = finishDateObj.toISOString();

      // Create markdown file with empty content
      const markdownContent = formatFrontmatter(newFrontmatter) + "\n\n";
      await fs.writeFile(outputPath, markdownContent, "utf-8");

      logSuccess(`Imported: ${title} (${year}) → ${filename}`);
      imported++;
    } catch (error) {
      logError(`Error processing ${book.filename}: ${error.message}`);
      errors.push({ file: book.filename, error: error.message });
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  logInfo("Import Summary:");
  logSuccess(`  Imported: ${imported}`);
  logWarn(`  Skipped: ${skipped}`);
  if (errors.length > 0) {
    logError(`  Errors: ${errors.length}`);
    errors.forEach(({ file, error }) => {
      logError(`    - ${file}: ${error}`);
    });
  }
  console.log("=".repeat(60));
}

main().catch((error) => {
  logError(`Fatal error: ${error.message}`);
  console.error(error);
  process.exit(1);
});
