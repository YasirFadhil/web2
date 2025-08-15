// Enhanced navbar scroll effect with better theming
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Enhanced smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", function () {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = 80; // Fixed height for consistency
        const targetPosition = targetElement.offsetTop - navbarHeight - 30;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile dropdown if open
        closeMobileDropdown();

        // Close all other dropdowns
        closeAllDropdowns();
      }
    });
  });
});

// Enhanced dropdown management
function closeMobileDropdown() {
  const dropdownToggle = document.querySelector('.dropdown [role="button"]');
  const dropdownContent = document.querySelector(".dropdown .dropdown-content");

  if (dropdownToggle) {
    dropdownToggle.blur();
    document.activeElement.blur();
  }

  // Remove focus from dropdown content
  if (dropdownContent) {
    dropdownContent.style.display = "none";
    setTimeout(() => {
      dropdownContent.style.display = "";
    }, 100);
  }
}

function closeAllDropdowns() {
  const allDropdowns = document.querySelectorAll(".dropdown-content");
  allDropdowns.forEach((dropdown) => {
    dropdown.style.display = "none";
    setTimeout(() => {
      dropdown.style.display = "";
    }, 100);
  });

  // Remove focus from all dropdown toggles
  const allToggleButtons = document.querySelectorAll(
    '.dropdown [role="button"], .dropdown summary',
  );
  allToggleButtons.forEach((toggle) => {
    toggle.blur();
  });
}

// Fix dropdown positioning on window resize
function fixDropdownPositions() {
  const dropdowns = document.querySelectorAll(".dropdown-content");
  dropdowns.forEach((dropdown) => {
    const parent = dropdown.closest(".dropdown");
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dropdownRect = dropdown.getBoundingClientRect();

    // Reset positioning
    dropdown.style.left = "";
    dropdown.style.right = "";
    dropdown.style.transform = "";

    // Check if dropdown goes beyond viewport
    if (rect.left + dropdownRect.width > window.innerWidth - 20) {
      dropdown.style.right = "0";
      dropdown.style.left = "auto";
    } else {
      dropdown.style.left = "0";
      dropdown.style.right = "auto";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuLinks = document.querySelectorAll(".dropdown-content a");

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      closeMobileDropdown();
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        const dropdownContent = dropdown.querySelector(".dropdown-content");
        if (dropdownContent) {
          dropdownContent.style.display = "none";
          setTimeout(() => {
            dropdownContent.style.display = "";
          }, 100);
        }
      }
    });
  });

  // Fix dropdown positioning on load and resize
  window.addEventListener("resize", fixDropdownPositions);
  setTimeout(fixDropdownPositions, 100);
});

// Enhanced active menu highlighting with smooth transitions
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("[id]");
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

  let current = "";
  const navbarHeight = 80;
  const scrollOffset = 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - navbarHeight - scrollOffset;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
      link.style.background = "rgba(255, 255, 255, 0.15)";
      link.style.transform = "translateY(-1px)";
    } else {
      link.style.background = "";
      link.style.transform = "";
    }
  });
});

// Add loading animation for external links
document.addEventListener("DOMContentLoaded", function () {
  const externalLinks = document.querySelectorAll('a[href^="komponen/"]');

  externalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Add loading state
      this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
      this.style.pointerEvents = "none";

      // Reset after 2 seconds if page doesn't load
      setTimeout(() => {
        this.innerHTML =
          this.getAttribute("data-original-text") ||
          this.innerHTML.replace(/<i[^>]*><\/i>\s*Loading\.\.\./, "");
        this.style.pointerEvents = "auto";
      }, 2000);
    });

    // Store original text
    link.setAttribute("data-original-text", link.innerHTML);
  });
});

// Enhanced navbar entrance animation
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const navItems = navbar.querySelectorAll(".menu a, .btn");

  navbar.style.transform = "translateY(-100%)";
  navbar.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";

  // Animate navbar slide down
  setTimeout(() => {
    navbar.style.transform = "translateY(0)";
  }, 100);

  // Stagger animate nav items
  navItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(-20px)";
    item.style.transition = "all 0.4s ease";

    setTimeout(
      () => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      },
      300 + index * 100,
    );
  });

  // Enhanced dropdown hover effects for desktop
  const dropdownHovers = document.querySelectorAll(".dropdown-hover");
  dropdownHovers.forEach((dropdown) => {
    const content = dropdown.querySelector(".dropdown-content");
    let hoverTimeout;

    dropdown.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);
      if (content) {
        content.style.display = "block";
        fixDropdownPositions();
      }
    });

    dropdown.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(() => {
        if (content) {
          content.style.display = "none";
        }
      }, 100);
    });

    if (content) {
      content.addEventListener("mouseenter", () => {
        clearTimeout(hoverTimeout);
      });

      content.addEventListener("mouseleave", () => {
        hoverTimeout = setTimeout(() => {
          content.style.display = "none";
        }, 100);
      });
    }
  });
});

// Enhanced button interactions and ripple effects
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn");
  const menuItems = document.querySelectorAll(".menu a");

  // Add ripple effect to buttons
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add hover effects to menu items
  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-1px)";
    });

    item.addEventListener("mouseleave", function () {
      if (!this.classList.contains("active")) {
        this.style.transform = "";
      }
    });
  });
});

// Add scroll-based navbar background opacity
let ticking = false;

function updateNavbar() {
  const navbar = document.querySelector(".navbar");
  const scrollTop = window.pageYOffset;
  const opacity = Math.min(scrollTop / 100, 1);

  navbar.style.setProperty("--scroll-opacity", opacity);
  ticking = false;
}

window.addEventListener("scroll", function () {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
});
