"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

// Size keys are the slot names used across the site; the rendered boxes are a step larger so vendor
// logos stay legible (40 / 56 / 80 / 112 px), with tight padding so the mark fills the box.
const sizes = {
  32: { box: "size-10 p-1", px: 40 },
  48: { box: "size-14 p-1", px: 56 },
  64: { box: "size-20 p-1.5", px: 80 },
  96: { box: "size-28 p-2", px: 112 },
} as const;

// Fixed square box; falls back to a monogram instead of ever showing alt text in the layout (§10.12).
export function ToolLogo({
  name,
  src,
  size = 48,
  className,
}: {
  name: string;
  src?: string | null;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .replace(/[^\p{L}\p{N} ]/gu, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-white",
        sizes[size].box,
        className,
      )}
    >
      {src && !failed ? (
        <Image
          src={src}
          alt={`${name} Logo`}
          width={sizes[size].px}
          height={sizes[size].px}
          onError={() => setFailed(true)}
          // SVGs are served as-is; the image optimizer only handles raster formats.
          unoptimized={src.endsWith(".svg")}
          className="size-full object-contain"
        />
      ) : (
        <span
          role="img"
          aria-label={`${name} Logo`}
          className="flex size-full items-center justify-center rounded-sm bg-neutral-100 font-bold font-display text-black"
          style={{ fontSize: sizes[size].px * 0.34 }}
        >
          {initials || "?"}
        </span>
      )}
    </span>
  );
}
