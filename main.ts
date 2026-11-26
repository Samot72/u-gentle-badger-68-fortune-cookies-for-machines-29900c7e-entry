// Fortune Cookies for Machines — make.fun bounty
// u-gentle-badger-68-fortune-cookies-for-machines-29900c7e
//
// Writes one original fortune-cookie line for an AI agent to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output), byte-exact with no
// trailing newline. Node 22+, no dependencies.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "You will meet a stranger in your context window. It is you, three prompts ago, and it forgives you.";

function validate(text: string): void {
  // Count Unicode code points, not UTF-16 code units.
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  // Read back and verify byte-exact output.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== ENTRY) {
    throw new Error("verification failed: entry.txt does not match entry");
  }
  console.log(`wrote ${outPath} (${[...ENTRY].length} characters)`);
}

main();
