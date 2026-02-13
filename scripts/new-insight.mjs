#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

const getArgValue = (name) => {
  const index = args.indexOf(name);
  if (index === -1) return "";
  return args[index + 1] || "";
};

const slugify = (input) =>
  input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const escapeQuotes = (input) => String(input).replace(/"/g, '\\"');

const title = getArgValue("--title");
if (!title) {
  console.error(
    'Usage: npm run new:insight -- --title "Your article title" [--slug your-slug]'
  );
  process.exit(1);
}

const slug = getArgValue("--slug") || slugify(title);
if (!slug) {
  console.error("Could not derive a valid slug. Please provide --slug.");
  process.exit(1);
}

const targetDir = path.resolve("src/content/insights");
const targetFile = path.join(targetDir, `${slug}.md`);

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

if (fs.existsSync(targetFile)) {
  console.error(`File already exists: ${targetFile}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const content = `---
title: "${escapeQuotes(title)}"
description: "TODO: Add a concise meta description (140-160 characters)."
pubDate: ${today}
tags:
  - b2b
  - analytics
draft: true
---

## Why this matters

TODO

## What to change

TODO

## Practical checklist

- TODO
- TODO
- TODO

## Next step

Link to a relevant page, for example [Offer](/offer/) or [Contact](/contact/).
`;

fs.writeFileSync(targetFile, content, "utf8");
console.log(`Created ${path.relative(process.cwd(), targetFile)}`);
