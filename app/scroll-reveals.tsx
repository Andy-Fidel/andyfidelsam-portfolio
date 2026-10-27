"use client";

import { useEffect } from "react";

/** Progressive enhancement: the server-rendered page is fully readable without motion. */
export default function ScrollReveals() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

    const enable = () => {
      observer.disconnect();
      for (const element of elements) {
        // Never conceal content above the fold or reached through an anchor link.
        if (preference.matches || element.getBoundingClientRect().top < window.innerHeight) {
          element.setAttribute("data-visible", "true");
        } else {
          element.setAttribute("data-visible", "false");
          observer.observe(element);
        }
      }
    };
    enable();
    preference.addEventListener("change", enable);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", enable);
      for (const element of elements) element.removeAttribute("data-visible");
    };
  }, []);
  return null;
}
