document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const menuButton = document.getElementById("menu-icon");
    const menuButtonIcon = menuButton ? menuButton.querySelector("i") : null;
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section");
    const year = document.getElementById("year");
    const smokeCursor = document.querySelector(".smoke-cursor");

    // Set current year in footer.
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Close the mobile navigation menu.
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

    // Open and close mobile menu.
    if (menuButton && navLinks && menuButtonIcon) {
        menuButton.addEventListener("click", () => {
            const menuIsOpen = navLinks.classList.toggle("active");

            menuButton.setAttribute("aria-expanded", String(menuIsOpen));

            if (menuIsOpen) {
                menuButton.setAttribute("aria-label", "Close navigation menu");
                menuButtonIcon.classList.remove("fa-bars-staggered");
                menuButtonIcon.classList.add("fa-xmark");
            } else {
                menuButton.setAttribute("aria-label", "Open navigation menu");
                menuButtonIcon.classList.remove("fa-xmark");
                menuButtonIcon.classList.add("fa-bars-staggered");
            }
        });

        navItems.forEach((navItem) => {
            navItem.addEventListener("click", closeMobileMenu);
        });
    }

    // Shrink header slightly after scrolling.
    function updateHeaderStyle() {
        if (!header) {
            return;
        }

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    // Highlight navigation link for visible section.
    function updateActiveNavigation() {
        let activeSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 170;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                activeSection = section.id;
            }
        });

        navItems.forEach((navItem) => {
            navItem.classList.remove("active");

            if (navItem.getAttribute("href") === `#${activeSection}`) {
                navItem.classList.add("active");
            }
        });
    }

    // Smoky gold and silver pointer effect for desktop/laptop mouse users.
    const hasMousePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (smokeCursor && hasMousePointer) {
        let lastSmokeTime = 0;

        window.addEventListener("mousemove", (event) => {
            smokeCursor.style.left = `${event.clientX}px`;
            smokeCursor.style.top = `${event.clientY}px`;
            smokeCursor.style.opacity = "1";

            const currentTime = Date.now();

            // Creates smoke particles without making the website too slow.
            if (currentTime - lastSmokeTime > 45) {
                const smokeParticle = document.createElement("span");

                smokeParticle.className = "smoke-particle";
                smokeParticle.style.left = `${event.clientX}px`;
                smokeParticle.style.top = `${event.clientY}px`;

                const particleSize = Math.random() * 16 + 14;
                smokeParticle.style.width = `${particleSize}px`;
                smokeParticle.style.height = `${particleSize}px`;

                document.body.appendChild(smokeParticle);

                smokeParticle.addEventListener("animationend", () => {
                    smokeParticle.remove();
                });

                lastSmokeTime = currentTime;
            }
        });

        document.addEventListener("mouseleave", () => {
            smokeCursor.style.opacity = "0";
        });
    }

    // Reset the mobile menu if screen becomes desktop size.
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
