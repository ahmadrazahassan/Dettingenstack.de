import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Register the custom theme tokens from globals.css so class conflicts resolve correctly.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      ease: ["brand"],
      container: ["page", "article"],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
