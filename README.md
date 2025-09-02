# Web2 Health Quiz Server

Server Node.js untuk aplikasi web quiz kesehatan dengan Express.js dan API lengkap untuk manajemen quiz, tips kesehatan, dan kalkulator BMI.

## 🚀 Fitur Utama

- **Quiz Kesehatan Interaktif**: API lengkap untuk mengelola pertanyaan dan jawaban quiz
- **Kalkulator BMI**: Endpoint untuk menghitung Body Mass Index dengan rekomendasi
- **Tips Kesehatan**: API untuk mendapatkan tips kesehatan berdasarkan kategori
- **Statistik Quiz**: Analisis hasil quiz dan performa pengguna
- **Security Headers**: Implementasi Helmet.js untuk keamanan
- **CORS Support**: Cross-Origin Resource Sharing untuk integrasi frontend
- **Compression**: Gzip compression untuk performa optimal
- **Logging**: Morgan logger untuk monitoring request
- **Error Handling**: Error handling yang komprehensif

## 📋 Prerequisites

Pastikan Anda telah menginstall:

- [Node.js](https://nodejs.org/) (versi 14.x atau lebih tinggi)
- [npm](https://www.npmjs.com/) (biasanya sudah termasuk dengan Node.js)

## 🛠️ Instalasi

1. **Clone atau download project ini**
   ```bash
   cd web2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi environment (opsional)**
   ```bash
   cp .env.example .env
   # Edit file .env sesuai kebutuhan
   ```

## 🚀 Menjalankan Server

### Development Mode
```bash
npm run dev
```
Server akan berjalan di `http://localhost:3000` dengan auto-reload menggunakan nodemon.

### Production Mode
```bash
npm start
```

### Custom Port
```bash
PORT=8080 npm start
```

## 📚 API Endpoints

### 🏥 Health Check
```
GET /api/health
```
Mengecek status server dan uptime.

### 📝 Quiz APIs

#### Get Quiz Questions
```
GET /api/quiz/questions
```
Mengambil semua pertanyaan quiz (tanpa jawaban yang benar).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "question": "Berapa gelas air yang disarankan untuk diminum setiap hari?",
      "options": ["4-5 gelas", "6-7 gelas", "8-10 gelas", "12-15 gelas"]
    }
  ]
}
```

#### Submit Quiz Answers
```
POST /api/quiz/submit
```

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": 1,
      "selectedOption": 2
    }
  ],
  "userInfo": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 4,
    "totalQuestions": 5,
    "percentage": 80,
    "healthStatus": "Sangat Baik",
    "recommendations": ["Pertahankan gaya hidup sehat Anda"],
    "results": [...]
  }
}
```

#### Get Quiz Statistics
```
GET /api/quiz/stats
```
Mengambil statistik quiz seperti rata-rata skor, skor tertinggi, dll.

### 💡 Health Tips API

#### Get Health Tips
```
GET /api/health/tips
```
Mengambil tips kesehatan berdasarkan kategori (Nutrisi, Olahraga, Tidur, Mental).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "category": "Nutrisi",
      "tips": [
        "Konsumsi buah dan sayuran minimal 5 porsi sehari",
        "Pilih karbohidrat kompleks seperti nasi merah"
      ]
    }
  ]
}
```

### 🧮 BMI Calculator API

#### Calculate BMI
```
POST /api/health/bmi
```

**Request Body:**
```json
{
  "weight": 70,
  "height": 175
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "bmi": 22.86,
    "category": "Berat badan normal",
    "recommendation": "Pertahankan berat badan dengan pola makan sehat",
    "weight": 70,
    "height": 175
  }
}
```

## 📁 Struktur Project

```
web2/
├── server.js              # File server utama
├── package.json           # Dependencies dan scripts
├── .env                   # Environment variables
├── README.md             # Dokumentasi ini
├── index.html            # Halaman utama
├── quiz-kesehatan.html   # Halaman quiz
├── script.js             # JavaScript client-side
├── styles.css            # CSS styling
├── assets/               # Asset gambar dan file
├── komponen/             # Komponen tambahan
└── ori/                  # File original/backup
```

## 🔧 Konfigurasi

### Environment Variables

Buat file `.env` untuk konfigurasi:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database (untuk pengembangan selanjutnya)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=health_quiz

# CORS Settings
ALLOWED_ORIGINS=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Security Headers

Server menggunakan Helmet.js dengan konfigurasi CSP untuk keamanan:

- Content Security Policy (CSP)
- CORS protection
- XSS protection
- CSRF protection

## 🎯 Contoh Penggunaan Client-Side

### Fetch Quiz Questions
```javascript
async function getQuizQuestions() {
    try {
        const response = await fetch('/api/quiz/questions');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}
```

### Submit Quiz
```javascript
async function submitQuiz(answers, userInfo) {
    try {
        const response = await fetch('/api/quiz/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers, userInfo })
        });
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error submitting quiz:', error);
    }
}
```

### Calculate BMI
```javascript
async function calculateBMI(weight, height) {
    try {
        const response = await fetch('/api/health/bmi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ weight, height })
        });
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error calculating BMI:', error);
    }
}
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Cari process yang menggunakan port 3000
lsof -i :3000

# Atau gunakan port lain
PORT=8080 npm start
```

### Module Not Found
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules
npm install
```

### CORS Issues
Pastikan frontend Anda berjalan di domain yang sama atau konfigurasi CORS di `.env`.

## 🚀 Deployment

### PM2 (Production)
```bash
npm install -g pm2
pm2 start server.js --name "health-quiz-server"
pm2 startup
pm2 save
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

### Environment Variables untuk Production
```env
NODE_ENV=production
PORT=3000
# Tambahkan konfigurasi database dan security lainnya
```

## 🔮 Pengembangan Selanjutnya

- [ ] Integrasi database (PostgreSQL/MongoDB)
- [ ] Authentication & Authorization (JWT)
- [ ] Rate limiting per user
- [ ] Email notifications
- [ ] File upload untuk profil user
- [ ] Advanced health analytics
- [ ] Real-time notifications
- [ ] Mobile app API support
- [ ] Caching dengan Redis
- [ ] Unit testing dengan Jest

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Project ini menggunakan lisensi ISC - lihat file [LICENSE](LICENSE) untuk detail.

## 👨‍💻 Author

Dibuat dengan ❤️ untuk meningkatkan kesadaran kesehatan masyarakat.

---

**Happy Coding! 🎉**

Jika Anda menemukan bug atau memiliki saran, silakan buat issue di repository ini.