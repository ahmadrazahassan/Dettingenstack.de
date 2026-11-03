import { z } from "zod";

// Single source of types (§6). Money: integer cents, net. Scores: integers 0–100 (87 = „8,7“).

export const Cents = z.number().int().nonnegative();
export const ScoreInt = z.number().int().min(0).max(100);
export const IsoDate = z.iso.date();

export const CATEGORY_SLUGS = [
  "buchhaltungssoftware",
  "rechnungsprogramme",
  "crm-software",
  "hr-software",
  "zeiterfassungssoftware",
  "projektmanagement-software",
  "erp-software",
  "newsletter-software",
  "dokumentenmanagement-software",
  "shopsysteme",
] as const;
export const CategorySlug = z.enum(CATEGORY_SLUGS);
export type CategorySlug = z.infer<typeof CategorySlug>;

export const CRITERIA = [
  "funktionen",
  "bedienbarkeit",
  "preisLeistung",
  "datenschutz",
  "support",
  "integrationen",
] as const;
export const Criterion = z.enum(CRITERIA);
export type Criterion = z.infer<typeof Criterion>;

export const CRITERION_LABELS: Record<Criterion, string> = {
  funktionen: "Funktionsumfang",
  bedienbarkeit: "Bedienbarkeit",
  preisLeistung: "Preis-Leistung",
  datenschutz: "Datenschutz & Sicherheit",
  support: "Support & Service",
  integrationen: "Integrationen",
};

// solo = 1 · kleinst = 2–9 · klein = 10–49 · mittel = 50–249 · gross = 250+
export const CompanySize = z.enum([
  "solo",
  "kleinst",
  "klein",
  "mittel",
  "gross",
]);
export type CompanySize = z.infer<typeof CompanySize>;

export const Unit = z.enum([
  "nutzer",
  "mitarbeitende",
  "konto",
  "kontakte_1000",
  "bestellungen",
  "rechnungen",
  "pauschal",
]);
export type Unit = z.infer<typeof Unit>;

// Tri-state for facts we could not verify: never guess „nein“ (§2.9).
export const Tri = z.enum(["ja", "nein", "unbekannt"]);
export type Tri = z.infer<typeof Tri>;

export const Source = z.object({
  name: z.string(),
  url: z.url(),
  publishedAt: IsoDate.optional(),
  accessedAt: IsoDate,
});
export type Source = z.infer<typeof Source>;

// null = this billing option is not offered (or not published).
export const PricePair = z.object({
  monthly: Cents.nullable(),
  annualPerMonth: Cents.nullable(),
});
export type PricePair = z.infer<typeof PricePair>;

const units = { unit: Unit };

export const PriceModel = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("free"),
    limits: z.string(),
    maxUnits: z.number().int().positive().optional(),
  }),
  z.object({
    type: z.literal("per_unit"),
    ...units,
    price: PricePair,
    minUnits: z.number().int().positive().optional(),
    maxUnits: z.number().int().positive().optional(),
  }),
  z.object({
    type: z.literal("flat"),
    ...units,
    price: PricePair,
    includedUnits: z.number().int().positive(),
  }),
  z.object({
    type: z.literal("base_plus_per_unit"),
    ...units,
    base: PricePair,
    perUnit: PricePair,
    includedUnits: z.number().int().nonnegative(),
  }),
  z.object({
    type: z.literal("volume_tiers"),
    ...units,
    tiers: z
      .array(
        z.object({
          upTo: z.number().int().positive().nullable(),
          price: PricePair,
        }),
      )
      .min(1),
  }),
  z.object({
    type: z.literal("band_flat"),
    ...units,
    bands: z
      .array(
        z.object({
          upTo: z.number().int().positive().nullable(),
          price: PricePair,
        }),
      )
      .min(1),
  }),
  z.object({
    type: z.literal("quote"),
    note: z.string().optional(),
    minUnits: z.number().int().positive().optional(),
  }),
]);
export type PriceModel = z.infer<typeof PriceModel>;

export const Plan = z.object({
  id: z.string(),
  name: z.string(),
  model: PriceModel,
  features: z.array(z.string()),
  highlights: z.array(z.string()).max(8),
  limits: z.array(z.string()).default([]),
  recommended: z.boolean().default(false),
  /** Plan without the category's core function (e.g. invoices only in an accounting tool): shown on the pricing page,
   *  but not used for „ab … €“ or for cost comparisons and calculators. */
  excludeFromEntry: z.array(CategorySlug).optional(),
});
export type Plan = z.infer<typeof Plan>;

export const PricePoint = z.object({
  date: IsoDate,
  planId: z.string(),
  price: PricePair,
  note: z.string().optional(),
});
export type PricePoint = z.infer<typeof PricePoint>;

