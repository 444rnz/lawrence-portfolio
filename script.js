document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const menuButton = document.getElementById("menu-icon");
    const menuIcon = menuButton ? menuButton.querySelector("i") : null;
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section");

    const themeButton = document.getElementById("theme-toggle");
    const themeIcon = themeButton ? themeButton.querySelector("i") : null;

    const smokeCursor = document.querySelector(".smoke-cursor");
    const year = document.getElementById("year");

    // Footer year
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Dark and light mode
    function setTheme(theme) {
        const isLightMode = theme === "light";

        document.body.classList.toggle("light-mode", isLightMode);

        if (themeButton && themeIcon) {
            themeIcon.classList.toggle("fa-sun", !isLightMode);
            themeIcon.classList.toggle("fa-moon", isLightMode);

            themeButton.setAttribute(
                "aria-label",
                isLightMode ? "Switch to dark mode" : "Switch to light mode"
            );

            themeButton.setAttribute(
                "title",
                isLightMode ? "Switch to dark mode" : "Switch to light mode"
            );
        }

        localStorage.setItem("portfolio-theme", theme);
    }

    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    setTheme(savedTheme);

    if (themeButton) {
        themeButton.addEventListener("click", () => {
            const nextTheme = document.body.classList.contains("light-mode")
                ? "dark"
                : "light";

            setTheme(nextTheme);
        });
    }

    // Mobile menu
    function closeMenu() {
        if (!navLinks || !menuButton || !menuIcon) {
            return;
        }

        navLinks.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
    }

    if (menuButton && navLinks && menuIcon) {
        menuButton.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");

            menuButton.setAttribute("aria-expanded", String(isOpen));

            menuIcon.classList.toggle("fa-bars", !isOpen);
            menuIcon.classList.toggle("fa-xmark", isOpen);
        });

        navItems.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });
    }

    // Header scroll animation
    function updateHeader() {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 40);
        }
    }

    // Active navigation link
    function updateActiveNavigation() {
        let currentId = "";

        sections.forEach((section) => {
            const top = section.offsetTop - 170;
            const bottom = top + section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < bottom) {
                currentId = section.id;
            }
        });

        navItems.forEach((link) => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${currentId}`
            );
        });
    }

    // Visible smoke cursor effect for desktop/laptop only
    const hasMouse = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (smokeCursor && hasMouse) {
        let lastTime = 0;
        let previousX = 0;
        let previousY = 0;

        function createSmoke(x, y, speed) {
            const particle = document.createElement("span");
            const size = Math.min(68, Math.max(32, 32 + speed * 0.6));

            particle.className = "smoke-particle";
            particle.style.left = `${x + (Math.random() - 0.5) * 20}px`;
            particle.style.top = `${y + (Math.random() - 0.5) * 20}px`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            particle.style.setProperty(
                "--drift-x",
                `${(Math.random() - 0.5) * 95}px`
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
                `${(Math.random() - 0.5) * 58}px`
            );

            spark.style.setProperty(
                "--spark-y",
                `${(Math.random() - 0.5) * 58}px`
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

            const speed = Math.hypot(x - previousX, y - previousY);
            const now = performance.now();

            if (now - lastTime > 24) {
                createSmoke(x, y, speed);

                if (speed > 6) {
                    createSmoke(x - 8, y - 8, speed);
                }

                if (Math.random() > 0.35) {
                    createSpark(x, y);
                }

                lastTime = now;
            }

            previousX = x;
            previousY = y;
        });

        document.addEventListener("mouseleave", () => {
            smokeCursor.style.opacity = "0";
        });
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth > 800) {
            closeMenu();
        }
    });

    window.addEventListener("scroll", () => {
        updateHeader();
        updateActiveNavigation();
    });

    updateHeader();
    updateActiveNavigation();
});
