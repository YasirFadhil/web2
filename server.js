const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdn.tailwindcss.com",
          "https://cdnjs.cloudflare.com",
        ],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
        fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
      },
    },
  }),
);
app.use(cors());
app.use(compression());
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Health quiz data storage (in production, use a database)
let quizResults = [];
let quizData = {
  questions: [
    {
      id: 1,
      question: "Berapa gelas air yang disarankan untuk diminum setiap hari?",
      options: ["4-5 gelas", "6-7 gelas", "8-10 gelas", "12-15 gelas"],
      correct: 2,
      explanation:
        "Disarankan minum 8-10 gelas air per hari untuk menjaga hidrasi tubuh yang optimal.",
    },
    {
      id: 2,
      question:
        "Olahraga ringan sebaiknya dilakukan berapa kali dalam seminggu?",
      options: ["1-2 kali", "3-4 kali", "5-6 kali", "Setiap hari"],
      correct: 1,
      explanation:
        "Olahraga ringan seperti jalan kaki sebaiknya dilakukan 3-4 kali seminggu untuk kesehatan optimal.",
    },
    {
      id: 3,
      question: "Jam tidur yang ideal untuk orang dewasa adalah?",
      options: ["5-6 jam", "7-9 jam", "10-12 jam", "4-5 jam"],
      correct: 1,
      explanation:
        "Orang dewasa membutuhkan 7-9 jam tidur setiap malam untuk kesehatan yang optimal.",
    },
    {
      id: 4,
      question: "Makanan yang baik untuk kesehatan jantung adalah?",
      options: [
        "Makanan berlemak tinggi",
        "Makanan tinggi gula",
        "Ikan, kacang-kacangan, dan sayuran",
        "Makanan olahan",
      ],
      correct: 2,
      explanation:
        "Ikan, kacang-kacangan, dan sayuran kaya akan nutrisi yang baik untuk kesehatan jantung.",
    },
    {
      id: 5,
      question: "Frekuensi mencuci tangan yang disarankan adalah?",
      options: [
        "Hanya saat kotor",
        "2-3 kali sehari",
        "Sebelum makan dan setelah aktivitas",
        "Sekali sehari",
      ],
      correct: 2,
      explanation:
        "Mencuci tangan sebaiknya dilakukan sebelum makan, setelah menggunakan toilet, dan setelah aktivitas untuk mencegah penyakit.",
    },
  ],
};

// API Routes

// Get quiz questions
app.get("/api/quiz/questions", (req, res) => {
  try {
    // Send questions without correct answers for security
    const questions = quizData.questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
    }));

    res.json({
      success: true,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data quiz",
      error: error.message,
    });
  }
});

// Submit quiz answers
app.post("/api/quiz/submit", (req, res) => {
  try {
    const { answers, userInfo } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Data jawaban tidak valid",
      });
    }

    let score = 0;
    let totalQuestions = quizData.questions.length;
    let results = [];

    // Calculate score and prepare results
    quizData.questions.forEach((question) => {
      const userAnswer = answers.find((a) => a.questionId === question.id);
      const isCorrect =
        userAnswer && userAnswer.selectedOption === question.correct;

      if (isCorrect) {
        score++;
      }

      results.push({
        questionId: question.id,
        question: question.question,
        userAnswer: userAnswer ? userAnswer.selectedOption : null,
        correctAnswer: question.correct,
        isCorrect: isCorrect,
        explanation: question.explanation,
      });
    });

    const percentage = Math.round((score / totalQuestions) * 100);

    // Save result
    const result = {
      id: Date.now(),
      userInfo: userInfo || {},
      score: score,
      totalQuestions: totalQuestions,
      percentage: percentage,
      results: results,
      timestamp: new Date(),
    };

    quizResults.push(result);

    // Determine health status based on score
    let healthStatus = "";
    let recommendations = [];

    if (percentage >= 80) {
      healthStatus = "Sangat Baik";
      recommendations = [
        "Pertahankan gaya hidup sehat Anda",
        "Tetap rutin berolahraga",
        "Jaga pola makan seimbang",
      ];
    } else if (percentage >= 60) {
      healthStatus = "Baik";
      recommendations = [
        "Tingkatkan pengetahuan kesehatan",
        "Perbanyak konsumsi air putih",
        "Rutin check-up kesehatan",
      ];
    } else if (percentage >= 40) {
      healthStatus = "Cukup";
      recommendations = [
        "Pelajari lebih lanjut tentang gaya hidup sehat",
        "Konsultasi dengan ahli kesehatan",
        "Mulai olahraga ringan secara rutin",
      ];
    } else {
      healthStatus = "Perlu Perbaikan";
      recommendations = [
        "Segera konsultasi dengan dokter",
        "Ubah gaya hidup menjadi lebih sehat",
        "Ikuti program kesehatan yang terstruktur",
      ];
    }

    res.json({
      success: true,
      data: {
        score: score,
        totalQuestions: totalQuestions,
        percentage: percentage,
        healthStatus: healthStatus,
        recommendations: recommendations,
        results: results,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal memproses quiz",
      error: error.message,
    });
  }
});

