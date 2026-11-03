import type { Route } from "next";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { liveCategorySlugs } from "@/data";
import { searchIndex } from "@/lib/search-index";
import { Container } from "./container";
import { DesktopNav } from "./desktop-nav";
import { HeaderShell } from "./header-shell";
import { MobileNav } from "./mobile-nav";
import { SearchDialog } from "./search-dialog";

// Full-width, straight-edged, sticky header (§10.10). Never a floating pill.
export function Header() {
  const live: string[] = [...liveCategorySlugs];
  return (
    <HeaderShell>
      <Container className="flex h-16 items-center gap-6 lg:h-[72px]">
        <div className="flex shrink-0 items-center">
          <Logo />
        </div>

        {/* Logo left, navigation centred, search and CTA right. */}
        <DesktopNav className="mx-auto hidden lg:flex" liveSlugs={live} />

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <SearchDialog index={searchIndex()} />
          <ButtonLink
            href={"/software-finder" as Route}
            size="sm"
            className="hidden md:inline-flex"
          >
            Software-Finder
          </ButtonLink>
          <MobileNav className="lg:hidden" liveSlugs={live} />
        </div>
      </Container>
    </HeaderShell>
  );
}
