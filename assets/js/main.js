
/* =========================================================
   VIJU BUILDERS
   GLOBAL WEBSITE INTERACTIONS
========================================================= */

(function () {
  "use strict";

  /* =======================================================
     01. CONFIGURATION & COMPANY DETAILS
  ======================================================= */

  const config = window.VIJU_CONFIG || {};

  const COMPANY = {
    phone: config.phone || "8078233805",
    email: config.email || "vijubuilders@gmail.com",

    address:
      config.address ||
      "ARCADIA COMPLEX, PALAPARAMBU, VADAPURAM, Kerala - 676542, India",

    gst:
      config.gst ||
      "32CQYPV2870F1Z8",

    whatsappMessage:
      config.whatsappMessage ||
      "Hello Viju Builders, I would like to discuss a construction project."
  };

  const digits = COMPANY.phone.replace(/\D/g, "");

  // Add India's country code when a 10-digit number is supplied.
  const internationalNumber =
    digits.length === 10 ? "91" + digits : digits;

  const telephoneNumber =
    digits.length === 10 ? "+91" + digits : "+" + digits;

  const whatsappURL = internationalNumber
    ? "https://wa.me/" +
      internationalNumber +
      "?text=" +
      encodeURIComponent(COMPANY.whatsappMessage)
    : "#contact";


  /* =======================================================
     02. MOBILE NAVIGATION
  ======================================================= */

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  function closeMenu() {
    if (!menuButton || !nav) return;

    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  if (menuButton && nav) {

    menuButton.addEventListener("click", function () {

      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
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

      if (event.key === "Escape") {
        closeMenu();
      }

    });

    window.addEventListener("resize", function () {

      if (window.innerWidth > 760) {
        closeMenu();
      }

    });

  }


  /* =======================================================
     03. HEADER SCROLL EFFECT
  ======================================================= */

  const header = document.querySelector(".header");

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 25) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     04. ACTIVE NAVIGATION
  ======================================================= */

  const currentPath = window.location.pathname;
  const currentPage =
    currentPath.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll(".nav a");

  navLinks.forEach(function (link) {

    const rawHref = link.getAttribute("href");

    if (!rawHref) return;

    let linkURL;

    try {
      linkURL = new URL(rawHref, window.location.href);
    } catch (error) {
      return;
    }

    const linkPage =
      linkURL.pathname.split("/").pop() || "index.html";

    const isSamePage = linkPage === currentPage;

    if (!isSamePage) return;

    // For links pointing to a section, let the section
    // navigation determine the active state.
    if (linkURL.hash) return;

    link.classList.add("active");

  });


  /* =======================================================
     05. IMAGE CONFIGURATION
  ======================================================= */

  document.querySelectorAll("[data-photo]").forEach(function (img) {

    const key = img.getAttribute("data-photo");

    if (
      config.images &&
      config.images[key]
    ) {
      img.src = config.images[key];
    }

  });


  /* =======================================================
     06. CONTACT DETAILS
  ======================================================= */

  // Telephone

  const phoneLink = document.getElementById("phone-link");

  if (phoneLink && internationalNumber) {

    phoneLink.textContent = COMPANY.phone;

    phoneLink.href = "tel:" + telephoneNumber;

  }


  // Email

  const emailLink = document.getElementById("email-link");

  if (emailLink && COMPANY.email) {

    emailLink.textContent = COMPANY.email;

    emailLink.href = "mailto:" + COMPANY.email;

  }


  // Address

  const addressElement =
    document.getElementById("address-text");

  if (addressElement) {
    addressElement.textContent = COMPANY.address;
  }


  // GST Registration

  const gstElement =
    document.getElementById("gst-text");

  if (gstElement) {
    gstElement.textContent = COMPANY.gst;
  }


  /* =======================================================
     07. WHATSAPP LINKS
  ======================================================= */

  const whatsappElements = document.querySelectorAll(
    "#whatsapp-button, #floating-whatsapp, .whatsapp-link"
  );

  whatsappElements.forEach(function (element) {

    element.href = whatsappURL;

    element.target = "_blank";

    element.rel = "noopener noreferrer";

    element.setAttribute(
      "aria-label",
      "Contact Viju Builders on WhatsApp"
    );

  });


  /* =======================================================
     08. SCROLL REVEAL ANIMATIONS
  ======================================================= */

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  if (prefersReducedMotion || !("IntersectionObserver" in window)) {

    revealElements.forEach(function (element) {

      element.style.opacity = "1";
      element.style.transform = "none";

    });

  } else {

    revealElements.forEach(function (element) {

      element.style.opacity = "0";

      if (element.classList.contains("reveal-left")) {

        element.style.transform = "translate3d(-28px, 0, 0)";

      } else if (element.classList.contains("reveal-right")) {

        element.style.transform = "translate3d(28px, 0, 0)";

      } else {

        element.style.transform = "translate3d(0, 22px, 0)";

      }

    });


    const revealObserver = new IntersectionObserver(

      function (entries, observer) {

        entries.forEach(function (entry) {

          if (!entry.isIntersecting) return;

          entry.target.style.opacity = "1";
          entry.target.style.transform = "translate3d(0, 0, 0)";

          observer.unobserve(entry.target);

        });

      },

      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px"
      }

    );


    revealElements.forEach(function (element) {

      revealObserver.observe(element);

    });

  }


  /* =======================================================
     09. SMOOTH INTERNAL NAVIGATION
  ======================================================= */

  document.querySelectorAll('a[href*="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const rawHref = link.getAttribute("href");

      if (!rawHref) return;

      let destination;

      try {
        destination = new URL(rawHref, window.location.href);
      } catch (error) {
        return;
      }

      // Only handle links pointing to the current page.
      if (
        destination.pathname !== window.location.pathname ||
        !destination.hash
      ) {
        return;
      }

      const target = document.querySelector(destination.hash);

      if (!target) return;

      event.preventDefault();

      closeMenu();

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });

      history.replaceState(null, "", destination.hash);

    });

  });


  /* =======================================================
     10. CURRENT YEAR
  ======================================================= */

  const yearElements = document.querySelectorAll("#year");

  yearElements.forEach(function (element) {

    element.textContent = new Date().getFullYear();

  });


  /* =======================================================
     11. EXTERNAL LINKS
  ======================================================= */

  document.querySelectorAll('a[target="_blank"]').forEach(
    function (link) {

      link.rel = "noopener noreferrer";

    }
  );


  /* =======================================================
     12. PAGE READY
  ======================================================= */

  document.documentElement.classList.add("js-ready");

})();
