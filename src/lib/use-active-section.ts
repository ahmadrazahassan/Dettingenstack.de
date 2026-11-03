"use client";

import { useEffect, useState } from "react";

// Scroll-spy: the active section is the last one whose top has passed `offset` px
// (header + sticky tabs). Measured on scroll, so it is correct in both directions.
export function useActiveSection(ids: string[], offset = 160) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return active;
}
