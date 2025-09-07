// Simple mobile menu toggle - inline to ensure it loads
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  function showMenu() {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("show");

    if (menuIcon) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times");
    }
  }

  function hideMenu() {
    mobileMenu.classList.remove("show");
    mobileMenu.classList.add("hidden");

    if (menuIcon) {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  }

  function isMenuVisible() {
    return mobileMenu.classList.contains("show");
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const menuVisible = isMenuVisible();

      if (menuVisible) {
        hideMenu();
      } else {
        showMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        if (isMenuVisible()) {
          hideMenu();
        }
      }
    });

    // Close menu on window resize to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) {
        mobileMenu.classList.remove("show");
        mobileMenu.classList.add("hidden");
        if (menuIcon) {
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
        }
      }
    });
  }
});
