/* ==========================================================================
   Rodrigo Rocha — personal site
   Everything here is an enhancement: with the script blocked the page is
   still complete, legible and navigable.
   ========================================================================== */

(() => {
  "use strict";

  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasIO = "IntersectionObserver" in window;

  /* Claim the enhanced styles before anything below can throw. The rule that
     hides content pending a scroll reveal is scoped to .js, so if this file
     is blocked, errors, or simply hasn't run yet, the page still renders
     complete rather than blank. */
  root.classList.add("js");

  /* ---------- Mobile nav ---------- */

  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (nav && navToggle && navLinks) {
    const closeNav = () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  /* ---------- Scroll reveal ----------
     threshold:0 with a bottom inset, deliberately, rather than "N% of the
     element is showing": a fractional threshold is unreachable for anything
     taller than the viewport, and that content would then stay at opacity:0
     forever. Keying off the leading edge crossing the inset works at any
     element height. */

  const ENTER_MARGIN = "0px 0px -12% 0px";

  if (!prefersReducedMotion && hasIO) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: ENTER_MARGIN }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Active nav link ----------
     A band across the middle of the viewport: whichever section is crossing
     it owns the nav. Using a symmetric inset means exactly one section is
     ever active, without tracking scroll position by hand. */

  const linkFor = new Map();
  document.querySelectorAll(".nav-links a[href^='#']").forEach((link) => {
    const section = document.getElementById(link.getAttribute("href").slice(1));
    if (section) linkFor.set(section, link);
  });

  if (linkFor.size && hasIO) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = linkFor.get(entry.target);
          if (link) link.classList.toggle("is-active", entry.isIntersecting);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    linkFor.forEach((_, section) => navObserver.observe(section));
  }

  /* ---------- Footer year ---------- */

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
