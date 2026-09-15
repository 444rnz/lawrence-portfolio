document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const menuButton = document.getElementById("menu-icon");
    const menuButtonIcon = menuButton.querySelector("i");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section");
    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");
    const year = document.getElementById("year");

    // Automatically puts the current year in the footer.
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Open or close the navigation menu on mobile devices.
    function closeMobileMenu() {
        navLinks.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");

        menuButtonIcon.classList.remove("fa-xmark");
        menuButtonIcon.classList.add("fa-bars-staggered");
    }

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            const menuIsOpen = navLinks.classList.toggle("active");

            menuButton.setAttribute("aria-expanded", String(menuIsOpen));
            menuButton.setAttribute(
                "aria-label",
                menuIsOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuButtonIcon.classList.toggle("fa-bars-staggered", !menuIsOpen);
            menuButtonIcon.classList.toggle("fa-xmark", menuIsOpen);
        });

        navItems.forEach((navItem) => {
            navItem.addEventListener("click", closeMobileMenu);
        });
    }

    // Adds a compact header style after the visitor scrolls.
    function updateHeaderStyle() {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    // Marks the menu item for the section the visitor is currently viewing.
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

    // Opens an email draft using the visitor's default email app.
    // This does not need a server or paid hosting.
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            const subject = encodeURIComponent(
                `Portfolio message from ${name}`
            );

            const body = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}`
            );

            window.location.href =
                `mailto:labralawrence@gmail.com?subject=${subject}&body=${body}`;

            formMessage.textContent =
                "Your email app should open now. Please send the message from there.";
        });
    }

    // Remove the mobile menu if the window changes to desktop size.
    window.addEventListener("resize", () => {
        if (window.innerWidth > 800 && navLinks.classList.contains("active")) {
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