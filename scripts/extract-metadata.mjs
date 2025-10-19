#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const CACHE_FILE = path.join(projectRoot, ".cache", "link-metadata.json");

async function loadCache() {
  try {
    const data = await fs.readFile(CACHE_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ No cache file found. Run `npm run dev` first to populate the cache.");
    process.exit(1);
  }
}

function formatForAstro(url, metadata) {
  const title = metadata.title.replace(/"/g, '\\"');
  const description = metadata.description.replace(/"/g, '\\"');
  const image = metadata.image || '';
  
  return `<LinkPreview 
  url="${url}"
  title="${title}"
  image="${image}"
  description="${description}"
/>`;
}

async function main() {
  const args = process.argv.slice(2);
  const cache = await loadCache();
  const urls = Object.keys(cache);

  if (urls.length === 0) {
    console.log("📦 Cache is empty. Visit pages with LinkPreview components in dev mode.");
    return;
  }

  // If specific URL provided, show only that one
  if (args[0]) {
    const searchUrl = args[0];
    const exactMatch = cache[searchUrl];
    
    if (exactMatch) {
      console.log(`\n📋 Formatted component for ${searchUrl}:\n`);
      console.log(formatForAstro(searchUrl, exactMatch));
      console.log("\n");
      return;
    }
    
    // Try partial match
    const matches = urls.filter(url => url.includes(searchUrl));
    
    if (matches.length === 0) {
      console.log(`❌ No cached metadata found for URLs containing: ${searchUrl}`);
      console.log(`\n💡 Available URLs:`);
      urls.forEach((url, i) => console.log(`${i + 1}. ${url}`));
      return;
    }
    
    if (matches.length === 1) {
      console.log(`\n📋 Formatted component for ${matches[0]}:\n`);
      console.log(formatForAstro(matches[0], cache[matches[0]]));
      console.log("\n");
      return;
    }
    
    console.log(`\n🔍 Multiple matches found:\n`);
    matches.forEach((url, i) => {
      console.log(`${i + 1}. ${url}`);
    });
    console.log(`\n💡 Use the full URL to get formatted output`);
    return;
  }

  // Show all cached URLs with formatted output
  console.log(`\n📦 Found ${urls.length} cached URL(s):\n`);
  console.log("=".repeat(80) + "\n");
  
  urls.forEach((url, i) => {
    const metadata = cache[url];
    console.log(`${i + 1}. ${url}`);
    console.log(`   Cached: ${new Date(metadata.cachedAt).toLocaleString()}`);
    console.log(`\n${formatForAstro(url, metadata)}`);
    console.log("\n" + "=".repeat(80) + "\n");
  });
}

main();
