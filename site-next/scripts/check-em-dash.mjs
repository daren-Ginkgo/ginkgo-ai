// House rule: no em dashes (U+2014) anywhere in the marketing site's copy.
// Fails the build/lint with file:line locations so it cannot regress.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const targets = ["app", "components", "lib"];
const extensions = new Set([".ts", ".tsx", ".css", ".mdx", ".md"]);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if ([...extensions].some((ext) => name.endsWith(ext))) yield path;
  }
}

const hits = [];
for (const target of targets) {
  for (const file of walk(join(root, target))) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      if (line.includes("—")) hits.push(`${file}:${index + 1}`);
    });
  }
}

if (hits.length) {
  console.error(`Em dash (U+2014) found in ${hits.length} place(s). House rule: use a spaced en dash, colon, comma or full stop instead.`);
  for (const hit of hits) console.error(`  ${hit}`);
  process.exit(1);
}
console.log("No em dashes in app/, components/ or lib/.");
