import type { Metadata } from "next";
import { CompareProvider } from "@/components/compare/compare-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { TooltipProvider } from "@/components/ui/disclosure";
import { ToastProvider } from "@/components/ui/toast";
import { operator, site } from "@/lib/site";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dettingenstack – Business-Software unabhängig vergleichen",
    template: "%s | Dettingenstack",
  },
  description:
    "Business-Software unabhängig verglichen: echte Preise in Euro, nachvollziehbare Tests und ehrlich benannte Schwächen. Kostenlos für dich.",
  openGraph: { type: "website", locale: "de_DE", siteName: site.name },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#inhalt"
          className="sr-only z-90 rounded-md bg-black px-4 py-3 font-semibold font-ui text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Zum Inhalt springen
        </a>
        <ToastProvider>
          <TooltipProvider>
            <CompareProvider>
              <Header />
              {children}
              <Footer />
            </CompareProvider>
          </TooltipProvider>
        </ToastProvider>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: site.name,
                legalName: operator.legalName,
                url: site.url,
                ...(operator.email ? { email: operator.email } : {}),
                address: {
                  "@type": "PostalAddress",
                  ...(operator.street
                    ? { streetAddress: operator.street }
                    : {}),
                  postalCode: operator.postalCode,
                  addressLocality: operator.city,
                  addressRegion: operator.region,
                  addressCountry: operator.countryCode,
                },
              },
              {
                "@type": "WebSite",
                name: site.name,
                url: site.url,
                inLanguage: "de-DE",
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${site.url}/suche?q={search_term_string}`,
                  },
                  "query-input": "required name=search_term_string",
                },
              },
            ],
          }}
        />
      </body>
    </html>
  );
}