export const Pricing = z.object({
  currency: z.enum(["EUR", "USD"]),
  usdConversion: z.object({ rate: z.number(), date: IsoDate }).optional(),
  checkedAt: IsoDate,
  sourceUrl: z.url(),
  /** Anything unclear on the vendor's pricing page, shown verbatim on the site. */
  note: z.string().optional(),
  plans: z.array(Plan).min(1),
  addOns: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        unit: Unit,
        price: PricePair,
        note: z.string().optional(),
      }),
    )
    .default([]),
  oneTimeFees: z
    .array(
      z.object({
        label: z.string(),
        amount: Cents.nullable(),
        note: z.string().optional(),
      }),
    )
    .default([]),
  contract: z.object({
    minTermMonths: z.number().int().nonnegative().nullable(),
    noticePeriod: z.string().nullable(),
    monthlyBilling: Tri,
  }),
  history: z.array(PricePoint).default([]),
});
export type Pricing = z.infer<typeof Pricing>;

export const FeatureState = z.enum([
  "ja",
  "teilweise",
  "addon",
  "nein",
  "unbekannt",
]);
export type FeatureState = z.infer<typeof FeatureState>;

export const FeatureSupport = z.object({
  status: FeatureState,
  note: z.string().optional(),
  fromPlan: z.string().optional(),
});
export type FeatureSupport = z.infer<typeof FeatureSupport>;

export const Compliance = z.object({
  serverLocation: z.enum([
    "DE",
    "DE_CH",
    "EU",
    "EU_US",
    "US",
    "andere",
    "unbekannt",
  ]),
  serverNote: z.string().optional(),
  avv: Tri,
  certifications: z
    .array(
      z.enum([
        "ISO_27001",
        "ISO_27001_IT_Grundschutz",
        "BSI_C5",
        "SOC_2",
        "TISAX",
        "IDW_PS_880",
        "GoBD_Testat",
      ]),
    )
    .default([]),
  certificationNote: z.string().optional(),
  sso: Tri,
  twoFactor: Tri,
  onPremise: Tri,
  source: Source,
});
export type Compliance = z.infer<typeof Compliance>;

export const AffiliateLink = z.object({
  network: z.enum([
    "direkt",
    "awin",
    "impact",
    "partnerstack",
    "digistore24",
    "andere",
  ]),
  url: z.url(),
  subIdParam: z.string().optional(),
  active: z.boolean(),
});

export const SponsoredPlacement = z.object({
  slot: z.enum(["home-featured", "category-top", "directory-top"]),
  category: CategorySlug.optional(),
  start: IsoDate,
  end: IsoDate,
});

export const ProCon = z.object({ title: z.string(), detail: z.string() });

export const Tool = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  status: z.enum(["published", "draft"]),
  /** true = editorial parts (scores, verdict, pros/cons) are drafts. Blocks a strict production build. */
  isPlaceholder: z.boolean().default(false),
  vendor: z.object({
    name: z.string(),
    hq: z.string(),
    countryCode: z.string().length(2),
    founded: z.number().int().optional(),
    website: z.url(),
  }),
  logo: z
    .object({ src: z.string(), width: z.number(), height: z.number() })
    .nullable(),
  categories: z.object({
    primary: CategorySlug,
    secondary: z.array(CategorySlug).default([]),
  }),
  tagline: z.string().max(90),
  bestFor: z.string().max(80),
  companySizes: z.array(CompanySize).min(1),
  pricing: Pricing,
  trial: z.object({
    available: Tri,
    days: z.number().int().optional(),
    creditCard: z.boolean().optional(),
  }),
  freePlan: Tri,
  features: z.record(z.string(), FeatureSupport),
  integrations: z.array(z.string()),
  compliance: Compliance,
  support: z.object({
    languages: z.array(z.enum(["de", "en", "fr", "andere"])),
    channels: z.array(
      z.enum(["telefon", "email", "chat", "ticket", "community"]),
    ),
    onboarding: z.enum([
      "selbst",
      "begleitet",
      "kostenpflichtig",
      "inklusive",
      "unbekannt",
    ]),
    note: z.string().optional(),
  }),
  platforms: z.array(
    z.enum(["web", "windows", "macos", "linux", "ios", "android"]),
  ),
  scores: z.record(Criterion, ScoreInt),
  scoreNotes: z.record(Criterion, z.string()),
  pros: z.array(ProCon).min(2).max(6),
  cons: z.array(ProCon).min(2).max(6),
  verdict: z.object({
    short: z.string().max(240),
    idealFor: z.array(z.string()).min(2),
    notIdealFor: z.array(z.string()).min(1),
  }),
  customersClaim: z.object({ value: z.string(), source: Source }).optional(),
  affiliate: AffiliateLink.optional(),
  sponsored: z.array(SponsoredPlacement).default([]),
  screenshots: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
        caption: z.string(),
        capturedAt: IsoDate,
      }),
    )
    .default([]),
  review: z.object({
    /** test = hands-on test; analyse = vendor information + demo only (§11.1 note). */
    method: z.enum(["test", "analyse"]),
    testedAt: IsoDate.optional(),
    testedPlan: z.string().optional(),
    testSetup: z.string(),
    authorId: z.string(),
    editorId: z.string(),
    publishedAt: IsoDate,
    updatedAt: IsoDate,
    /** File name in src/content/reviews (without .mdx). */
    mdx: z.string().optional(),
  }),
  sources: z.array(Source).default([]),
  changelog: z.array(z.object({ date: IsoDate, note: z.string() })).default([]),
});
export type Tool = z.infer<typeof Tool>;
export type ToolInput = z.input<typeof Tool>;

