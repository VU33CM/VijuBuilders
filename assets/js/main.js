
/* =========================================================
   VIJU BUILDERS
   Main Website JavaScript
   File: assets/js/main.js
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       01. CONFIGURATION
    ===================================================== */

    const config = window.VIJU_CONFIG || {};

    const images = config.images || {};


    /* =====================================================
       02. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    function openMenu() {
        if (!menuToggle || !mainNav) return;

        mainNav.classList.add("open");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation");
    }


    function closeMenu() {
        if (!menuToggle || !mainNav) return;

        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Toggle navigation");
    }


    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            const isOpen = mainNav.classList.contains("open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        // Close menu after selecting a navigation link

        mainNav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                closeMenu();
            });

        });


        // Close menu when clicking outside

        document.addEventListener("click", function (event) {

            const clickedInsideNav = mainNav.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideNav && !clickedToggle) {
                closeMenu();
            }

        });


        // Close menu with Escape key

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        });


        // Reset menu when switching to desktop layout

        window.addEventListener("resize", function () {

            if (window.innerWidth > 800) {
                closeMenu();
            }

        });

    }


    /* =====================================================
       03. HEADER SCROLL EFFECT
    ===================================================== */

    const siteHeader = document.querySelector(".site-header");


    function updateHeader() {

        if (!siteHeader) return;

        if (window.scrollY > 30) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }

    }


    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* =====================================================
       04. SCROLL REVEAL ANIMATIONS
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }

        );


        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        // Fallback for browsers without IntersectionObserver

        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });

    }


    /* =====================================================
       05. SMOOTH INTERNAL NAVIGATION
    ===================================================== */

    document.querySelectorAll('a[href*="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const url = new URL(link.href, window.location.href);

            const samePage =
                url.origin === window.location.origin &&
                url.pathname === window.location.pathname;

            if (!samePage || !url.hash || url.hash === "#") {
                return;
            }

            const target = document.querySelector(
                decodeURIComponent(url.hash)
            );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Update the URL without a sudden jump

            history.pushState(null, "", url.hash);

        });

    });


    /* =====================================================
       06. ACTIVE NAVIGATION LINK
    ===================================================== */

    function updateActiveNavigation() {

        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;

        const navLinks = document.querySelectorAll(".main-nav a");


        navLinks.forEach(function (link) {

            const linkUrl = new URL(link.href, window.location.href);

            const linkPath = linkUrl.pathname;
            const linkHash = linkUrl.hash;

            link.classList.remove("active");


            // Homepage section navigation

            if (
                linkPath === currentPath &&
                linkHash &&
                currentHash === linkHash
            ) {
                link.classList.add("active");
                return;
            }


            // Current page navigation

            const isSamePage =
                linkPath === currentPath &&
                !linkHash;

            const isHomePage =
                (currentPath === "/" || currentPath.endsWith("/index.html")) &&
                (linkPath === "/" || linkPath.endsWith("/index.html")) &&
                !linkHash;

            if (isSamePage || isHomePage) {
                link.classList.add("active");
            }

        });

    }


    updateActiveNavigation();


    window.addEventListener("hashchange", updateActiveNavigation);

    window.addEventListener("popstate", updateActiveNavigation);


    /* =====================================================
       07. HOMEPAGE IMAGE CONFIGURATION
    ===================================================== */

    document.querySelectorAll("[data-photo]").forEach(function (element) {

        const photoKey = element.getAttribute("data-photo");

        if (!photoKey) return;


        const imageUrl = images[photoKey];


        if (!imageUrl) {

            console.warn(
                "Viju Builders: Image configuration missing for:",
                photoKey
            );

            return;

        }


        // Support both image elements and background images

        if (element.tagName.toLowerCase() === "img") {

            element.src = imageUrl;
            element.loading = "lazy";
            element.decoding = "async";

        } else {

            element.style.backgroundImage =
                'url("' + imageUrl.replace(/"/g, '\\"') + '")';

        }

    });


    /* =====================================================
       08. IMAGE LOADING OPTIMISATION
    ===================================================== */

    document.querySelectorAll("img").forEach(function (image) {

        if (!image.hasAttribute("loading")) {
            image.loading = "lazy";
        }

        image.decoding = "async";


        image.addEventListener("error", function () {

            console.warn(
                "Viju Builders: Unable to load image:",
                image.src
            );

            image.classList.add("image-load-error");

        });

    });


    /* =====================================================
       09. AUTOMATIC FOOTER YEAR
    ===================================================== */

    const yearElements = document.querySelectorAll(
        "[data-current-year]"
    );


    yearElements.forEach(function (element) {

        element.textContent = new Date().getFullYear();

    });


    /* =====================================================
       10. PROJECT CARD INTERACTIONS
    ===================================================== */

    const projectCards = document.querySelectorAll(".project-card");


    projectCards.forEach(function (card) {

        const image = card.querySelector("img");

        if (!image) return;


        card.addEventListener("mouseenter", function () {
            image.style.transform = "scale(1.04)";
        });


        card.addEventListener("mouseleave", function () {
            image.style.transform = "";
        });

    });


    /* =====================================================
       11. EXTERNAL LINK SECURITY
    ===================================================== */

    document.querySelectorAll('a[target="_blank"]').forEach(function (link) {

        link.setAttribute("rel", "noopener noreferrer");

    });


    /* =====================================================
       12. CURRENT PAGE INITIALISATION
    ===================================================== */

    document.body.classList.add("js-loaded");


    console.log("Viju Builders website initialised successfully.");

});
