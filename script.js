document.addEventListener("DOMContentLoaded", () => {
    const careerPortfolio = document.getElementById("career-portfolio");
    const fashionPortfolio = document.getElementById("fashion-portfolio");

    const fashionModeButton = document.getElementById("fashion-mode-button");
    const careerModeButton = document.getElementById("career-mode-button");
    const fashionFooterCareerButton = document.getElementById(
        "fashion-footer-career-button"
    );

    const careerHeader = document.querySelector(".career-header");

    const careerMenuButton = document.getElementById("career-menu-button");
    const careerMenuIcon = careerMenuButton
        ? careerMenuButton.querySelector("i")
        : null;

    const careerNavLinks = document.querySelector(".career-nav-links");
    const careerNavItems = document.querySelectorAll(".career-nav-link");
    const careerSections = document.querySelectorAll(
        "#career-portfolio main section"
    );

    const careerThemeButton = document.getElementById("career-theme-button");
    const careerThemeIcon = careerThemeButton
        ? careerThemeButton.querySelector("i")
        : null;

    const fashionNav = document.getElementById("fashion-nav");

    const fashionMenuButton = document.getElementById("fashion-menu-button");
    const fashionMenuIcon = fashionMenuButton
        ? fashionMenuButton.querySelector("i")
        : null;

    const fashionPhotos = document.querySelectorAll(".fashion-photo img");

    const fashionLightbox = document.getElementById("fashion-lightbox");
    const fashionLightboxImage = document.getElementById(
        "fashion-lightbox-image"
    );
    const fashionLightboxClose = document.getElementById(
        "fashion-lightbox-close"
    );

    const smokeCursor = document.querySelector(".smoke-cursor");
    const yearElements = document.querySelectorAll(".current-year");

    // Display the current year in the footers.
    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });

    // Close Career Mode mobile menu.
    function closeCareerMenu() {
        if (!careerNavLinks || !careerMenuButton || !careerMenuIcon) {
            return;
        }

        careerNavLinks.classList.remove("active");
        careerMenuButton.setAttribute("aria-expanded", "false");

        careerMenuIcon.classList.remove("fa-xmark");
        careerMenuIcon.classList.add("fa-bars");
    }

    // Close Fashion Mode mobile menu.
    function closeFashionMenu() {
        if (!fashionNav || !fashionMenuButton || !fashionMenuIcon) {
            return;
        }

        fashionNav.classList.remove("active");
        fashionMenuButton.setAttribute("aria-expanded", "false");

        fashionMenuIcon.classList.remove("fa-xmark");
        fashionMenuIcon.classList.add("fa-bars");
    }

    // Show Fashion Mode.
    function showFashionMode() {
        careerPortfolio.classList.remove("active-view");
        fashionPortfolio.classList.add("active-view");

        closeCareerMenu();
        closeFashionMenu();

        if (smokeCursor) {
            smokeCursor.style.opacity = "0";
        }

        window.scrollTo(0, 0);
    }

    // Show Career Mode.
    function showCareerMode() {
        fashionPortfolio.classList.remove("active-view");
        careerPortfolio.classList.add("active-view");

        closeFashionMenu();
        window.scrollTo(0, 0);
    }

    if (fashionModeButton) {
        fashionModeButton.addEventListener("click", showFashionMode);
    }

    if (careerModeButton) {
        careerModeButton.addEventListener("click", showCareerMode);
    }

    if (fashionFooterCareerButton) {
        fashionFooterCareerButton.addEventListener("click", showCareerMode);
    }

    // Career Mode dark/light theme.
    function setCareerTheme(theme) {
        const isLightMode = theme === "light";

        careerPortfolio.classList.toggle("light-mode", isLightMode);

        if (careerThemeButton && careerThemeIcon) {
            careerThemeIcon.classList.toggle("fa-sun", !isLightMode);
            careerThemeIcon.classList.toggle("fa-moon", isLightMode);

            careerThemeButton.setAttribute(
                "aria-label",
                isLightMode ? "Switch to dark mode" : "Switch to light mode"
            );

            careerThemeButton.setAttribute(
                "title",
                isLightMode ? "Switch to dark mode" : "Switch to light mode"
            );
        }

        localStorage.setItem("career-portfolio-theme", theme);
    }

    setCareerTheme(
        localStorage.getItem("career-portfolio-theme") || "dark"
    );

    if (careerThemeButton) {
        careerThemeButton.addEventListener("click", () => {
            const nextTheme = careerPortfolio.classList.contains("light-mode")
                ? "dark"
                : "light";

            setCareerTheme(nextTheme);
        });
    }

    // Career Mode mobile menu.
    if (careerMenuButton && careerNavLinks && careerMenuIcon) {
        careerMenuButton.addEventListener("click", () => {
            const isOpen = careerNavLinks.classList.toggle("active");

            careerMenuButton.setAttribute("aria-expanded", String(isOpen));

            careerMenuIcon.classList.toggle("fa-bars", !isOpen);
            careerMenuIcon.classList.toggle("fa-xmark", isOpen);
        });

        careerNavItems.forEach((item) => {
            item.addEventListener("click", closeCareerMenu);
        });
    }

    // Fashion Mode mobile menu.
    if (fashionMenuButton && fashionNav && fashionMenuIcon) {
        fashionMenuButton.addEventListener("click", () => {
            const isOpen = fashionNav.classList.toggle("active");

            fashionMenuButton.setAttribute("aria-expanded", String(isOpen));

            fashionMenuIcon.classList.toggle("fa-bars", !isOpen);
            fashionMenuIcon.classList.toggle("fa-xmark", isOpen);
        });

        fashionNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeFashionMenu);
        });
    }

    // Career header scroll effect.
    function updateCareerHeader() {
        if (!careerHeader || !careerPortfolio.classList.contains("active-view")) {
            return;
        }

        careerHeader.classList.toggle("scrolled", window.scrollY > 40);
    }

    // Highlight the current Career Mode navigation link.
    function updateCareerNavigation() {
        if (!careerPortfolio.classList.contains("active-view")) {
            return;
        }

        let activeSection = "";

        careerSections.forEach((section) => {
            const sectionTop = section.offsetTop - 170;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                activeSection = section.id;
            }
        });

        careerNavItems.forEach((item) => {
            item.classList.toggle(
                "active",
                item.getAttribute("href") === `#${activeSection}`
            );
        });
    }

    // Fashion image preview/lightbox.
    function openFashionLightbox(image) {
        if (!fashionLightbox || !fashionLightboxImage) {
            return;
        }

        fashionLightboxImage.src = image.src;
        fashionLightboxImage.alt = image.alt;

        fashionLightbox.classList.add("active");
        fashionLightbox.setAttribute("aria-hidden", "false");
    }

    function closeFashionLightbox() {
        if (!fashionLightbox) {
            return;
        }

        fashionLightbox.classList.remove("active");
        fashionLightbox.setAttribute("aria-hidden", "true");
    }

    fashionPhotos.forEach((image) => {
        image.addEventListener("click", () => {
            openFashionLightbox(image);
        });
    });

    if (fashionLightboxClose) {
        fashionLightboxClose.addEventListener(
            "click",
            closeFashionLightbox
        );
    }

    if (fashionLightbox) {
        fashionLightbox.addEventListener("click", (event) => {
            if (event.target === fashionLightbox) {
                closeFashionLightbox();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeFashionLightbox();
        }
    });

    // Subtle smoke effect in Career Mode only.
    const hasMousePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (smokeCursor && hasMousePointer) {
        let lastSmokeTime = 0;
        let previousX = 0;
        let previousY = 0;

        function createSmoke(x, y, speed) {
            const particle = document.createElement("span");

            const size = Math.min(46, Math.max(22, 22 + speed * 0.35));

            particle.className = "smoke-particle";
            particle.style.left = `${x + (Math.random() - 0.5) * 14}px`;
            particle.style.top = `${y + (Math.random() - 0.5) * 14}px`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            particle.style.setProperty(
                "--drift-x",
                `${(Math.random() - 0.5) * 50}px`
            );

            document.body.appendChild(particle);

            particle.addEventListener("animationend", () => {
                particle.remove();
            });
        }

        window.addEventListener("mousemove", (event) => {
            if (!careerPortfolio.classList.contains("active-view")) {
                smokeCursor.style.opacity = "0";
                return;
            }

            const x = event.clientX;
            const y = event.clientY;

            smokeCursor.style.left = `${x}px`;
            smokeCursor.style.top = `${y}px`;
            smokeCursor.style.opacity = "1";

            const speed = Math.hypot(x - previousX, y - previousY);
            const now = performance.now();

            if (now - lastSmokeTime > 55) {
                createSmoke(x, y, speed);
                lastSmokeTime = now;
            }

            previousX = x;
            previousY = y;
        });

        document.addEventListener("mouseleave", () => {
            smokeCursor.style.opacity = "0";
        });
    }

    window.addEventListener("scroll", () => {
        updateCareerHeader();
        updateCareerNavigation();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 800) {
            closeCareerMenu();
            closeFashionMenu();
        }
    });

    updateCareerHeader();
    updateCareerNavigation();
});
