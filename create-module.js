#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

// Get args
const args = process.argv.slice(2);
console.log(args);

const nameIndex = args.indexOf("-name");
const pathIndex = args.indexOf("-path");

if (nameIndex === -1 || !args[nameIndex + 1]) {
  console.error("Usage: node create.js -name <folderName>");
  process.exit(1);
}

if (pathIndex && !args[pathIndex + 1]) {
  console.error("Usage: node create.js -name <folderName> -path <pathName>");
  console.log(
    "Note: by default all modules will be created under src/ directory even pathName is passed"
  );
  process.exit(1);
}

const name = args[nameIndex + 1];
const pathName = pathIndex > 0 ? `src/${args[pathIndex + 1]}` : "src";
const dirPath = path.join(__dirname, pathName, name);

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

// Files to create with default content
const files = {
  "index.ts": `// index.ts - ${name} \nimport router from "./${name}.routes";\nexport default router;\n`,
  [`${name}.controller.ts`]: `// ${name}.controller.ts\n`,
  [`${name}.service.ts`]: `// ${name}.service.ts\n`,
  [`${name}.routes.ts`]: `// ${name}.routes.ts\n`,
};

// Create files
Object.entries(files).forEach(([file, content]) => {
  const filePath = path.join(dirPath, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
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

console.log("\nDirectory tree:\nsrc");
printTree(path.join(__dirname, "src"));
