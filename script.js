document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const menuButton = document.getElementById("menu-icon");
    const menuButtonIcon = menuButton ? menuButton.querySelector("i") : null;
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section");
    const year = document.getElementById("year");

    // Insert the current year in the footer.
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

    // Open and close the mobile menu.
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

    // Change header size once the visitor scrolls down.
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

    // Highlight the navigation link for the visible section.
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

    // Reset the mobile menu when screen changes to desktop size.
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
