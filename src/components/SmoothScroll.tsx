"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SCROLL_OFFSET = -90;

function HashScroll() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    const scrollToHash = (hash: string) => {
      if (!hash || hash.length < 2) return;
      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (el) lenis.scrollTo(el, { offset: SCROLL_OFFSET, duration: 1.4 });
    };

    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToHash(window.location.hash));
    });

    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      cancelAnimationFrame(raf1);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [lenis, pathname]);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        anchors: { offset: SCROLL_OFFSET, duration: 1.4 },
      }}
    >
      <HashScroll />
      {children}
    </ReactLenis>
  );
}
