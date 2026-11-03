# Dettingenstack

German-language B2B software comparison platform. The full specification is in
[`../DETTINGEN_WEBSITE_PROMPT.md`](../DETTINGEN_WEBSITE_PROMPT.md), image briefs in
[`../DETTINGEN_IMAGE_PROMPTS.md`](../DETTINGEN_IMAGE_PROMPTS.md).

## Stack

Next.js 16.4 (App Router, Turbopack, Cache Components, React Compiler) · React 19.3 · TypeScript 7 ·
Tailwind CSS 4.3 · Radix UI · lucide-react · Recharts 3 · Motion · Zod 4 · Biome 2. Node ≥ 24.11, pnpm 12.

## Commands

```bash
pnpm dev            # http://localhost:3000
pnpm build          # production build
pnpm check          # Biome + TypeScript + design rules
pnpm check:design   # brand rules only (no pills, tokens only, banned icons, EUR only, no Google Fonts CDN)
```

## Where things are

| Path                                                 | What                                                                            |
| ---------------------------------------------------- | ------------------------------------------------------------------------------- |
| `src/app/globals.css`                                | Design tokens (`@theme`), typography utilities (`type-*`), Textmarker motifs    |
| `src/app/fonts.ts`                                   | Outfit, Nunito Sans, Work Sans via `next/font` (self-hosted, no fallback)       |
| `src/components/ui`                                  | Buttons, badges, form controls, tabs, accordion, tooltip, toast, tables         |
| `src/components/layout`                              | Header, mega menu, search, mobile menu, footer, disclosure bar, newsletter band |
| `src/components/{tool,cards,content,charts,compare}` | Score, cards, editorial blocks, charts, compare tray                            |
| `src/data/navigation.ts`                             | Categories and navigation (phase 0; typed data model follows in phase 1)        |
| `scripts/check-design-rules.ts`                      | Enforces the brand rules from §2 / §19 of the spec                              |
| `/styleguide`                                        | Every component with example data (noindex)                                     |

## Status

Phases 0–2 done for the HR-Software slice (data, engines, templates, tools, home, search). From phase 4:
`/go/[slug]` redirect, „Angebot anfragen“ lead form, contact forms, `sitemap.xml`.

Phase 3 (partly):

- 20 Ratgeber (`src/data/guides.ts` + `src/content/ratgeber/*.mdx`) with sources, checked on 2026-11-02. They are compact
  (≈ 420–600 words each); the spec target is 1.800–3.500 words.
- Marktdaten (Destatis IKT-Erhebung 2025), Über uns, Redaktion, Für Anbieter, Kontakt, Newsletter (+ bestätigt).
- Buchhaltungssoftware is live: 9 tools (`src/data/tools/*`, prices checked 2026-11-02), 2 comparisons, buying guide.
  Plans without the category's core function carry
  `excludeFromEntry` (not used for „ab … €“ or cost comparisons).
- All 10 categories are live (one registry file each in `src/data/registry`): 91 tools, 25 comparisons, a buying
  guide per category. Prices checked 2026-11-02/03 on vendor pages. Rules that shaped the data:
  - Prices are EUR only (`pnpm check:design` rejects dollar amounts). Vendors whose pricing page only showed US dollars
    (Asana, monday.com, ClickUp, Jira, Wrike, Notion, MeisterTask, Mailchimp, GetResponse, Shopify) are listed with
    quote plans and a note instead of a price.
  - Newsletter-Software and Shopsysteme use unit `pauschal`: the smallest published package, with its contact or
    volume tier in the plan limits.
  - Partner-only ECM/ERP vendors (DocuWare, ELO, d.velop, enaio, EASY, M-Files, windream, SAP Business One) carry
    only what their site confirms; `src/data/tools/_dms.ts` builds those entries.
  - Sage Deutschland (checked 2026-11-03 on sage.com/de-de): Sage Active, Sage 50, Sage 50 Handwerk, Sage Intacct,
    Sage 100, Sage X3, Sage Operations, Sage b7, Sage Wincarat, Sage HR & Payroll, Sage HR Suite, Sage People and
    Sage Sales Management (`src/data/tools/sage-*.ts`, shared facts in `_sage.ts`). Sage Active list prices are used,
    not the 3-month launch discount. The Sage HR Managed Service (payroll outsourcing) is a service, not listed.
  - Left out because no current price or product data could be verified: plentyONE, Mailjet, HubSpot
    Marketing Hub, Wix, IONOS, STRATO.

All 70 images from `public/images` are in use via `SiteImage` (registry: `src/data/images.ts`).

Vendor logos (`public/logos/tools`, registry `src/data/logos.ts`) were downloaded on 2026-11-03 from each vendor's
official website (icon or header logo; a few via the site's own favicon). `public/logos` is excluded from Biome.
windream.com now redirects to the dataglobal Group, so windream carries their logo and website.

Kostenrechner (`?kategorie=&anzahl=`), Software-Finder (`?k=`, 6 questions per category in `src/data/quizzes/index.ts`)
and Vergleichstool work across all 10 categories; category hubs link to both with prefilled parameters.

Still open: hands-on tests (all scores are drafts), Brevo/Friendly Captcha
credentials (forms say „wird eingerichtet“ until `BREVO_API_KEY`, `LEADS_SENDER_EMAIL`, `LEADS_INBOX_EMAIL` /
`CONTACT_INBOX_EMAIL` are set), real author profiles, OG images, Playwright e2e. Legal pages are skeletons and stay
`noindex` until a lawyer has reviewed them.
