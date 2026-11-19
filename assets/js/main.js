
/* =========================================================
   VIJU BUILDERS — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     1. HEADER SCROLL EFFECT
  ------------------------------------------------------- */

  const header = document.querySelector(".site-header");

  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 30);
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* -------------------------------------------------------
     2. MOBILE NAVIGATION
  ------------------------------------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  const closeMenu = () => {
    if (!menuToggle || !mainNav) return;

    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("open");
    document.body.classList.remove("menu-open");
  };

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      mainNav.classList.toggle("open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
      const clickedInsideNav = mainNav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideNav && !clickedToggle) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) {
        closeMenu();
      }
    });
  }


  /* -------------------------------------------------------
     3. SCROLL REVEAL ANIMATIONS
  ------------------------------------------------------- */

  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
  );

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });

  }


  /* -------------------------------------------------------
     4. SMOOTH SCROLL FOR SAME-PAGE LINKS
  ------------------------------------------------------- */

  document.querySelectorAll('a[href*="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const url = new URL(link.href, window.location.href);

      const isSamePage =
        url.pathname === window.location.pathname &&
        url.origin === window.location.origin;

      if (!isSamePage || !url.hash) return;

      const target = document.querySelector(
        decodeURIComponent(url.hash)
      );

      if (!target) return;

      event.preventDefault();

      closeMenu();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      history.replaceState(null, "", url.hash);
    });

  });


  /* -------------------------------------------------------
     5. ACTIVE NAVIGATION LINK
  ------------------------------------------------------- */

  const currentPage = window.location.pathname
    .split("/")
    .pop() || "index.html";

  const navLinks = document.querySelectorAll(
    ".main-nav a"
  );

  navLinks.forEach(link => {

    const linkUrl = new URL(link.href, window.location.href);

    const linkPage = linkUrl.pathname
      .split("/")
      .pop() || "index.html";

    const isCurrentPage = linkPage === currentPage;

    const isHomeSectionLink =
      currentPage === "index.html" &&
      linkUrl.hash &&
      linkPage === "index.html";

    if (isCurrentPage && !isHomeSectionLink) {
      link.classList.add("active");
    }

  });


  /* -------------------------------------------------------
     6. PROJECT IMAGE HOVER EFFECT
  ------------------------------------------------------- */

  document.querySelectorAll(".project-card").forEach(card => {

    const image = card.querySelector("img");

    if (!image) return;

    card.addEventListener("mouseenter", () => {
      image.style.transform = "scale(1.05)";
    });

    card.addEventListener("mouseleave", () => {
      image.style.transform = "";
    });

  });


  /* -------------------------------------------------------
     7. CLOSE MOBILE MENU ON PAGE NAVIGATION
  ------------------------------------------------------- */

  window.addEventListener("pageshow", () => {
    closeMenu();
  });


  /* -------------------------------------------------------
     8. FOOTER YEAR
  ------------------------------------------------------- */

  const yearElements = document.querySelectorAll(
    "[data-current-year]"
  );

  yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });


  /* -------------------------------------------------------
     9. ACCESSIBILITY: IMAGE LOADING
  ------------------------------------------------------- */

  document.querySelectorAll("img").forEach(image => {

    if (!image.hasAttribute("decoding")) {
      image.setAttribute("decoding", "async");
    }

  });

});
