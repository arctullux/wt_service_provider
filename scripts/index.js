document.addEventListener('DOMContentLoaded', () => {
  const BANNER_HEIGHT_COUNTER = document.getElementById("height");
  const BANNER_WIDTH_COUNTER = document.getElementById("width");
  const NAV_ICON = document.querySelector(".nav-icon");
  const NAV_ICON_ANCHOR = document.getElementById("nav-icon-a"); // Changed hyphen to underscore
  const ROOT = document.getElementById("root");
  const SITE_BANNER = document.getElementById("text");

  if (NAV_ICON_ANCHOR) {
    NAV_ICON_ANCHOR.addEventListener('click', (e) => {
      e.preventDefault(); // Prevents page jumping on '#' link
      document.documentElement.classList.toggle('nav-open');
      document.body.classList.toggle('nav-open');
    });
  }
});