// Get quiz statistics
app.get("/api/quiz/stats", (req, res) => {
  try {
    if (quizResults.length === 0) {
      return res.json({
        success: true,
        data: {
          totalAttempts: 0,
          averageScore: 0,
          highestScore: 0,
          lowestScore: 0,
        },
      });
    }

    const scores = quizResults.map((result) => result.percentage);
    const averageScore = Math.round(
      scores.reduce((a, b) => a + b, 0) / scores.length,
    );
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);

    res.json({
      success: true,
      data: {
        totalAttempts: quizResults.length,
        averageScore: averageScore,
        highestScore: highestScore,
        lowestScore: lowestScore,
        recentResults: quizResults.slice(-5).reverse(), // Last 5 results
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil statistik",
      error: error.message,
    });
  }
});

// Health tips API
app.get("/api/health/tips", (req, res) => {
  try {
    const healthTips = [
      {
        category: "Nutrisi",
        tips: [
          "Konsumsi buah dan sayuran minimal 5 porsi sehari",
          "Pilih karbohidrat kompleks seperti nasi merah",
          "Batasi konsumsi gula dan garam",
          "Minum air putih minimal 8 gelas sehari",
        ],
      },
      {
        category: "Olahraga",
        tips: [
          "Lakukan olahraga ringan 30 menit setiap hari",
          "Naik tangga daripada menggunakan lift",
          "Jalan kaki minimal 10.000 langkah per hari",
          "Lakukan pemanasan sebelum olahraga",
        ],
      },
      {
        category: "Tidur",
        tips: [
          "Tidur 7-9 jam setiap malam",
          "Hindari gadget 1 jam sebelum tidur",
          "Ciptakan lingkungan tidur yang nyaman",
          "Jaga jadwal tidur yang konsisten",
        ],
      },
      {
        category: "Mental",
        tips: [
          "Luangkan waktu untuk relaksasi",
          "Praktikkan meditasi atau yoga",
          "Jaga hubungan sosial yang positif",
          "Kelola stress dengan baik",
        ],
      },
    ];

    res.json({
      success: true,
      data: healthTips,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil tips kesehatan",
      error: error.message,
    });
  }
});

// Health calculator API (BMI)
app.post("/api/health/bmi", (req, res) => {
  try {
    const { weight, height } = req.body;

    if (!weight || !height || weight <= 0 || height <= 0) {
      return res.status(400).json({
        success: false,
        message: "Berat badan dan tinggi badan harus diisi dengan benar",
      });
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmi * 100) / 100;

    let category = "";
    let recommendation = "";

    if (roundedBMI < 18.5) {
      category = "Kekurangan berat badan";
      recommendation =
        "Konsultasi dengan ahli gizi untuk menambah berat badan dengan sehat";
    } else if (roundedBMI < 25) {
      category = "Berat badan normal";
      recommendation =
        "Pertahankan berat badan dengan pola makan sehat dan olahraga teratur";
    } else if (roundedBMI < 30) {
      category = "Kelebihan berat badan";
      recommendation =
        "Kurangi berat badan dengan diet seimbang dan olahraga rutin";
    } else {
      category = "Obesitas";
      recommendation =
        "Segera konsultasi dengan dokter untuk program penurunan berat badan";
    }

    res.json({
      success: true,
      data: {
        bmi: roundedBMI,
        category: category,
        recommendation: recommendation,
        weight: weight,
        height: height,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal menghitung BMI",
      error: error.message,
    });
  }
});

// Serve main routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/quiz", (req, res) => {
  res.sendFile(path.join(__dirname, "quiz-kesehatan.html"));
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running properly",
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});

// 404 handler
app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "index.html"));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Server Error:", error);
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan server",
    error:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Internal Server Error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 Server berjalan pada port ${PORT}
📱 Local: http://localhost:${PORT}
🌐 Network: http://0.0.0.0:${PORT}
🏥 Health Quiz API tersedia di /api/quiz
📊 Health Tips API tersedia di /api/health/tips
🧮 BMI Calculator API tersedia di /api/health/bmi
    `);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

module.exports = app;
