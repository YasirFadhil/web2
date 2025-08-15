// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", function () {
  // Get all anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// Close mobile menu when clicking on a link
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuLinks = document.querySelectorAll(".dropdown-content a");
  const dropdownToggle = document.querySelector('.dropdown [role="button"]');

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Close the dropdown by removing focus
      if (dropdownToggle) {
        dropdownToggle.blur();
        document.activeElement.blur();
      }
    });
  });
});

// Highlight active menu item based on scroll position
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("[id]");
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

  let current = "";
  const navbarHeight = document.querySelector(".navbar").offsetHeight;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - navbarHeight - 50;
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

// Navbar animation on page load
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  navbar.style.transform = "translateY(-100%)";
  navbar.style.transition = "transform 0.5s ease-out";

  setTimeout(() => {
    navbar.style.transform = "translateY(0)";
  }, 100);
});

// Add ripple effect to buttons
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn");

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
});
