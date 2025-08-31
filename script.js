// Simple mobile menu toggle - inline to ensure it loads
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  let isAnimating = false;

  function showMenu() {
    if (isAnimating) {
      console.log("Menu animation in progress, ignoring show request");
      return;
    }
    console.log("Showing menu...");
    isAnimating = true;

    mobileMenu.classList.remove("hidden");
    // Force reflow to ensure hidden class removal is applied
    mobileMenu.offsetHeight;

    setTimeout(() => {
      mobileMenu.classList.add("show");
      isAnimating = false;
      console.log("Menu shown successfully");
    }, 10);

    if (menuIcon) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times");
    }
  }

  function hideMenu() {
    if (isAnimating) {
      console.log("Menu animation in progress, ignoring hide request");
      return;
    }
    console.log("Hiding menu...");
    isAnimating = true;

    mobileMenu.classList.remove("show");

    setTimeout(() => {
      mobileMenu.classList.add("hidden");
      isAnimating = false;
      console.log("Menu hidden successfully");
    }, 400);

    if (menuIcon) {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    }
  }

  function isMenuVisible() {
    return (
      mobileMenu.classList.contains("show") ||
      (!mobileMenu.classList.contains("hidden") &&
        !mobileMenu.classList.contains("show"))
    );
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const menuVisible = isMenuVisible();
      console.log("Menu button clicked. Menu visible:", menuVisible);
      console.log("Current classes:", mobileMenu.className);

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
        isAnimating = false;
      }
    });
  }
});
