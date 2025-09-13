#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

// Get args
const args = process.argv.slice(2);
const nameIndex = args.indexOf("-name");

if (nameIndex === -1 || !args[nameIndex + 1]) {
  console.error("Usage: node create.js -name <folderName>");
  process.exit(1);
}

const name = args[nameIndex + 1];
const dirPath = path.join(__dirname, "src", name);

// Ensure src exists
if (!fs.existsSync(path.join(__dirname, "src"))) {
  fs.mkdirSync(path.join(__dirname, "src"));
}

// Create folder
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
  console.log(`Created folder: ${dirPath}`);
} else {
  console.log(`Folder already exists: ${dirPath}`);
}

// Files to create
const files = [
  `${name}.controller.ts`,
  `${name}.service.ts`,
  `${name}.order.ts`,
];

// Create files
files.forEach((file) => {
  const filePath = path.join(dirPath, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, `// ${file}\n`);
    console.log(`Created file: ${filePath}`);
  } else {
    console.log(`File already exists: ${filePath}`);
  }
});

// Print directory tree
function printTree(dir, indent = "") {
  const items = fs.readdirSync(dir);
  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isLast = index === items.length - 1;
    console.log(`${indent}${isLast ? "└──" : "├──"} ${item}`);
    if (fs.statSync(fullPath).isDirectory()) {
      printTree(fullPath, indent + (isLast ? "    " : "│   "));
    }
  });
}

console.log("\nDirectory tree:");
printTree(path.join(__dirname, "src"));
