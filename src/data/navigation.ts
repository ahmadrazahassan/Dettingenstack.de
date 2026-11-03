import {
  Boxes,
  Calculator,
  Clock,
  Contact,
  FolderOpen,
  Landmark,
  type LucideIcon,
  Mail,
  ReceiptEuro,
  Scale,
  Signpost,
  SquareKanban,
  Store,
  Tag,
  Users,
} from "lucide-react";

// Phase 0: names, slugs and icons only. Tool counts and prices are derived from data in phase 1.
export type NavCategory = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
};

export const categories: NavCategory[] = [
  {
    slug: "buchhaltungssoftware",
    name: "Buchhaltungssoftware",
    description: "Belege, Buchungen und DATEV-Export",
    icon: Landmark,
  },
  {
    slug: "rechnungsprogramme",
    name: "Rechnungsprogramme",
    description: "Angebote, Rechnungen und E-Rechnung",
    icon: ReceiptEuro,
  },
  {
    slug: "crm-software",
    name: "CRM-Software",
    description: "Kontakte, Vertrieb und Pipeline",
    icon: Contact,
  },
  {
    slug: "hr-software",
    name: "HR-Software",
    description: "Personalakte, Urlaub und Onboarding",
    icon: Users,
  },
  {
    slug: "zeiterfassungssoftware",
    name: "Zeiterfassung",
    description: "Arbeitszeit, Projekte und Schichten",
    icon: Clock,
  },
  {
    slug: "projektmanagement-software",
    name: "Projektmanagement",
    description: "Aufgaben, Boards und Zeitpläne",
    icon: SquareKanban,
  },
  {
    slug: "erp-software",
    name: "ERP & Warenwirtschaft",
    description: "Lager, Einkauf, Verkauf und Produktion",
    icon: Boxes,
  },
  {
    slug: "newsletter-software",
    name: "Newsletter-Software",
    description: "E-Mail-Marketing und Automationen",
    icon: Mail,
  },
  {
    slug: "dokumentenmanagement-software",
    name: "Dokumentenmanagement",
    description: "Archiv, Workflows und GoBD",
    icon: FolderOpen,
  },
  {
    slug: "shopsysteme",
    name: "Shopsysteme",
    description: "Onlineshop, Zahlungen und Versand",
    icon: Store,
  },
];

export type NavLink = {
  href: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
};

export const toolLinks: NavLink[] = [
  {
    href: "/vergleichen",
    label: "Vergleichstool",
    description: "Bis zu vier Tools nebeneinander",
    icon: Scale,
  },
  {
    href: "/kostenrechner",
    label: "Kostenrechner",
    description: "Was die Software dein Team wirklich kostet",
    icon: Calculator,
  },
  {
    href: "/software-finder",
    label: "Software-Finder",
    description: "In zwei Minuten zur Shortlist",
    icon: Signpost,
  },
  {
    href: "/preisindex",
    label: "Preisindex",
    description: "Alle Preisänderungen im Überblick",
    icon: Tag,
  },
];

// Comparisons that exist in src/data/comparisons. Extend as new ones are published.
export const featuredComparisons: NavLink[] = [
  { href: "/vergleich/personio-vs-hr-works", label: "Personio vs. HR WORKS" },
  { href: "/vergleich/personio-vs-kenjo", label: "Personio vs. Kenjo" },
  { href: "/vergleich/kenjo-vs-leapsome", label: "Kenjo vs. Leapsome" },
  {
    href: "/vergleich/lexware-office-vs-sevdesk",
    label: "Lexware Office vs. sevdesk",
  },
];

// Content pages the search can find (only pages that exist).
export const sitePages: NavLink[] = [
  { href: "/vergleich", label: "Alle Vergleiche" },
  { href: "/kategorien", label: "Alle Kategorien" },
  { href: "/ratgeber", label: "Ratgeber" },
  { href: "/methodik", label: "Methodik: So bewerten wir" },
  { href: "/transparenz", label: "Transparenz: So finanzieren wir uns" },
  { href: "/marktdaten", label: "Marktdaten: Digitalisierung in Zahlen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/redaktion", label: "Redaktion" },
  { href: "/fuer-anbieter", label: "Für Software-Anbieter" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/newsletter", label: "Newsletter" },
];

// Category links are filtered to live categories in the footer component.
export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Kategorien",
    links: categories.map((c) => ({ href: `/${c.slug}`, label: c.name })),
  },
  { title: "Beliebte Vergleiche", links: featuredComparisons },
  {
    title: "Tools",
    links: toolLinks.map(({ href, label }) => ({ href, label })),
  },
  {
    title: "Dettingenstack",
    links: [
      { href: "/ueber-uns", label: "Über uns" },
      { href: "/redaktion", label: "Redaktion" },
      { href: "/methodik", label: "Methodik" },
      { href: "/transparenz", label: "Transparenz" },
      { href: "/ratgeber", label: "Ratgeber" },
      { href: "/marktdaten", label: "Marktdaten" },
      { href: "/newsletter", label: "Newsletter" },
      { href: "/fuer-anbieter", label: "Für Anbieter" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/barrierefreiheit", label: "Barrierefreiheit" },
    ],
  },
];
