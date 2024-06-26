#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

async function generateMarkdownFile(title, tags) {
  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0];
  const fileName = `${formattedDate}-${title
    .toLowerCase()
    .replace(/\s+/g, "-")}.md`;
  const filePath = path.join(
    projectRoot,
    "src",
    "content",
    "writing",
    fileName
  );

  const content = `---
description: ""
draft: true
pubDate: "${date.toISOString()}"
tags: [${tags.map((tag) => `"${tag}"`).join(", ")}]
title: "${title}"
updatedDate: "${date.toISOString()}"
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
    'Usage: node scripts/create-writing.mjs "Your Post Title" [tag1] [tag2] ...'
  );
  process.exit(1);
}

generateMarkdownFile(title, tags);
