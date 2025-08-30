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

// Enhanced dropdown management with backdrop
function closeMobileDropdown() {
  const dropdownToggle = document.querySelector('.dropdown [role="button"]');
  const dropdownContent = document.querySelector(".dropdown .dropdown-content");
  const backdrop = document.querySelector(".mobile-menu-backdrop");

  if (dropdownToggle) {
    dropdownToggle.blur();
    document.activeElement.blur();
  }

  // Remove backdrop
  if (backdrop) {
    backdrop.classList.remove("active");
  }

  // Remove focus from dropdown content
  if (dropdownContent) {
    dropdownContent.style.display = "none";
    setTimeout(() => {
      dropdownContent.style.display = "";
    }, 100);
  }
}

// Create backdrop element
function createBackdrop() {
  if (!document.querySelector(".mobile-menu-backdrop")) {
    const backdrop = document.createElement("div");
    backdrop.className = "mobile-menu-backdrop";
    backdrop.addEventListener("click", closeMobileDropdown);
    document.body.appendChild(backdrop);
  }
}

// Show backdrop when mobile menu opens
function showBackdrop() {
  createBackdrop();
  const backdrop = document.querySelector(".mobile-menu-backdrop");
  if (backdrop && window.innerWidth <= 1023) {
    backdrop.classList.add("active");
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

  // Remove backdrop
  const backdrop = document.querySelector(".mobile-menu-backdrop");
  if (backdrop) {
    backdrop.classList.remove("active");
  }
}

// Enhanced mobile menu interactions
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle handler
  const mobileMenuToggle = document.querySelector('.dropdown [role="button"]');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      setTimeout(() => {
        const dropdownContent = document.querySelector(
          ".dropdown .dropdown-content",
        );
        if (
          dropdownContent &&
          getComputedStyle(dropdownContent).display !== "none"
        ) {
          showBackdrop();
        }
      }, 100);
    });
  }

  // Close menu when clicking on menu links
  const menuLinks = document.querySelectorAll('.dropdown-content a[href^="#"]');
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      setTimeout(() => {
        closeMobileDropdown();
      }, 100);
    });
  });

  // Close menu on window resize if it's open
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1023) {
      closeMobileDropdown();
    }
  });

  // Prevent body scroll when mobile menu is open
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const backdrop = document.querySelector(".mobile-menu-backdrop");
        if (backdrop && backdrop.classList.contains("active")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      }
    });
  });

  // Start observing backdrop changes
  createBackdrop();
  const backdrop = document.querySelector(".mobile-menu-backdrop");
  if (backdrop) {
    observer.observe(backdrop, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }
});

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

