import { Nunito_Sans, Outfit, Work_Sans } from "next/font/google";

// Only these three families (brand rule). No fallback stacks.
// next/font self-hosts the files at build time, so no request ever goes to Google.
// `display: "block"` never flashes a non-brand font; the files are preloaded.

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "block",
  fallback: [],
  adjustFontFallback: false,
  preload: true,
});

export const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "block",
  fallback: [],
  adjustFontFallback: false,
  preload: true,
});

export const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "block",
  fallback: [],
  adjustFontFallback: false,
  preload: true,
});

export const fontVariables = `${outfit.variable} ${nunitoSans.variable} ${workSans.variable}`;
