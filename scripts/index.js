document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const navOverlay = document.getElementById("navOverlay");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  // Helper function to toggle mobile drawer menu state
  function toggleMenu(open) {
    const shouldOpen = open !== undefined ? open : !hamburgerBtn.classList.contains("is-active");

    hamburgerBtn.classList.toggle("is-active", shouldOpen);
    mobileDrawer.classList.toggle("is-active", shouldOpen);
    navOverlay.classList.toggle("is-active", shouldOpen);

    // Update Accessibility Attributes & Body Scroll Lock
    hamburgerBtn.setAttribute("aria-expanded", shouldOpen);
    mobileDrawer.setAttribute("aria-hidden", !shouldOpen);
    document.body.style.overflow = shouldOpen ? "hidden" : "";
  }

  // 1. Toggle mobile menu on hamburger click
  hamburgerBtn.addEventListener("click", () => toggleMenu());

  // 2. Close mobile menu when clicking outside (on overlay)
  navOverlay.addEventListener("click", () => toggleMenu(false));

  // 3. Close mobile menu when clicking any link inside the mobile menu
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  // 4. Close mobile menu on pressing 'Escape' key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && hamburgerBtn.classList.contains("is-active")) {
      toggleMenu(false);
    }
  });

  // 5. Close menu on window resize back to desktop screen size
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && hamburgerBtn.classList.contains("is-active")) {
      toggleMenu(false);
    }
  });

  // 6. Dark / Light Theme Toggle Functionality
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Set initial theme preference
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else if (systemPrefersDark) {
    document.documentElement.setAttribute("data-theme", dark);
  }

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
});
