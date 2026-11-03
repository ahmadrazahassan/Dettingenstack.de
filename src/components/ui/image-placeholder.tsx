import { cn } from "@/lib/cn";

// Stand-in until the images from DETTINGEN_IMAGE_PROMPTS.md are generated.
// Shows the image ID so the right file is easy to drop in later.
export function ImagePlaceholder({
  id,
  label,
  ratio = "4/3",
  className,
}: {
  id: string;
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Platzhalter für Bild ${id}: ${label}`}
      style={{ aspectRatio: ratio }}
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-xl border border-neutral-300 border-dashed bg-neutral-50 p-4 text-center",
        className,
      )}
    >
      <span className="type-ui-sm font-semibold text-black">{id}</span>
      <span className="type-ui-sm max-w-[24ch] text-neutral-600">{label}</span>
    </div>
  );
}
