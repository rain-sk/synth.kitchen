const { readFileSync } = require("node:fs");
const { createRequire, builtinModules } = require("node:module");
const { resolve } = require("node:path");

const bundle = resolve(process.argv[2] || "build/index.js");
const resolveFrom = createRequire(bundle);

const SPECIFIER = /(?:\bfrom\b|\brequire\()\s*["']([^"']+)["']/g;

const isExternal = (specifier) =>
  !specifier.startsWith(".") &&
  !specifier.startsWith("/") &&
  !builtinModules.includes(specifier.replace(/^node:/, ""));

const bareSpecifiers = (source) => {
  const found = new Set();
  for (const match of source.matchAll(SPECIFIER)) {
    if (isExternal(match[1])) found.add(match[1]);
  }
  return [...found].sort();
};

const source = readFileSync(bundle, "utf8");
const missing = [];

for (const specifier of bareSpecifiers(source)) {
  try {
    resolveFrom.resolve(specifier);
    console.log(`  ok       ${specifier}`);
  } catch (error) {
    missing.push(`${specifier}: ${error.code || error.message}`);
    console.log(`  MISSING  ${specifier}`);
  }
}

if (missing.length) {
  console.error(
    `\n${missing.length} of the bundle's externals do not resolve from ${bundle}:`
  );
  console.error(missing.map((line) => `  ${line}`).join("\n"));
  process.exit(1);
}

console.log(
  `\nall ${bareSpecifiers(source).length} externals resolve from ${bundle}`
);