export const FeatureDef = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  importance: z.enum(["kern", "standard", "extra"]),
});

export const Category = z.object({
  slug: CategorySlug,
  name: z.string(),
  nameSingular: z.string(),
  nameShort: z.string(),
  unitLabel: z.object({ singular: z.string(), plural: z.string() }),
  unit: Unit,
  referenceTeams: z.array(z.number().int().positive()).min(1),
  /** Upper end of team-size sliders and cost curves (e.g. 15 users for accounting, 300 employees for HR). */
  maxTeam: z.number().int().positive().default(300),
  scoreWeights: z.record(Criterion, z.number()),
  featureGroups: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      features: z.array(FeatureDef),
    }),
  ),
  seo: z.object({
    title: z.string(),
    description: z.string().max(170),
    h1: z.string(),
  }),
  intro: z.string(),
  testTasks: z.array(z.string()),
  /** File name in src/content/category-guides (without .mdx). */
  guideMdx: z.string().optional(),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })),
  related: z.array(CategorySlug),
  authorId: z.string(),
  editorId: z.string(),
  updatedAt: IsoDate,
});
export type Category = z.infer<typeof Category>;
export type CategoryInput = z.input<typeof Category>;

export const Verdict = z.object({ winner: z.string(), note: z.string() });

export const Comparison = z.object({
  slug: z.string(),
  toolA: z.string(),
  toolB: z.string(),
  category: CategorySlug,
  isPlaceholder: z.boolean().default(false),
  seo: z.object({
    title: z.string(),
    description: z.string().max(170),
    h1: z.string(),
  }),
  verdict: z.object({
    winner: z.string(),
    summary: z.string(),
    chooseAIf: z.array(z.string()).min(2),
    chooseBIf: z.array(z.string()).min(2),
  }),
  criteriaNotes: z.record(Criterion, Verdict),
  featureGroupVerdicts: z.record(z.string(), Verdict),
  personas: z
    .array(
      z.object({ label: z.string(), pick: z.string(), reason: z.string() }),
    )
    .min(3),
  migration: z.string(),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })),
  authorId: z.string(),
  editorId: z.string(),
  publishedAt: IsoDate,
  updatedAt: IsoDate,
});
export type Comparison = z.infer<typeof Comparison>;
export type ComparisonInput = z.input<typeof Comparison>;

export const Author = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  photo: z.string().optional(),
  href: z.string(),
  isPlaceholder: z.boolean().default(false),
});
export type Author = z.infer<typeof Author>;

export const MarketStat = z.object({
  id: z.string(),
  label: z.string(),
  value: z.number(),
  unit: z.enum(["prozent", "eur", "anzahl"]),
  year: z.number().int(),
  source: Source,
  note: z.string().optional(),
});
export type MarketStat = z.infer<typeof MarketStat>;

export const GUIDE_TOPICS = [
  "Recht & Pflichten",
  "Datenschutz & Sicherheit",
  "Auswahl & Einführung",
  "Kosten & Verträge",
] as const;
export const GuideTopic = z.enum(GUIDE_TOPICS);
export type GuideTopic = z.infer<typeof GuideTopic>;

/** Ratgeber (§11.13). The body lives in src/content/ratgeber/{slug}.mdx. */
export const Guide = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().max(110),
  /** Meta description and card teaser. */
  description: z.string().min(80).max(170),
  /** Answers the search question in one or two sentences (§13.6). */
  lead: z.string().max(320),
  topic: GuideTopic,
  /** Hero illustration from the image prompts file (B-21 to B-40). */
  imageId: z.string().regex(/^B-\d{2}$/),
  relatedCategories: z.array(CategorySlug).default([]),
  keyTakeaways: z.array(z.string()).min(3).max(5),
  sources: z
    .array(
      z.object({
        name: z.string(),
        title: z.string(),
        url: z.url(),
        publishedAt: IsoDate.optional(),
        accessedAt: IsoDate,
      }),
    )
    .min(1),
  authorId: z.string(),
  editorId: z.string(),
  publishedAt: IsoDate,
  updatedAt: IsoDate,
});
export type Guide = z.infer<typeof Guide>;
export type GuideInput = z.input<typeof Guide>;
