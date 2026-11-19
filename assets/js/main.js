
/*
  VIJU BUILDERS
  Main Website JavaScript
*/

(function () {
  "use strict";

  const config = window.VIJU_CONFIG || {};
  const body = document.body;

  /* --------------------------------
     1. MOBILE NAVIGATION
  -------------------------------- */

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      body.classList.toggle("menu-open", isOpen);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        body.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (event) {
      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        nav.classList.remove("open");
        body.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }


  /* --------------------------------
     2. LOAD CONFIGURED IMAGES
  -------------------------------- */

  document.querySelectorAll("[data-photo]").forEach(function (image) {
    const key = image.getAttribute("data-photo");

    if (config.images && config.images[key]) {
      image.src = config.images[key];
    }
  });


  /* --------------------------------
     3. COMPANY LOGO
  -------------------------------- */

  if (config.logo) {
    document.querySelectorAll("[data-logo]").forEach(function (logo) {
      logo.src = config.logo;
    });
  }


  /* --------------------------------
     4. CONTACT DETAILS
  -------------------------------- */

  const phone = (config.phone || "").replace(/\D/g, "");
  const internationalPhone =
    (config.phoneInternational || "").replace(/\D/g, "");

  const whatsappPhone =
    (config.whatsappPhone || internationalPhone).replace(/\D/g, "");

  const email = config.email || "";

  // Telephone links
  document.querySelectorAll(
    "#phone-link, [data-phone-link]"
  ).forEach(function (link) {
    if (phone) {
      link.textContent = config.phone;
      link.href = "tel:+" + internationalPhone;
    }
  });

  // Email links
  document.querySelectorAll(
    "#email-link, [data-email-link]"
  ).forEach(function (link) {
    if (email) {
      link.textContent = email;
      link.href = "mailto:" + email;
    }
  });

  // Business address
  document.querySelectorAll(
    "#address-text, [data-address]"
  ).forEach(function (element) {
    if (config.address) {
      element.textContent = config.address;
    }
  });

  // GST registration
  document.querySelectorAll(
    "#gst-number, [data-gst]"
  ).forEach(function (element) {
    if (config.gst) {
      element.textContent = config.gst;
    }
  });


  /* --------------------------------
     5. WHATSAPP INTEGRATION
  -------------------------------- */

  const whatsappMessage = encodeURIComponent(
    config.whatsappMessage || "Hello Viju Builders."
  );

  const whatsappURL = whatsappPhone
    ? "https://wa.me/" + whatsappPhone + "?text=" + whatsappMessage
    : "#contact";

  document.querySelectorAll(
    "#whatsapp-button, #floating-whatsapp, [data-whatsapp]"
  ).forEach(function (button) {
    button.href = whatsappURL;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
  });


  /* --------------------------------
     6. FOOTER YEAR
  -------------------------------- */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* --------------------------------
     7. HEADER SCROLL EFFECT
  -------------------------------- */

  const header = document.querySelector(".header");

  function updateHeader() {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 30);
  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* --------------------------------
     8. SCROLL REVEAL ANIMATIONS
  -------------------------------- */

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-up, .reveal-left, .reveal-right, [data-reveal]"
  );

  if ("IntersectionObserver" in window) {
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
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }


  /* --------------------------------
     9. SMOOTH SCROLLING
  -------------------------------- */

  document.querySelectorAll('a[href*="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      let target;

      try {
        const url = new URL(href, window.location.href);

        if (
          url.pathname !== window.location.pathname ||
          url.origin !== window.location.origin
        ) {
          return;
        }

        target = document.querySelector(url.hash);
      } catch (error) {
        return;
      }

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
      });

      if (history.replaceState) {
        history.replaceState(null, "", href);
      }
    });
  });


  /* --------------------------------
     10. ACTIVE NAVIGATION
  -------------------------------- */

  const sections = document.querySelectorAll(
    "main section[id], section[id]"
  );

  const navLinks = document.querySelectorAll(
    ".nav a[href*='#']"
  );

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          const currentId = entry.target.id;

          navLinks.forEach(function (link) {
            const href = link.getAttribute("href");

            link.classList.toggle(
              "active",
              href === "#" + currentId ||
              href.endsWith("#" + currentId)
            );
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }


  /* --------------------------------
     11. IMAGE LOADING EFFECT
  -------------------------------- */

  document.querySelectorAll("img").forEach(function (image) {
    image.addEventListener("load", function () {
      image.classList.add("image-loaded");
    });

    if (image.complete && image.naturalWidth > 0) {
      image.classList.add("image-loaded");
    }
  });


  /* --------------------------------
     12. CURRENT YEAR AND PAGE READY
  -------------------------------- */

  window.addEventListener("load", function () {
    body.classList.add("page-loaded");
  });

})();
