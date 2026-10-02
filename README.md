# Kurma Group - Company Profile & Career Portal

![Kurma Group](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Repositori *monorepo* resmi untuk Website Company Profile dan Portal Karier **Kurma Group**. Sistem ini terbagi menjadi dua bagian utama:
1. **Frontend (SPA)**: Dibangun menggunakan React, Vite, dan TailwindCSS dengan animasi memukau dari Framer Motion.
2. **Backend (API & CMS)**: Dibangun menggunakan Laravel, Filament V3, dan PostgreSQL untuk mengelola konten dan pelamar kerja secara elegan.

---

##  Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Data Fetching**: TanStack React Query

### Backend
- **Framework**: Laravel 10/11
- **Admin Panel**: Filament V3
- **Database**: PostgreSQL 15
- **Server**: Nginx + PHP-FPM 8.2

---

## Panduan Instalasi Lokal (Development)

Jika Anda ingin menjalankan atau memodifikasi kode di komputer lokal Anda:

### 1. Menjalankan Frontend
Pastikan Anda sudah menginstal **Node.js**.
```bash
cd frontend
npm install

# Menjalankan server lokal (biasanya di http://localhost:5173)
npm run dev
```

### 2. Menjalankan Backend
Pastikan Anda memiliki **PHP 8.2+** dan **Composer**.
```bash
cd backend
composer install

# Salin konfigurasi environment
cp .env.example .env

# Buat Application Key
php artisan key:generate

# Migrasi Database (Pastikan koneksi DB di .env sudah disesuaikan)
php artisan migrate

# Buat akun Admin Filament
php artisan make:filament-user

# Jalankan server lokal
php artisan serve
```

---

##  Panduan Deployment (Production di VPS)

Sistem ini didesain untuk berjalan secara stabil di VPS menggunakan **Docker** dan diamankan di balik **Cloudflare Tunnels**.

### Langkah 1: Persiapan VPS
Pastikan VPS Anda sudah terpasang:
- Git
- Docker & Docker Compose
- Cloudflared (Tunnels)

### Langkah 2: Kloning & Jalankan Docker
```bash
git clone https://github.com/hillmydyan/Company-profile-kurma-group.git
cd Company-profile-kurma-group

# Rakit dan nyalakan semua layanan (Frontend, Backend, Database)
docker compose up -d --build
```

### Langkah 3: Eksekusi Setup Pertama Kali di VPS
Karena aplikasi berjalan di dalam kontainer, perintah instalasi Laravel harus dijalankan dari dalam kontainer `backend_app`.
```bash
# Lakukan migrasi database untuk pertama kalinya
docker compose exec backend_app php artisan migrate:fresh

# Buat akun admin untuk masuk ke dasbor
docker compose exec backend_app php artisan make:filament-user

# Perbaiki hak akses (permissions) folder
docker compose exec backend_app chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
docker compose exec backend_app chmod -R 775 /var/www/storage
```

---

##  Konfigurasi Cloudflare Tunnels (Zero Trust)

Sistem ini mengekspos dua _port_ melalui Docker, yang harus dirutekan menggunakan Cloudflare Tunnels:

1. **Frontend (Website Utama)**
   - Port: `4321`
   - Rutekan ke domain utama: `kurmagroup.com`
2. **Backend (Dasbor Admin & API)**
   - Port: `8082`
   - Rutekan ke subdomain: `admin.kurmagroup.com`

---

## 🔧 Catatan Penting & Troubleshooting

1. **Mengubah / Memperbarui Kode di VPS**
   Jika Anda melakukan perubahan kode di GitHub (seperti mengubah *Frontend* atau kode PHP), jalankan perintah berikut di VPS untuk menerapkan perubahannya:
   ```bash
   git pull
   docker compose up -d --build
   ```

2. **Error 500 saat Upload Gambar / Buka Web**
   Ini hampir selalu masalah hak akses folder penyimpanan (Storage). Jalankan:
   ```bash
   docker compose exec backend_app chown -R www-data:www-data /var/www/storage
   ```

3. **Gagal Login (403 Forbidden)**
   Filament V3 secara otomatis memblokir akses di *Production* demi keamanan. Hal ini sudah diatasi dengan mengimplementasikan antarmuka `FilamentUser` pada model `App\Models\User`.

4. **Frontend Tidak Menampilkan Data Pekerjaan (CORS Error)**
   Pastikan di file `frontend/.env`, alamat API mengarah ke URL *Production*:
   ```env
   VITE_API_URL=https://admin.kurmagroup.com/api
   ```

---
*Didesain dan dikembangkan dengan ❤️ untuk Kurma Group.*
