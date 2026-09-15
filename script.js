document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const menuButton = document.getElementById("menu-icon");
    const menuButtonIcon = menuButton ? menuButton.querySelector("i") : null;
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section");
    const year = document.getElementById("year");

    const themeToggle = document.getElementById("theme-toggle");
    const themeToggleIcon = themeToggle ? themeToggle.querySelector("i") : null;

    const smokeCursor = document.querySelector(".smoke-cursor");

    // Footer year
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Dark / light mode
    function setTheme(theme) {
        const isLightMode = theme === "light";

        document.body.classList.toggle("light-mode", isLightMode);

        if (themeToggle && themeToggleIcon) {
            themeToggleIcon.classList.toggle("fa-sun", !isLightMode);
            themeToggleIcon.classList.toggle("fa-moon", isLightMode);

            themeToggle.setAttribute(
                "aria-label",
                isLightMode ? "Switch to dark mode" : "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                isLightMode ? "Switch to dark mode" : "Switch to light mode"
            );
        }

        localStorage.setItem("portfolio-theme", theme);
    }

    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const nextTheme = document.body.classList.contains("light-mode")
                ? "dark"
                : "light";

            setTheme(nextTheme);
        });
    }

    // Mobile menu
    function closeMobileMenu() {
        if (!navLinks || !menuButton || !menuButtonIcon) {
            return;
        }

        navLinks.classList.remove("active");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");

        menuButtonIcon.classList.remove("fa-xmark");
        menuButtonIcon.classList.add("fa-bars-staggered");
    }

    if (menuButton && navLinks && menuButtonIcon) {
        menuButton.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuButton.setAttribute("aria-expanded", String(isOpen));

            menuButtonIcon.classList.toggle("fa-bars-staggered", !isOpen);
            menuButtonIcon.classList.toggle("fa-xmark", isOpen);

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        navItems.forEach((navItem) => {
            navItem.addEventListener("click", closeMobileMenu);
        });
    }

    // Header scroll appearance
    function updateHeaderStyle() {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 40);
        }
    }

    // Active navigation section
    function updateActiveNavigation() {
        let activeSection = "";

        sections.forEach((section) => {
            const top = section.offsetTop - 170;
            const bottom = top + section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < bottom) {
                activeSection = section.id;
            }
        });

        navItems.forEach((navItem) => {
            navItem.classList.toggle(
                "active",
                navItem.getAttribute("href") === `#${activeSection}`
            );
        });
    }

    // Smoky mouse pointer effect
    const hasMousePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (smokeCursor && hasMousePointer) {
        let lastParticleTime = 0;
        let lastX = 0;
        let lastY = 0;

        function createSmoke(x, y, speed) {
            const particle = document.createElement("span");
            const size = Math.min(66, Math.max(30, 30 + speed * 0.55));

            particle.className = "smoke-particle";

            particle.style.left = `${x + (Math.random() - 0.5) * 20}px`;
            particle.style.top = `${y + (Math.random() - 0.5) * 20}px`;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            particle.style.setProperty(
                "--smoke-drift-x",
                `${(Math.random() - 0.5) * 90}px`
            );

            document.body.appendChild(particle);

            particle.addEventListener("animationend", () => {
                particle.remove();
            });
        }

        function createSpark(x, y) {
            const spark = document.createElement("span");

            spark.className = "smoke-spark";
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;

            spark.style.setProperty(
                "--spark-x",
                `${(Math.random() - 0.5) * 55}px`
            );

            spark.style.setProperty(
                "--spark-y",
                `${(Math.random() - 0.5) * 55}px`
            );

            document.body.appendChild(spark);

            spark.addEventListener("animationend", () => {
                spark.remove();
            });
        }

        window.addEventListener("mousemove", (event) => {
            const x = event.clientX;
            const y = event.clientY;

            smokeCursor.style.left = `${x}px`;
            smokeCursor.style.top = `${y}px`;
            smokeCursor.style.opacity = "1";

            const movementSpeed = Math.hypot(x - lastX, y - lastY);
            const currentTime = performance.now();

            if (currentTime - lastParticleTime > 24) {
                createSmoke(x, y, movementSpeed);

                if (movementSpeed > 6) {
                    createSmoke(x - 8, y - 8, movementSpeed);
                }

                if (Math.random() > 0.35) {
                    createSpark(x, y);
                }

                lastParticleTime = currentTime;
            }

            lastX = x;
            lastY = y;
        });

        document.addEventListener("mouseleave", () => {
            smokeCursor.style.opacity = "0";
        });

        document.addEventListener("mouseenter", () => {
            smokeCursor.style.opacity = "1";
        });
    }

    // Reset mobile menu on wider screens
    window.addEventListener("resize", () => {
        if (
            window.innerWidth > 800 &&
            navLinks &&
            navLinks.classList.contains("active")
        ) {
            closeMobileMenu();
        }
    });

    window.addEventListener("scroll", () => {
        updateHeaderStyle();
        updateActiveNavigation();
    });

    updateHeaderStyle();
    updateActiveNavigation();
});