// Comprehensive Quiz System
class QuizManager {
  constructor() {
    this.questions = [
      {
        question: "Apa yang dimaksud dengan '4 Sehat 5 Sempurna'?",
        options: [
          "Program pemerintah untuk kesehatan",
          "Konsep gizi seimbang dengan 4 komponen makanan + susu",
          "Diet untuk menurunkan berat badan",
          "Olahraga 4 kali seminggu selama 5 menit",
        ],
        correct: 1,
        explanation:
          "4 Sehat 5 Sempurna adalah konsep gizi seimbang yang terdiri dari makanan pokok, lauk pauk, sayur-sayuran, buah-buahan, dan ditambah susu.",
      },
      {
        question:
          "Manakah yang termasuk makanan pokok dalam konsep 4 Sehat 5 Sempurna?",
        options: [
          "Daging ayam dan ikan",
          "Nasi, roti, dan kentang",
          "Bayam dan kangkung",
          "Apel dan jeruk",
        ],
        correct: 1,
        explanation:
          "Makanan pokok adalah sumber karbohidrat utama seperti nasi, roti, kentang, jagung, dan sagu.",
      },
      {
        question: "Fungsi utama lauk pauk dalam tubuh adalah?",
        options: [
          "Memberikan energi utama",
          "Membantu pencernaan",
          "Membangun dan memperbaiki jaringan tubuh",
          "Memberikan vitamin C",
        ],
        correct: 2,
        explanation:
          "Lauk pauk mengandung protein yang berfungsi untuk membangun, memperbaiki, dan memelihara jaringan tubuh.",
      },
      {
        question: "Mengapa sayur-sayuran penting dalam menu harian?",
        options: [
          "Memberikan energi yang besar",
          "Sumber protein hewani",
          "Mengandung vitamin, mineral, dan serat",
          "Mengganti fungsi makanan pokok",
        ],
        correct: 2,
        explanation:
          "Sayur-sayuran kaya akan vitamin, mineral, serat, dan antioksidan yang penting untuk kesehatan tubuh.",
      },
      {
        question:
          "Buah-buahan dalam konsep 4 Sehat 5 Sempurna berperan sebagai?",
        options: [
          "Pengganti makanan pokok",
          "Sumber vitamin dan mineral alami",
          "Sumber protein utama",
          "Pengganti air minum",
        ],
        correct: 1,
        explanation:
          "Buah-buahan adalah sumber vitamin (terutama vitamin C), mineral, serat, dan antioksidan alami.",
      },
      {
        question: "Apa peran susu dalam konsep 5 Sempurna?",
        options: [
          "Mengganti semua makanan lain",
          "Pelengkap yang kaya kalsium dan protein",
          "Hanya untuk anak-anak",
          "Sumber karbohidrat utama",
        ],
        correct: 1,
        explanation:
          "Susu adalah pelengkap yang kaya akan kalsium, protein, dan vitamin untuk pertumbuhan dan kesehatan tulang.",
      },
      {
        question: "Berapa kali sebaiknya kita makan sayur dalam sehari?",
        options: [
          "1 kali saja",
          "Setiap kali makan (2-3 kali)",
          "Hanya saat sakit",
          "Seminggu sekali",
        ],
        correct: 1,
        explanation:
          "Idealnya sayur dikonsumsi setiap kali makan utama (2-3 kali sehari) untuk memenuhi kebutuhan vitamin dan mineral.",
      },
      {
        question: "Contoh lauk pauk nabati yang baik adalah?",
        options: [
          "Daging sapi dan ayam",
          "Tahu, tempe, dan kacang-kacangan",
          "Nasi dan jagung",
          "Wortel dan tomat",
        ],
        correct: 1,
        explanation:
          "Lauk pauk nabati seperti tahu, tempe, dan kacang-kacangan adalah sumber protein nabati yang baik.",
      },
      {
        question:
          "Mengapa penting mengonsumsi makanan beragam sesuai 4 Sehat 5 Sempurna?",
        options: [
          "Supaya kenyang lebih lama",
          "Agar mendapat nutrisi lengkap dan seimbang",
          "Untuk menghemat uang",
          "Karena tradisi nenek moyang",
        ],
        correct: 1,
        explanation:
          "Mengonsumsi makanan beragam memastikan tubuh mendapat semua nutrisi yang diperlukan secara lengkap dan seimbang.",
      },
      {
        question: "Kapan waktu terbaik mengonsumsi buah?",
        options: [
          "Hanya malam hari",
          "Sebelum atau sesudah makan, dan sebagai snack",
          "Hanya saat sarapan",
          "Menggantikan makan malam",
        ],
        correct: 1,
        explanation:
          "Buah dapat dikonsumsi sebelum atau sesudah makan utama, dan sebagai camilan sehat di antara waktu makan.",
      },
    ];

    this.currentQuestion = 0;
    this.score = 0;
    this.userAnswers = [];
    this.startTime = null;
    this.timeLimit = 30; // detik per pertanyaan
    this.timer = null;
    this.streak = 0;
    this.bestStreak = 0;
  }

