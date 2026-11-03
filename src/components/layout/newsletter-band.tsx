import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SiteImage } from "@/components/ui/site-image";
import { Container } from "./container";

// The single big yellow moment per page (§10.10). Spot C-05 uses no yellow (it sits on yellow).
export function NewsletterBand() {
  return (
    <section
      aria-labelledby="newsletter-titel"
      className="bg-brand py-16 lg:py-20"
    >
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="type-eyebrow mb-3 text-black">Newsletter</p>
          <h2 id="newsletter-titel" className="type-h2">
            Einmal im Monat: neue Tests, Preisänderungen, ehrliche Empfehlungen.
          </h2>
          <div className="mt-8 max-w-xl">
            <NewsletterForm tone="band" />
          </div>
        </div>
        <div className="hidden justify-end lg:col-span-5 lg:flex">
          <SiteImage id="C-05" sizes="224px" className="w-56" />
        </div>
      </Container>
    </section>
  );
}
