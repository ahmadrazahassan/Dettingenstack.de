import { site } from "./site";

// Server-side Plausible events (§18). Cookieless; we forward only the user agent and IP that Plausible
// needs to count unique visitors, never personal data. Without NEXT_PUBLIC_PLAUSIBLE_DOMAIN it does nothing.
export async function trackServerEvent(
  name: "Affiliate Click" | "Lead Submitted" | "Newsletter Signup",
  props: Record<string, string>,
  req: { headers: Headers; url?: string },
) {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return;
  const endpoint =
    process.env.PLAUSIBLE_EVENTS_API ?? "https://plausible.io/api/event";
  try {
    await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": req.headers.get("user-agent") ?? "",
        "X-Forwarded-For":
          req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "",
      },
      body: JSON.stringify({ name, domain, url: req.url ?? site.url, props }),
    });
  } catch {
    // Analytics must never break a redirect or a form.
  }
}