  startQuiz() {
    this.currentQuestion = 0;
    this.score = 0;
    this.userAnswers = [];
    this.startTime = Date.now();
    this.streak = 0;
    this.bestStreak = 0;

    // Shuffle questions
    this.questions = this.shuffleArray([...this.questions]);

    this.showQuestion();
    this.updateProgress();
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  showQuestion() {
    const question = this.questions[this.currentQuestion];
    const quizContent = document.getElementById("quizContent");

    quizContent.innerHTML = `
      <div class="quiz-header">
        <div class="quiz-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${((this.currentQuestion + 1) / this.questions.length) * 100}%"></div>
          </div>
          <span class="question-counter">Pertanyaan ${this.currentQuestion + 1} dari ${this.questions.length}</span>
        </div>
        <div class="quiz-stats">
          <div class="stat">
            <i class="fas fa-fire"></i>
            <span>Streak: ${this.streak}</span>
          </div>
          <div class="stat">
            <i class="fas fa-clock"></i>
            <span id="timer">00:${this.timeLimit}</span>
          </div>
        </div>
      </div>

      <div class="question-container">
        <h3 class="question-text">${question.question}</h3>

        <div class="options-container">
          ${question.options
            .map(
              (option, index) => `
            <button class="option-btn" onclick="quizManager.selectAnswer(${index})" id="option-${index}">
              <span class="option-label">${String.fromCharCode(65 + index)}</span>
              <span class="option-text">${option}</span>
            </button>
          `,
            )
            .join("")}
        </div>
      </div>

      <div class="quiz-navigation">
        <button class="nav-btn prev-btn" onclick="quizManager.previousQuestion()"
                ${this.currentQuestion === 0 ? "disabled" : ""}>
          <i class="fas fa-chevron-left"></i> Sebelumnya
        </button>

        <button class="nav-btn next-btn" onclick="quizManager.nextQuestion()"
                id="nextBtn" disabled>
          ${this.currentQuestion === this.questions.length - 1 ? "Selesai Quiz" : "Selanjutnya"}
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    `;

    this.startTimer();
  }

  startTimer() {
    let timeLeft = this.timeLimit;
    const timerElement = document.getElementById("timer");

    this.timer = setInterval(() => {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      if (timeLeft <= 10) {
        timerElement.style.color = "#ef4444";
        timerElement.style.animation = "pulse 1s infinite";
      }

      if (timeLeft <= 0) {
        this.selectAnswer(-1); // Auto select wrong answer
      }
    }, 1000);
  }

  selectAnswer(selectedIndex) {
    clearInterval(this.timer);

    const question = this.questions[this.currentQuestion];
    const isCorrect = selectedIndex === question.correct;

    this.userAnswers[this.currentQuestion] = {
      selected: selectedIndex,
      correct: question.correct,
      isCorrect: isCorrect,
      timeSpent:
        this.timeLimit -
        parseInt(document.getElementById("timer").textContent.split(":")[1]),
    };

    if (isCorrect) {
      this.score++;
      this.streak++;
      this.bestStreak = Math.max(this.bestStreak, this.streak);
      // this.showFeedback("Benar!", "success");
    } else {
      this.streak = 0;
      // this.showFeedback("Salah!", "error");
    }

    // Visual feedback pada tombol
    if (selectedIndex >= 0) {
      const selectedBtn = document.getElementById(`option-${selectedIndex}`);
      selectedBtn.classList.add(isCorrect ? "correct" : "incorrect");
    }

    const correctBtn = document.getElementById(`option-${question.correct}`);
    correctBtn.classList.add("correct");

    // Enable next button
    document.getElementById("nextBtn").disabled = false;

    // Disable all option buttons
    document.querySelectorAll(".option-btn").forEach((btn) => {
      btn.disabled = true;
    });
  }

  showFeedback(message, type) {
    const feedback = document.createElement("div");
    feedback.className = `feedback-popup ${type}`;
    feedback.textContent = message;
    document.body.appendChild(feedback);

    setTimeout(() => {
      feedback.remove();
    }, 2000);
  }

  nextQuestion() {
    this.currentQuestion++;

    if (this.currentQuestion >= this.questions.length) {
      this.showResults();
    } else {
      this.showQuestion();
    }
  }

  previousQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.showQuestion();
    }
  }

  showResults() {
    const totalTime = Math.floor((Date.now() - this.startTime) / 1000);
    const avgTime = Math.floor(totalTime / this.questions.length);
    const percentage = Math.floor((this.score / this.questions.length) * 100);

    let level = "NOVICE";
    let levelIcon = "🔰";
    let levelColor = "#6b7280";

    if (percentage >= 90) {
      level = "MASTER";
      levelIcon = "🏆";
      levelColor = "#f59e0b";
    } else if (percentage >= 80) {
      level = "EXPERT";
      levelIcon = "⭐";
      levelColor = "#10b981";
    } else if (percentage >= 70) {
      level = "GOOD";
      levelIcon = "👍";
      levelColor = "#3b82f6";
    } else if (percentage >= 60) {
      level = "FAIR";
      levelIcon = "📚";
      levelColor = "#8b5cf6";
    }

    const quizContent = document.getElementById("quizContent");

    // Show confetti for high scores
    if (percentage >= 80) {
      this.showConfetti();
    }

    quizContent.innerHTML = `
      <div class="results-container">
        <div class="results-header">
          <div class="score-circle">
            <div class="score-number">${percentage}%</div>
            <div class="score-label">Skor Anda</div>
          </div>

          <div class="level-badge" style="background: ${levelColor}">
            <span class="level-icon">${levelIcon}</span>
            <span class="level-text">${level}</span>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">${this.score}/${this.questions.length}</div>
            <div class="stat-label">Benar</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${this.questions.length - this.score}</div>
            <div class="stat-label">Salah</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${Math.floor(totalTime / 60)}:${(totalTime % 60).toString().padStart(2, "0")}</div>
            <div class="stat-label">Total Waktu</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${avgTime}s</div>
            <div class="stat-label">Rata-rata</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${this.bestStreak}</div>
            <div class="stat-label">Streak Terbaik</div>
          </div>
        </div>

        <div class="results-actions">
          <button class="action-btn primary" onclick="quizManager.restartQuiz()">
            <i class="fas fa-redo"></i>
            Coba Lagi
          </button>
          <button class="action-btn secondary" onclick="quizManager.reviewAnswers()">
            <i class="fas fa-eye"></i>
            Review Jawaban
          </button>
          <button class="action-btn secondary" onclick="quizManager.shareResults(${percentage})">
            <i class="fas fa-share"></i>
            Share Hasil
          </button>
          <button class="action-btn danger" onclick="closeQuizModal()">
            <i class="fas fa-times"></i>
            Tutup
          </button>
        </div>

        <div class="motivational-message">
          ${this.getMotivationalMessage(percentage)}
        </div>
      </div>
    `;

    this.animateResults();
  }

  getMotivationalMessage(percentage) {
    if (percentage >= 90) {
      return "🎉 Luar biasa! Anda sangat memahami konsep 4 Sehat 5 Sempurna!";
    } else if (percentage >= 80) {
      return "⭐ Bagus sekali! Pengetahuan gizi Anda sudah sangat baik!";
    } else if (percentage >= 70) {
      return "👍 Baik! Terus tingkatkan pengetahuan gizi Anda!";
    } else if (percentage >= 60) {
      return "📚 Cukup baik! Pelajari lebih lanjut tentang gizi seimbang!";
    } else {
      return "💪 Jangan menyerah! Pelajari lebih lanjut tentang 4 Sehat 5 Sempurna!";
    }
  }

  showConfetti() {
    // Simple confetti effect
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.animationDelay = Math.random() * 2 + "s";
        confetti.style.backgroundColor = [
          "#ff6b6b",
          "#4ecdc4",
          "#45b7d1",
          "#96ceb4",
          "#feca57",
        ][Math.floor(Math.random() * 5)];
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
      }, i * 10);
    }
  }

  animateResults() {
    // Animate score counter
    const scoreElement = document.querySelector(".score-number");
    const targetScore = parseInt(scoreElement.textContent);
    let currentScore = 0;

    const scoreInterval = setInterval(() => {
      currentScore += 2;
      if (currentScore >= targetScore) {
        currentScore = targetScore;
        clearInterval(scoreInterval);
      }
      scoreElement.textContent = currentScore + "%";
    }, 20);
  }

  restartQuiz() {
    this.startQuiz();
  }

  reviewAnswers() {
    const quizContent = document.getElementById("quizContent");

    let reviewHtml = '<div class="review-container"><h3>Review Jawaban</h3>';

    this.questions.forEach((question, index) => {
      const userAnswer = this.userAnswers[index];
      const isCorrect = userAnswer && userAnswer.isCorrect;

      reviewHtml += `
        <div class="review-item ${isCorrect ? "correct" : "incorrect"}">
          <div class="review-question">
            <strong>Q${index + 1}: ${question.question}</strong>
          </div>

          <div class="review-answer">
            <div class="user-answer">
              Jawaban Anda: <span class="${isCorrect ? "correct" : "incorrect"}">
                ${userAnswer.selected >= 0 ? question.options[userAnswer.selected] : "Tidak dijawab"}
              </span>
            </div>

            ${
              !isCorrect
                ? `
              <div class="correct-answer">
                Jawaban Benar: <span class="correct">${question.options[question.correct]}</span>
              </div>
            `
                : ""
            }

            <div class="explanation">
              <strong>Penjelasan:</strong> ${question.explanation}
            </div>
          </div>
        </div>
      `;
    });

    reviewHtml += `
      <div class="review-actions">
        <button class="action-btn primary" onclick="quizManager.showResults()">
          <i class="fas fa-arrow-left"></i> Kembali ke Hasil
        </button>
        <button class="action-btn secondary" onclick="quizManager.restartQuiz()">
          <i class="fas fa-redo"></i> Coba Lagi
        </button>
      </div>
    </div>`;

    quizContent.innerHTML = reviewHtml;
  }

  shareResults(percentage) {
    const shareText = `🧠 Saya baru saja menyelesaikan Quiz 4 Sehat 5 Sempurna!\n\n📊 Skor: ${percentage}%\n✅ Benar: ${this.score}/${this.questions.length}\n🔥 Streak Terbaik: ${this.bestStreak}\n\n${this.getMotivationalMessage(percentage)}\n\nCoba juga quiz nya!`;

    if (navigator.share) {
      navigator.share({
        title: "Hasil Quiz 4 Sehat 5 Sempurna",
        text: shareText,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        this.showFeedback("Hasil copied ke clipboard!", "success");
      });
    }
  }

  updateProgress() {
    // Update any progress indicators if needed
  }
}

