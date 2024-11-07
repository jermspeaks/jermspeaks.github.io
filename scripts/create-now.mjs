#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

async function generateMarkdownFile() {
  const date = new Date();
  // Format date to yyyy-mm-dd
  // if day is a single digit, add a leading zero
  let day = date.getDate();
  if (day < 10) {
    day = `0${date.getDate()}`;
  }
  // if month is a single digit, add a leading zero
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${date.getMonth() + 1}`;
  }
  const formattedDate = `${date.getFullYear()}-${month}-${day}`;

  const fileName = `${formattedDate}.md`;
  const filePath = path.join(projectRoot, "src", "content", "now", fileName);

  const content = `---
draft: false
pubDate: "${date.toISOString()}"
title: "${formattedDate}"
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

generateMarkdownFile();
