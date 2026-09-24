"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Route-aware reveal lifecycle.
 * The root layout survives App Router navigation, so new route content
 * must be registered after every pathname change and DOM insertion.
 */
export const ScrollReveal = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      document.documentElement.classList.add("motion-reduced");
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
        node.classList.add("is-visible");
      });
      return;
    }

    document.documentElement.classList.remove("motion-reduced");

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const node = entry.target as HTMLElement;
          node.classList.add("is-visible");
          intersectionObserver.unobserve(node);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );

    const observeNode = (node: HTMLElement) => {
      if (!node.matches("[data-reveal]") || node.classList.contains("is-visible")) return;
      intersectionObserver.observe(node);
    };

    const observeTree = (root: ParentNode) => {
      if (root instanceof HTMLElement) observeNode(root);
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach(observeNode);
    };

    const frame = window.requestAnimationFrame(() => observeTree(document));

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
          if (addedNode instanceof HTMLElement) observeTree(addedNode);
        }
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [pathname]);

  return null;
};
