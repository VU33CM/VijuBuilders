
(function () {
  "use strict";

  const config = window.VIJU_CONFIG || {};
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ----------------------------------
     MOBILE NAVIGATION
  ---------------------------------- */

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  function closeMenu() {
    if (!menuButton || !nav) return;

    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      const open = nav.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  /* ----------------------------------
     LOAD CONFIGURED PROJECT IMAGES
  ---------------------------------- */

  document.querySelectorAll("[data-photo]").forEach(function (img) {
    const key = img.getAttribute("data-photo");

    if (config.images && config.images[key]) {
      img.src = config.images[key];
    }
  });

  /* ----------------------------------
     CONTACT INFORMATION
  ---------------------------------- */

  const phone = (config.phone || "").replace(/\D/g, "");
  const email = config.email || "";

  const phoneLink = document.getElementById("phone-link");
  const emailLink = document.getElementById("email-link");

  if (phone && phoneLink) {
    phoneLink.textContent = config.phone;
    phoneLink.href = "tel:+" + phone;
  }

  if (email && emailLink) {
    emailLink.textContent = email;
    emailLink.href = "mailto:" + email;
  }

  const address = document.getElementById("address-text");

  if (address && config.address) {
    address.textContent = config.address;
  }

  const whatsappURL = phone
    ? "https://wa.me/" + phone +
      "?text=" + encodeURIComponent(
        config.whatsappMessage || "Hello Viju Builders."
      )
    : "#contact";

  ["whatsapp-button", "floating-whatsapp"].forEach(function (id) {
    const element = document.getElementById(id);

    if (element) element.href = whatsappURL;
  });

  /* ----------------------------------
     CURRENT YEAR
  ---------------------------------- */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* ----------------------------------
     HEADER SCROLL EFFECT
  ---------------------------------- */

  const header = document.querySelector(".site-header");

  function updateHeader() {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 40
    );
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();

  /* ----------------------------------
     SCROLL REVEAL ANIMATIONS
  ---------------------------------- */

  const revealElements = [
    ".section-kicker",
    ".intro-grid",
    ".stats-row",
    ".section-heading",
    ".service-list",
    ".project-card",
    ".approach-content",
    ".contact-grid",
    ".careers-grid"
  ];

  revealElements.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (element) {
      element.classList.add("reveal");
    });
  });

  document.querySelectorAll(".project-grid").forEach(function (grid) {
    grid.classList.add("reveal-stagger");
  });

  if (!reduceMotion && "IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px"
      }
    );

    document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-stagger"
    ).forEach(function (element) {
      revealObserver.observe(element);
    });

  } else {
    document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-stagger"
    ).forEach(function (element) {
      element.classList.add("visible");
    });
  }

  /* ----------------------------------
     ACTIVE NAVIGATION INDICATOR
  ---------------------------------- */

  const navLinks = document.querySelectorAll(
    '.nav a[href^="#"]:not(.nav-cta)'
  );

  const sections = Array.from(navLinks)
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          navLinks.forEach(function (link) {
            const active =
              link.getAttribute("href") ===
              "#" + entry.target.id;

            link.classList.toggle("active", active);
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ----------------------------------
     HERO PARALLAX — DESKTOP ONLY
  ---------------------------------- */

  const heroImage = document.querySelector(".hero-image");

  const desktop = window.matchMedia("(min-width: 801px)");

  if (
    heroImage &&
    !reduceMotion &&
    desktop.matches
  ) {
    let ticking = false;

    window.addEventListener("scroll", function () {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(function () {
        const hero = document.querySelector(".hero");

        if (hero) {
          const bounds = hero.getBoundingClientRect();

          if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
            const movement = Math.max(
              -35,
              Math.min(35, bounds.top * -0.045)
            );

            heroImage.style.backgroundPosition =
              "center calc(55% + " + movement + "px)";
          }
        }

        ticking = false;
      });
    }, { passive: true });
  }

})();
