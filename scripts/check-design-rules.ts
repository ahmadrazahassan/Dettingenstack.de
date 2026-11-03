// Enforces the brand rules from DETTINGEN_WEBSITE_PROMPT.md §2 / §19 that a linter can't express.
// Run: pnpm check:design (exit code 1 on any violation).

import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = join(import.meta.dirname, "..");
const scanDirs = ["src", "content"];
const extensions = new Set([".ts", ".tsx", ".css", ".mdx"]);

// Files allowed to break a specific rule, with the reason.
const allow = {
  roundedFull: ["src/components/ui/misc.tsx"], // Avatar: circular photos only (§2.6)
  hex: [
    "src/app/globals.css", // the token source
    "src/app/(site)/styleguide/page.tsx", // prints the token hex values as documentation
  ],
};

const bannedIcons = [
  "Sparkles",
  "Sparkle",
  "WandSparkles",
  "Wand",
  "Zap",
  "Rocket",
  "Bot",
  "BrainCircuit",
  "Brain",
  "Stars",
  "Flame",
  "Gem",
  "Crown",
  "PartyPopper",
  "Lightbulb",
];

type Rule = {
  name: string;
  test: (line: string, file: string) => boolean;
  skip?: (file: string) => boolean;
};

const rules: Rule[] = [
  {
    name: "Pill shape (rounded-full / 9999px) outside Avatar",
    test: (l) => /\brounded-full\b|9999px|rounded-\[999/.test(l),
    skip: (f) => allow.roundedFull.includes(f),
  },
  {
    name: "Raw hex colour outside the token file — use a token",
    test: (l) => {
      // Anchors like href="#farben" are not colours: drop href/id/aria values before testing.
      const s = l.replace(/(href|id|aria-[\w-]+)=\{?["'`][^"'`]*["'`]/g, "");
      return /(?<![&\w])#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![\w-])/.test(s);
    },
    skip: (f) => allow.hex.includes(f),
  },
  {
    name: "Banned AI-cliché icon import",
    test: (l) =>
      /from "lucide-react"/.test(l) &&
      bannedIcons.some((i) => new RegExp(`\\b${i}\\b`).test(l)),
  },
  {
    name: "Google Fonts CDN (DSGVO) — use next/font",
    test: (l) => /fonts\.googleapis\.com|fonts\.gstatic\.com/.test(l),
  },
  {
    name: "font-family other than the three brand fonts",
    test: (l) =>
      /font-family\s*:|fontFamily\s*:/.test(l) &&
      !/var\(--font-(outfit|nunito-sans|work-sans|display|sans|ui)\)/.test(l),
  },
  {
    name: "Dollar price — prices are EUR only",
    test: (l) => /\d[\d.,]*\s?\$(?!\{)|(?<![\w`])\$\s?\d/.test(l),
  },
];

function walk(dir: string): string[] {
  let out: string[] = [];
  let entries: string[] = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out = out.concat(walk(full));
    else if (extensions.has(extname(full))) out.push(full);
  }
  return out;
}

const violations: string[] = [];
for (const dir of scanDirs) {
  for (const file of walk(join(root, dir))) {
    const rel = relative(root, file).replaceAll("\\", "/");
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (line.includes("design-rules-ignore")) return;
      for (const rule of rules) {
        if (rule.skip?.(rel)) continue;
        if (rule.test(line, rel))
          violations.push(`${rel}:${i + 1}  ${rule.name}\n    ${line.trim()}`);
      }
    });
  }
}

if (violations.length > 0) {
  console.error(`✗ ${violations.length} design-rule violation(s):\n`);
  console.error(violations.join("\n\n"));
  process.exit(1);
}
console.log("✓ Design rules: no violations.");
