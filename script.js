// Simple mobile menu toggle - inline to ensure it loads
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (mobileMenu.classList.contains("hidden")) {
        // Show menu
        mobileMenu.classList.remove("hidden");
        if (menuIcon) {
          menuIcon.classList.remove("fa-bars");
          menuIcon.classList.add("fa-times");
        }
      } else {
        // Hide menu
        mobileMenu.classList.add("hidden");
        if (menuIcon) {
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        if (!mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
          if (menuIcon) {
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
          }
        }
      }
    });

    // Close menu on window resize to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        mobileMenu.classList.add("hidden");
        if (menuIcon) {
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
        }
      }
    });
  }
});
