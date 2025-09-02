# 🏥 HealthyLife - Website Kesehatan Interaktif

Website kesehatan yang komprehensif dengan fitur quiz interaktif, kalkulator BMI, tips kesehatan, dan informasi kesehatan yang lengkap. Dibangun dengan teknologi modern untuk memberikan pengalaman pengguna yang optimal dalam mengelola kesehatan.

## 🌟 Fitur Utama

### 🧠 Quiz Kesehatan Interaktif
- **Quiz Komprehensif**: 5+ pertanyaan tentang gaya hidup sehat
- **Penilaian Otomatis**: Sistem scoring dengan feedback instant
- **Rekomendasi Personal**: Saran kesehatan berdasarkan hasil quiz
- **Tracking Hasil**: Simpan dan bandingkan hasil quiz sebelumnya
- **Analisis Mendalam**: Penjelasan untuk setiap jawaban

### 🧮 Kalkulator BMI (Body Mass Index)
- **Perhitungan Akurat**: Input tinggi dan berat badan untuk BMI
- **Kategori Kesehatan**: Klasifikasi berdasarkan standar WHO
- **Rekomendasi Khusus**: Saran diet dan olahraga sesuai BMI
- **Visual Indicator**: Grafik dan indikator visual yang mudah dipahami

### 💡 Tips Kesehatan
- **4 Kategori Utama**: Nutrisi, Olahraga, Tidur, dan Kesehatan Mental
- **Tips Praktis**: Saran yang mudah diterapkan dalam kehidupan sehari-hari
- **Update Berkala**: Konten tips yang selalu diperbarui
- **Evidence-Based**: Berdasarkan penelitian kesehatan terkini

### 🩺 Layanan Kesehatan
- **Konsultasi Online**: Hubungi tenaga medis profesional
- **Jadwal Pemeriksaan**: Booking appointment dengan mudah
- **Riwayat Kesehatan**: Tracking kondisi kesehatan pribadi
- **Emergency Contact**: Akses cepat ke layanan darurat

## 🎯 Target Pengguna

- **Individu**: Yang peduli dengan kesehatan pribadi
- **Keluarga**: Untuk monitoring kesehatan keluarga
- **Pekerja**: Yang membutuhkan tips kesehatan di tempat kerja
- **Lansia**: Dengan interface yang mudah digunakan
- **Remaja**: Edukasi kesehatan sejak dini

## 💻 Teknologi yang Digunakan

### Frontend
- **HTML5**: Struktur semantic modern
- **CSS3**: Styling responsive dengan Flexbox/Grid
- **JavaScript ES6+**: Interaktivitas dan manipulasi DOM
- **Responsive Design**: Optimal di semua perangkat
- **Progressive Web App**: Installable dan offline-capable

### Backend
- **Node.js**: Runtime JavaScript yang efisien
- **Express.js**: Web framework yang cepat dan minimal
- **RESTful API**: Arsitektur API yang terstruktur
- **JSON Storage**: Data management ringan untuk development

### Security & Performance
- **Helmet.js**: Security headers dan protection
- **CORS**: Cross-Origin Resource Sharing support
- **Compression**: Gzip compression untuk performa optimal
- **Rate Limiting**: Proteksi dari spam dan abuse
- **Input Validation**: Validasi data yang ketat

## 🚀 Cara Menjalankan

### Prerequisites
```bash
# Pastikan Node.js terinstall (v14+ recommended)
node --version
npm --version
```

### Instalasi
```bash
# Clone atau download project
cd web2

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Atau production mode
npm start
```

### Akses Website
- **Local**: http://localhost:3000
- **Quiz**: http://localhost:3000/quiz
- **API Documentation**: http://localhost:3000/api/health

## 📱 Fitur Mobile-Friendly

### Responsive Design
- **Breakpoints**: Tablet (768px), Mobile (480px)
- **Touch Optimized**: Button dan form yang mudah disentuh
- **Fast Loading**: Optimized untuk koneksi mobile
- **Offline Support**: Caching untuk penggunaan offline

### Progressive Web App (PWA)
- **Install to Home Screen**: Seperti aplikasi native
- **Service Worker**: Caching dan offline functionality
- **Push Notifications**: Pengingat kesehatan (coming soon)
- **App-like Experience**: Navigation dan UI seperti mobile app

## 🔧 API Endpoints

### Quiz API
```bash
GET /api/quiz/questions       # Ambil daftar pertanyaan
POST /api/quiz/submit         # Submit jawaban quiz
GET /api/quiz/stats          # Statistik quiz
```

### Health API
```bash
GET /api/health/tips         # Tips kesehatan
POST /api/health/bmi         # Kalkulator BMI
GET /api/health             # Health check server
```

### Contoh Response
```json
{
  "success": true,
  "data": {
    "score": 4,
    "totalQuestions": 5,
    "percentage": 80,
    "healthStatus": "Sangat Baik",
    "recommendations": [
      "Pertahankan gaya hidup sehat Anda"
    ]
  }
}
```

## 🎨 Design System

