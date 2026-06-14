# KosDeal 🏠

Platform jual-beli barang bekas kos (second hand) berbasis website. Dibuat khusus untuk anak kos yang ingin jual atau cari barang berkualitas dengan harga pas di kantong.

## Fitur

- **Jelajahi Barang** — Cari barang berdasarkan kategori, lokasi, dan harga
- **Chat Internal** — Ngobrol langsung dengan penjual tanpa pindah WhatsApp
- **Komunitas Daerah** — Group chat per kota (Surabaya, Jakarta, Bandung, Bali, Tangerang, dll)
- **Profil User** — Pilih role: Mahasiswa / Pekerja / Pemilik Kos
- **Verifikasi Mahasiswa** — Upload atau scan KTM untuk verifikasi
- **Smart Pricing** — Rekomendasi harga pintar berdasarkan kategori & kondisi
- **Sistem Escrow** — Dana pembeli diamankan sampai barang diterima
- **Geolokasi** — Hitung jarak pembeli-penjual
- **Filter & Sort** — Berdasarkan kategori, lokasi, harga, jarak, rating

## Teknologi

- HTML5, CSS3, JavaScript (Vanilla)
- LocalStorage untuk penyimpanan data
- Font Awesome untuk ikon
- Google Fonts (Inter)
- Unsplash untuk gambar produk

## Cara Menjalankan

```bash
cd kosdeal-website
python3 -m http.server 8000
```

Buka `http://localhost:8000` di browser.

## Halaman

| Halaman | URL |
|---------|-----|
| Beranda | `/index.html` |
| Jelajahi | `/products.html` |
| Komunitas | `/komunitas.html` |
| Pesanan | `/orders.html` |
| Jual Barang | `/add-product.html` |
| Profil | `/profile.html` |
