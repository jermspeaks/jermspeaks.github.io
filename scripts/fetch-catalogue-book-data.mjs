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

/**
 * Get image dimensions from a URL without downloading the full image
 */
async function getImageDimensions(url) {
  try {
    // Try to download just enough bytes to read image metadata
    // Most image formats store metadata at the beginning
    const response = await fetch(url, {
      headers: { Range: "bytes=0-32768" }, // First 32KB should contain metadata for most formats
    });
    
    if (!response.ok) {
      // If Range request fails, try full request (some servers don't support Range)
      const fullResponse = await fetch(url);
      if (!fullResponse.ok) {
        return null;
      }
      const buffer = Buffer.from(await fullResponse.arrayBuffer());
      const metadata = await sharp(buffer).metadata();
      return { width: metadata.width, height: metadata.height };
    }
    
    const buffer = Buffer.from(await response.arrayBuffer());
    const metadata = await sharp(buffer).metadata();
    return { width: metadata.width, height: metadata.height };
  } catch (error) {
    return null;
  }
}

/**
 * Get cover image URLs from multiple sources
 */
function getCoverImageSources(isbn) {
  const sources = [];
  
  // OpenLibrary - Large size (best quality)
  sources.push({
    name: "OpenLibrary-L",
    url: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`,
    priority: 1,
  });
  
  // OpenLibrary - Medium size (fallback)
  sources.push({
    name: "OpenLibrary-M",
    url: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,
    priority: 2,
  });
  
  // BookCover-API (Goodreads)
  sources.push({
    name: "BookCover-API",
    url: `https://bookcover.longitood.com/bookcover/${isbn}`,
    priority: 3,
  });
  
  return sources;
}

/**
 * Fetch Google Books cover URL
 */
async function getGoogleBooksCover(isbn) {
  try {
    const searchUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    const response = await fetch(searchUrl);
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const volumeInfo = data.items[0].volumeInfo;
      if (volumeInfo.imageLinks) {
        // Try thumbnail, small, medium, large, extraLarge in order of preference
        return (
          volumeInfo.imageLinks.extraLarge ||
          volumeInfo.imageLinks.large ||
          volumeInfo.imageLinks.medium ||
          volumeInfo.imageLinks.small ||
          volumeInfo.imageLinks.thumbnail
        );
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Find the best cover image from multiple sources
 */
async function findBestCover(isbn, minWidth = 200, fallbackMinWidth = 100) {
  const sources = getCoverImageSources(isbn);
  const preferredCandidates = []; // Images >= minWidth (200px)
  const fallbackCandidates = []; // Images >= fallbackMinWidth (100px) but < minWidth
  
  // Handle Google Books separately since it requires a lookup
  const googleBooksUrl = await getGoogleBooksCover(isbn);
  if (googleBooksUrl) {
    sources.push({
      name: "GoogleBooks",
      url: googleBooksUrl,
      priority: 1.5, // High priority if available
    });
  }
  
  // Check each source
  for (const source of sources) {
    try {
      logInfo(`  Checking ${source.name}...`);
      const dimensions = await getImageDimensions(source.url);
      
      if (dimensions) {
        const candidate = {
          ...source,
          width: dimensions.width,
          height: dimensions.height,
          score: dimensions.width * dimensions.height, // Area as quality score
        };
        
        if (dimensions.width >= minWidth) {
          preferredCandidates.push(candidate);
          logInfo(`    ✓ Found ${dimensions.width}x${dimensions.height}px (meets ${minWidth}px requirement)`);
        } else if (dimensions.width >= fallbackMinWidth) {
          fallbackCandidates.push(candidate);
          logInfo(`    ✓ Found ${dimensions.width}x${dimensions.height}px (fallback, meets ${fallbackMinWidth}px minimum)`);
        } else {
          logInfo(`    ✗ Too small: ${dimensions.width}x${dimensions.height}px (below ${fallbackMinWidth}px minimum)`);
        }
      } else {
        logInfo(`    ✗ Not available`);
      }
      
      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 200));
    } catch (error) {
      logInfo(`    ✗ Error: ${error.message}`);
    }
  }
  
  // Use preferred candidates if available, otherwise fall back to fallback candidates
  const candidates = preferredCandidates.length > 0 ? preferredCandidates : fallbackCandidates;
  
  if (candidates.length === 0) {
    return null;
  }
  
  // Sort by priority first, then by quality score
  candidates.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return b.score - a.score; // Higher score (larger area) is better
  });
  
  const best = candidates[0];
  const qualityLevel = preferredCandidates.length > 0 ? "preferred" : "fallback";
  logSuccess(`  Selected ${best.name} (${best.width}x${best.height}px) [${qualityLevel}]`);
  return best;
}

async function downloadCover(coverURL, outputPath) {
  try {
    const response = await fetch(coverURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Always convert to PNG for consistency
    await sharp(buffer).png().toFile(outputPath);
    
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
    
    // Find and download the best cover image from multiple sources
    let coverImagePath = null;
    logInfo(`Searching for cover image (preferred: 200px+, fallback: 100px+ minimum)...`);
    const bestCover = await findBestCover(isbn, 200, 100);
    
    if (bestCover) {
      const coverFilename = `${slug}.png`;
      coverImagePath = path.join(imagesDir, coverFilename);
      
      logInfo(`Downloading cover from ${bestCover.name}...`);
      const coverDownloaded = await downloadCover(bestCover.url, coverImagePath);
      
      if (coverDownloaded) {
        logSuccess(`Cover saved: ${coverFilename} (${bestCover.width}x${bestCover.height}px)`);
      } else {
        coverImagePath = null;
      }
    } else {
      logWarn(`No suitable cover image found (minimum 100px width) for ${filename}`);
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

