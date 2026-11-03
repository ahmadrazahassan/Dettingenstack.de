import Image from "next/image";
import { imagesById } from "@/data/images";
import { cn } from "@/lib/cn";

// Renders an image from the registry (src/data/images.ts) by its ID from DETTINGEN_IMAGE_PROMPTS.md.
// `ratio` crops with object-cover; without it the image keeps its own proportions.
// Spots (C-xx) are decorative: no radius, empty alt unless the registry gives one.
export function SiteImage({
  id,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  ratio,
  eager,
  className,
}: {
  id: string;
  sizes?: string;
  ratio?: string;
  /** For the LCP image above the fold. */
  eager?: boolean;
  className?: string;
}) {
  const image = imagesById[id];
  if (!image) throw new Error(`Unbekannte Bild-ID: ${id}`);
  const spot = id.startsWith("C-");
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      style={ratio ? { aspectRatio: ratio } : undefined}
      className={cn(
        "h-auto w-full object-cover",
        !spot && "rounded-xl bg-neutral-50",
        className,
      )}
    />
  );
}
