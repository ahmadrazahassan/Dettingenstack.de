import type { Author } from "@/lib/schema";

// The editorial team of Dettingen e.V. signs as an organisation; named people can be added later (§2.20).
export const authors: Author[] = [
  {
    id: "redaktion",
    name: "Dettingenstack-Redaktion",
    role: "Redaktion",
    bio: "Die Dettingenstack-Redaktion recherchiert Preise, Funktionen und Datenschutzangaben von Business-Software für den deutschen Markt.",
    href: "/redaktion",
    isPlaceholder: false,
  },
];
