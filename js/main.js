/* ========================================================================
   GlowTrap Studio — Main JS
   Mobile menu + scroll reveal animations
   ======================================================================== */

(function () {
  "use strict";

  /* --- Mobile Menu --- */
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const isOpen = menu.classList.contains("open");
      menu.classList.toggle("open");
      toggle.classList.toggle("active");
      toggle.setAttribute("aria-expanded", String(!isOpen));
      document.body.style.overflow = isOpen ? "" : "hidden";
    });

    // Close on link click
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        menu.classList.remove("open");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        toggle.focus();
      }
    });
  }

  /* --- Scroll Reveal --- */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced) {
    // Mark sections for reveal
    var revealTargets = document.querySelectorAll(
      ".section-heading, .intro, .content-card, .image-card, " +
      ".journey-grid, .grid-three, .product-grid, .quote-grid, " +
      ".cta-box, .emotional-hook .narrow, .page-hero, " +
      ".waitlist-section, .content-section, .contact-form"
    );

    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
    });

    // Stagger grids
    document.querySelectorAll(".journey-grid, .grid-three, .product-grid, .quote-grid")
      .forEach(function (el) {
        el.classList.add("reveal-stagger");
        el.classList.remove("reveal");
      });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal, .reveal-stagger").forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Sticky header shadow on scroll --- */
  var header = document.querySelector(".site-header");
  if (header) {
    var scrolled = false;
    window.addEventListener("scroll", function () {
      if (window.scrollY > 10 && !scrolled) {
        header.style.borderBottomColor = "rgba(255,255,255,0.08)";
        scrolled = true;
      } else if (window.scrollY <= 10 && scrolled) {
        header.style.borderBottomColor = "";
        scrolled = false;
      }
    }, { passive: true });
  }
})();
