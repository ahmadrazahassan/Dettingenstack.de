import { after, type NextRequest, NextResponse } from "next/server";
import { getTool } from "@/data";
import { trackServerEvent } from "@/lib/analytics";

const PLACEMENT = /^[a-z0-9-]{1,40}$/;

// Outbound link to a vendor (§14.1). Uses the partner link only when an active affiliate deal exists,
// otherwise the vendor's own website. Never indexed, never cached.
export async function GET(
  req: NextRequest,
  { params }: RouteContext<"/go/[slug]">,
) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return NextResponse.redirect(new URL("/", req.url), 302);

  const rawPlacement = req.nextUrl.searchParams.get("p") ?? "";
  const placement = PLACEMENT.test(rawPlacement) ? rawPlacement : "unbekannt";
  const affiliate = tool.affiliate?.active ? tool.affiliate : undefined;
  const target = new URL(affiliate ? affiliate.url : tool.vendor.website);
  if (affiliate?.subIdParam)
    target.searchParams.set(affiliate.subIdParam, placement);

  after(() =>
    trackServerEvent(
      "Affiliate Click",
      { tool: slug, placement, affiliate: String(Boolean(affiliate)) },
      req,
    ),
  );

  return NextResponse.redirect(target, {
    status: 302,
    headers: {
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}
