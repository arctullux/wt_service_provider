document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const navOverlay = document.getElementById("navOverlay");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");


  function toggleMenu(open) {
    const shouldOpen = open !== undefined ? open : !hamburgerBtn.classList.contains("is-active");

    hamburgerBtn.classList.toggle("is-active", shouldOpen);
    mobileDrawer.classList.toggle("is-active", shouldOpen);
    navOverlay.classList.toggle("is-active", shouldOpen);


    hamburgerBtn.setAttribute("aria-expanded", shouldOpen);
    mobileDrawer.setAttribute("aria-hidden", !shouldOpen);
    document.body.style.overflow = shouldOpen ? "hidden" : "";
  }


  hamburgerBtn.addEventListener("click", () => toggleMenu());


  navOverlay.addEventListener("click", () => toggleMenu(false));


  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });


  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && hamburgerBtn.classList.contains("is-active")) {
      toggleMenu(false);
    }
  });


  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && hamburgerBtn.classList.contains("is-active")) {
      toggleMenu(false);
    }
  });
});
