#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

async function generateMarkdownFile(title, tags) {
  const date = new Date();
  const fileName = `${date.toISOString()}.md`;
  const filePath = path.join(
    projectRoot,
    "src",
    "content",
    "stream",
    fileName
  );

  const content = `---
draft: false
pubDate: "${date.toISOString()}"
tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]
title: "${title}"
---

`;

  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content);
    console.log(`File created successfully: ${filePath}`);
  } catch (error) {
    console.error("Error creating file:", error);
  }
}

const args = process.argv.slice(2);
const title = args[0];
const tags = args.slice(1);

if (!title) {
  console.error("Please provide a title as the first argument.");
  console.error(
    'Usage: node scripts/create-stream.mjs "Your Post Title" [tag1] [tag2] ...'
  );
  process.exit(1);
}

generateMarkdownFile(title, tags);