### Color Palette
- **Primary**: #3B82F6 (Blue) - Medical trust
- **Secondary**: #10B981 (Green) - Health vitality
- **Accent**: #F59E0B (Amber) - Warning/attention
- **Neutral**: #6B7280 (Gray) - Text and borders
- **Background**: #F9FAFB (Light Gray) - Clean interface

### Typography
- **Headings**: Inter, sans-serif (Modern, readable)
- **Body Text**: System fonts untuk performa optimal
- **Code**: Monospace untuk data teknis

### Components
- **Buttons**: Rounded corners dengan hover effects
- **Cards**: Shadow dan border radius untuk depth
- **Forms**: Clean input dengan validation feedback
- **Navigation**: Sticky header dengan smooth scroll

## 📊 Fitur Analytics

### User Tracking
- **Quiz Completion Rate**: Berapa persen user menyelesaikan quiz
- **Popular Tips**: Kategori tips yang paling sering diakses
- **BMI Distribution**: Statistik BMI user (anonymous)
- **Device Analytics**: Desktop vs mobile usage

### Health Insights
- **Trend Analysis**: Pattern kesehatan dari quiz results
- **Recommendation Effectiveness**: Seberapa berguna tips yang diberikan
- **User Engagement**: Frequency of website visits
- **Content Performance**: Konten mana yang paling berguna

## 🔐 Keamanan & Privacy

### Data Protection
- **No Personal Data Storage**: Hanya data quiz temporary
- **HTTPS Enforcement**: Enkripsi semua komunikasi
- **Input Sanitization**: Proteksi dari XSS dan injection
- **GDPR Compliant**: Compliance dengan regulasi data

### Security Headers
- **Content Security Policy**: Proteksi dari malicious scripts
- **X-Frame-Options**: Proteksi dari clickjacking
- **X-XSS-Protection**: Built-in XSS protection
- **Strict-Transport-Security**: Force HTTPS

## 🚀 Roadmap Pengembangan

### Phase 1 (Current) ✅
- [x] Basic website dengan responsive design
- [x] Quiz kesehatan interaktif
- [x] Kalkulator BMI
- [x] Tips kesehatan statis

### Phase 2 (Q2 2024) 🔄
- [ ] User registration dan login
- [ ] Personal health dashboard
- [ ] Advanced quiz dengan kategori
- [ ] Health goal tracking

### Phase 3 (Q3 2024) 📅
- [ ] Integration dengan wearable devices
- [ ] Social features (share hasil quiz)
- [ ] Push notifications
- [ ] Chatbot untuk konsultasi basic

### Phase 4 (Q4 2024) 🎯
- [ ] Machine learning untuk rekomendasi personal
- [ ] Telemedicine integration
- [ ] Marketplace untuk produk kesehatan
- [ ] Mobile app (React Native)

## 🤝 Contributing

### Cara Berkontribusi
1. **Fork** repository ini
2. **Clone** ke local machine
3. **Create branch** untuk feature baru
4. **Commit** perubahan dengan pesan yang jelas
5. **Push** ke branch
6. **Create Pull Request**

### Development Guidelines
- Follow coding standards (ESLint, Prettier)
- Write tests untuk feature baru
- Update documentation untuk API changes
- Test responsive design di berbagai device

### Issues & Bug Reports
- Gunakan template issue yang disediakan
- Include screenshots untuk UI bugs
- Provide step-by-step reproduction
- Label dengan kategori yang sesuai

## 📈 Performance Metrics

### Loading Speed
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.0s
- **Cumulative Layout Shift**: < 0.1

### Accessibility
- **WCAG 2.1 AA Compliance**: Full compliance
- **Keyboard Navigation**: Complete keyboard support
- **Screen Reader**: ARIA labels dan semantic HTML
- **Color Contrast**: Minimum 4.5:1 ratio

## 📞 Kontak & Support

### Tim Pengembang
- **Email**: support@healthylife.com
- **Website**: https://healthylife.com
- **GitHub**: https://github.com/healthylife/web2

### Community
- **Discord**: Join komunitas pengguna
- **Forum**: Diskusi dan sharing pengalaman
- **Newsletter**: Update fitur dan tips kesehatan
- **Social Media**: @HealthyLifeApp

## 📄 License

Project ini menggunakan **MIT License** - lihat file [LICENSE](LICENSE) untuk detail lengkap.

```
MIT License

Copyright (c) 2024 HealthyLife

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

- **Healthcare Professionals**: Yang memberikan review untuk akurasi konten
- **UI/UX Designers**: Untuk design system dan user experience
- **Beta Testers**: Komunitas yang membantu testing
- **Open Source Libraries**: Semua package dan library yang digunakan

---

**🎉 Selamat datang di HealthyLife - Your Journey to Better Health Starts Here!**

*"Kesehatan adalah kekayaan yang sesungguhnya. Mari bersama-sama membangun gaya hidup yang lebih sehat."*

---

**Last Updated**: December 2024  
**Version**: 2.0.0  
**Contributors**: 5+ developers  
**Stars**: ⭐ Star repository ini jika bermanfaat!