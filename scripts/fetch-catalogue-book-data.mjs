#!/usr/bin/env node

import matter from "gray-matter";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

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

async function getMarkdownFiles(dir) {
  try {
    const files = await fs.readdir(dir);
    return files.filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
  } catch (error) {
    if (error.code === "ENOENT") {
      logWarn(`Directory ${dir} does not exist. Creating it...`);
      await fs.mkdir(dir, { recursive: true });
      return [];
    }
    throw error;
  }
}

function getSlugFromFilename(filename) {
  return path.basename(filename, path.extname(filename));
}

async function fetchBookData(isbn) {
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
    logError(`Failed to fetch data for ISBN ${isbn}: ${error.message}`);
    return null;
  }
}

async function downloadCover(coverURL, outputPath) {
  try {
    const response = await fetch(coverURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Convert to PNG if not already PNG
    if (coverURL.endsWith(".png")) {
      await fs.writeFile(outputPath, buffer);
    } else {
      await sharp(buffer).png().toFile(outputPath);
    }
    
    return true;
  } catch (error) {
    logError(`Failed to download cover: ${error.message}`);
    return false;
  }
}

function updateFrontmatter(frontmatter, bookData, coverImagePath) {
  const updated = { ...frontmatter };
  
  // Add ISBN if not present
  if (!updated.isbn && bookData) {
    // ISBN is already known from the file
  }
  
  // Add bookAuthor (first author) if not present
  if (!updated.bookAuthor && bookData?.details?.authors?.length > 0) {
    const authors = bookData.details.authors
      .map((author) => author.name)
      .filter(
        (author) =>
          !bookData.details.contributors?.some(
            (contributor) =>
              contributor.name === author &&
              contributor.role.toLowerCase() === "translator"
          )
      );
    if (authors.length > 0) {
      updated.bookAuthor = authors[0];
    }
  }
  
  // Add authors array if not present
  if (!updated.authors && bookData?.details?.authors?.length > 0) {
    updated.authors = bookData.details.authors
      .map((author) => author.name)
      .filter(
        (author) =>
          !bookData.details.contributors?.some(
            (contributor) =>
              contributor.name === author &&
              contributor.role.toLowerCase() === "translator"
          )
      );
  }
  
  // Add publishers if not present
  if (!updated.publishers && bookData?.details?.publishers?.length > 0) {
    updated.publishers = bookData.details.publishers;
  }
  
  // Add publishDate if not present
  if (!updated.publishDate && bookData?.details?.publish_date) {
    try {
      const publishDate = new Date(bookData.details.publish_date);
      if (!isNaN(publishDate.getTime())) {
        updated.publishDate = publishDate.toISOString();
      }
    } catch (error) {
      // Invalid date, skip
    }
  }
  
  // Add pages if not present
  if (!updated.pages && bookData?.details?.number_of_pages) {
    updated.pages = bookData.details.number_of_pages;
  }
  
  // Add coverImage if not present and we downloaded a cover
  if (!updated.coverImage && coverImagePath) {
    // Use relative path for Astro's image() helper
    // Path from src/content/catalogueBook/ to src/images/catalogueBook/
    updated.coverImage = `../../images/catalogueBook/${path.basename(coverImagePath)}`;
  }
  
  return updated;
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
      // Escape quotes and handle multiline strings
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
  const slug = getSlugFromFilename(filename);
  
  logInfo(`Processing ${filename}...`);
  
  try {
    // Read markdown file
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data: frontmatter, content } = matter(fileContent);
    
    // Check if ISBN exists
    if (!frontmatter.isbn) {
      logWarn(`No ISBN found in ${filename}, skipping...`);
      return false;
    }
    
    const isbn = frontmatter.isbn;
    
    // Fetch book data from OpenLibrary
    logInfo(`Fetching data for ISBN ${isbn}...`);
    const bookData = await fetchBookData(isbn);
    
    if (!bookData) {
      logWarn(`No data found for ISBN ${isbn} in ${filename}, skipping...`);
      return false;
    }
    
    // Download cover image if available
    let coverImagePath = null;
    if (bookData.thumbnail_url) {
      const coverURL = bookData.thumbnail_url.replace("-S", "-L");
      const coverFilename = `${slug}.png`;
      coverImagePath = path.join(imagesDir, coverFilename);
      
      logInfo(`Downloading cover image...`);
      const coverDownloaded = await downloadCover(coverURL, coverImagePath);
      
      if (coverDownloaded) {
        logSuccess(`Cover saved: ${coverFilename}`);
      } else {
        coverImagePath = null;
      }
    } else {
      logWarn(`No cover image available for ${filename}`);
    }
    
    // Update frontmatter with fetched data
    const updatedFrontmatter = updateFrontmatter(frontmatter, bookData, coverImagePath);
    
    // Write updated markdown back to file
    const updatedContent = formatFrontmatter(updatedFrontmatter) + "\n\n" + content;
    await fs.writeFile(filePath, updatedContent, "utf-8");
    
    logSuccess(`Updated ${filename}`);
    return true;
  } catch (error) {
    logError(`Error processing ${filename}: ${error.message}`);
    return false;
  }
}

async function main() {
  logInfo("Starting catalogue book data fetch...");
  
  // Ensure images directory exists
  await fs.mkdir(imagesDir, { recursive: true });
  
  // Get all markdown files
  const files = await getMarkdownFiles(catalogueBookDir);
  
  if (files.length === 0) {
    logWarn("No markdown files found in catalogueBook directory.");
    return;
  }
  
  logInfo(`Found ${files.length} file(s) to process.`);
  
  let processed = 0;
  let skipped = 0;
  
  for (const file of files) {
    const filePath = path.join(catalogueBookDir, file);
    const success = await processBookFile(filePath);
    
    if (success) {
      processed++;
    } else {
      skipped++;
    }
    
    // Add a small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  
  logInfo(`\nProcessing complete:`);
  logSuccess(`  Processed: ${processed}`);
  logWarn(`  Skipped: ${skipped}`);
}

main().catch((error) => {
  logError(`Fatal error: ${error.message}`);
  process.exit(1);
});