// Initialize quiz manager
let quizManager;

function openQuizModal() {
  const modal = document.getElementById("quizModal");
  if (modal) {
    modal.classList.add("modal-open");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Start quiz immediately
    if (!quizManager) {
      quizManager = new QuizManager();
    }
    quizManager.startQuiz();

    console.log("Quiz modal opened and quiz started!");
  }
}

function closeQuizModal() {
  const modal = document.getElementById("quizModal");
  if (modal) {
    modal.classList.remove("modal-open");
    modal.style.display = "none";
    document.body.style.overflow = "";

    // Clear any timers
    if (quizManager && quizManager.timer) {
      clearInterval(quizManager.timer);
    }

    console.log("Quiz modal closed!");
  }
}

// Initialize quiz when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing quiz system...");

  // Main quiz button
  const startQuizBtn = document.getElementById("startQuizBtn");
  if (startQuizBtn) {
    startQuizBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openQuizModal();
    });
  }

  // Navbar quiz button
  const navbarQuizBtn = document.getElementById("navbarQuizBtn");
  if (navbarQuizBtn) {
    navbarQuizBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openQuizModal();
    });
  }

  // Close button
  const closeQuizBtn = document.getElementById("closeQuizBtn");
  if (closeQuizBtn) {
    closeQuizBtn.addEventListener("click", closeQuizModal);
  }

  // Modal backdrop click to close
  const quizModal = document.getElementById("quizModal");
  if (quizModal) {
    quizModal.addEventListener("click", function (e) {
      if (e.target === quizModal) {
        closeQuizModal();
      }
    });
  }

  // Keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    if (document.getElementById("quizModal").style.display === "flex") {
      switch (e.key) {
        case "Escape":
          closeQuizModal();
          break;
        case "1":
        case "2":
        case "3":
        case "4":
          if (quizManager) {
            const optionIndex = parseInt(e.key) - 1;
            const optionBtn = document.getElementById(`option-${optionIndex}`);
            if (optionBtn && !optionBtn.disabled) {
              quizManager.selectAnswer(optionIndex);
            }
          }
          break;
        case "ArrowLeft":
          if (quizManager) quizManager.previousQuestion();
          break;
        case "ArrowRight":
        case "Enter":
          const nextBtn = document.getElementById("nextBtn");
          if (nextBtn && !nextBtn.disabled) {
            quizManager.nextQuestion();
          }
          break;
      }
    }
  });

  console.log("Quiz system initialization complete!");
});
