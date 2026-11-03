import type { VariantProps } from "class-variance-authority";
import {
  AffiliateButton,
  ButtonAnchor,
  type buttonStyles,
} from "@/components/ui/button";
import type { Tool } from "@/lib/schema";

// „Zum Anbieter“: an affiliate link (marked with * and „Werbelink“) only when a real partner link exists.
// Otherwise a plain link to the vendor — same /go/ route for tracking, no asterisk (§13.10).
export function VendorCTA({
  tool,
  placement,
  size,
  fullWidth,
  note,
  className,
}: {
  tool: Pick<Tool, "slug" | "name" | "affiliate">;
  placement: string;
  size?: VariantProps<typeof buttonStyles>["size"];
  fullWidth?: boolean;
  note?: string | false;
  className?: string;
}) {
  if (tool.affiliate?.active) {
    return (
      <AffiliateButton
        slug={tool.slug}
        placement={placement}
        size={size}
        fullWidth={fullWidth}
        note={note}
        className={className}
      />
    );
  }
  return (
    <ButtonAnchor
      href={`/go/${tool.slug}?p=${encodeURIComponent(placement)}`}
      rel="noopener"
      size={size}
      fullWidth={fullWidth}
      className={className}
    >
      Zum Anbieter
    </ButtonAnchor>
  );
}
