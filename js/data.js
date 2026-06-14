const sampleProducts = [
    {
        id: 's1',
        name: 'Meja Belajar Lipat',
        category: 'Furniture',
        price: 75000,
        condition: 'Baik',
        location: 'Surabaya',
        campus: 'ITS',
        contact: '08123456789',
        description: 'Meja belajar lipat, masih layak pakai. Cocok untuk kos yang sempit. Sudah dipakai 1 tahun.',
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80',
        date: '2024-01-15',
        lat: -7.2797,
        lng: 112.7953,
        rating: 4.5,
        reviews: [
            { user: 'Budi', text: 'Barang sesuai, recommended!', rating: 5 },
            { user: 'Ani', text: 'Murah meriah', rating: 4 }
        ],
        sellerRating: 4.8,
        terjual: 3
    },
    {
        id: 's2',
        name: 'Kulkas Mini 1 Pintu',
        category: 'Elektronik',
        price: 350000,
        condition: 'Baik',
        location: 'Malang',
        campus: 'UB',
        contact: '08765432198',
        description: 'Kulkas mini Polytron, dingin masih normal. Cocok untuk kos. Alasan jual: pindah kos yang sudah ada kulkas.',
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80',
        date: '2024-01-20',
        lat: -7.9666,
        lng: 112.6326,
        rating: 4.0,
        reviews: [
            { user: 'Citra', text: 'Kulkasnya bagus, dingin', rating: 4 }
        ],
        sellerRating: 4.5,
        terjual: 1
    },
    {
        id: 's3',
        name: 'Kompor Gas Portable',
        category: 'Alat Masak',
        price: 45000,
        condition: 'Seperti Baru',
        location: 'Jember',
        campus: 'UNEJ',
        contact: '08567891234',
        description: 'Kompor gas portable, baru dipakai 2 bulan. Lengkap dengan selang dan regulator.',
        image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&q=80',
        date: '2024-02-01',
        lat: -8.1845,
        lng: 113.6681,
        rating: 5.0,
        reviews: [
            { user: 'Dewi', text: 'Barang baru banget!', rating: 5 },
            { user: 'Eko', text: 'Mantap', rating: 5 }
        ],
        sellerRating: 5.0,
        terjual: 2
    },
    {
        id: 's4',
        name: 'Buku Kalkulus STIKOM',
        category: 'Buku',
        price: 25000,
        condition: 'Baik',
        location: 'Surabaya',
        campus: 'ITS',
        contact: '08901234567',
        description: 'Buku kalkulus untuk mahasiswa STIKOM. Masih bagus, tidak ada yang sobek.',
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80',
        date: '2024-02-05',
        lat: -7.2797,
        lng: 112.7953,
        rating: 4.0,
        reviews: [
            { user: 'Fajar', text: 'Buku lengkap', rating: 4 }
        ],
        sellerRating: 4.2,
        terjual: 5
    },
    {
        id: 's5',
        name: 'Kipas Angin Dinding',
        category: 'Elektronik',
        price: 55000,
        condition: 'Cukup',
        location: 'Surabaya',
        campus: 'UNAIR',
        contact: '08134567890',
        description: 'Kipas angin dinding Maspion, masih berfungsi normal. Agak berisik tapi masih kencang.',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
        date: '2024-02-10',
        lat: -7.2684,
        lng: 112.7628,
        rating: 3.5,
        reviews: [
            { user: 'Gita', text: 'Bunyi berisik tp masi kenceng', rating: 3 }
        ],
        sellerRating: 4.0,
        terjual: 2
    },
    {
        id: 's6',
        name: 'Rak Sepatu 3 Tingkat',
        category: 'Furniture',
        price: 35000,
        condition: 'Baik',
        location: 'Malang',
        campus: 'UM',
        contact: '08234567891',
        description: 'Rak sepatu 3 tingkat, bisa muat 6-9 pasang sepatu. Mudah dibongkar pasang.',
        image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=400&q=80',
        date: '2024-02-15',
        lat: -7.9828,
        lng: 112.6303,
        rating: 4.5,
        reviews: [
            { user: 'Hadi', text: 'Rak nya kokoh', rating: 5 },
            { user: 'Indah', text: 'Pas buat kos', rating: 4 }
        ],
        sellerRating: 4.6,
        terjual: 4
    },
    {
        id: 's7',
        name: 'Panci Set 3 Pcs',
        category: 'Alat Masak',
        price: 40000,
        condition: 'Baik',
        location: 'Jember',
        campus: 'UNEJ',
        contact: '08345678912',
        description: 'Set panci 3 ukuran. Masih bagus, tidak penyok. Alasan jual: jarang masak.',
        image: 'https://images.unsplash.com/photo-1584990347449-a6f0e3e25e5a?w=400&q=80',
        date: '2024-02-20',
        lat: -8.1845,
        lng: 113.6681,
        rating: 4.0,
        reviews: [
            { user: 'Joko', text: 'Panci bagus', rating: 4 }
        ],
        sellerRating: 4.3,
        terjual: 1
    },
    {
        id: 's8',
        name: 'Baju Kemeja Pria Lengan Panjang',
        category: 'Pakaian',
        price: 30000,
        condition: 'Seperti Baru',
        location: 'Surabaya',
        campus: 'ITS',
        contact: '08456789123',
        description: 'Kemeja pria ukuran L, warna putih. Baru dipakai 2 kali. Cocok untuk interview atau kerja.',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
        date: '2024-03-01',
        lat: -7.2797,
        lng: 112.7953,
        rating: 4.8,
        reviews: [
            { user: 'Kiki', text: 'Kemeja mulus, recommended!', rating: 5 },
            { user: 'Lala', text: 'Ukuran pas', rating: 5 }
        ],
        sellerRating: 4.9,
        terjual: 6
    },
    {
        id: 's9',
        name: 'Kasur Lipat Busa',
        category: 'Furniture',
        price: 120000,
        condition: 'Baik',
        location: 'Jakarta',
        campus: 'UI',
        contact: '08111122334',
        description: 'Kasur lipat busa ukuran 120x200 cm. Masih nyaman dipakai. Cocok untuk kosan petak.',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80',
        date: '2024-03-05',
        lat: -6.3605,
        lng: 106.8267,
        rating: 4.2,
        reviews: [
            { user: 'Mega', text: 'Kasurnya empuk', rating: 4 },
            { user: 'Rian', text: 'Sesuai ekspektasi', rating: 4 }
        ],
        sellerRating: 4.5,
        terjual: 4
    },
    {
        id: 's10',
        name: 'Rice Cooker Mini',
        category: 'Alat Masak',
        price: 55000,
        condition: 'Seperti Baru',
        location: 'Jakarta',
        campus: 'BINUS',
        contact: '08112233445',
        description: 'Rice cooker mini 0.6L, cukup untuk 1-2 orang. Baru dipakai 3 bulan. Alasan jual: pindah kos.',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
        date: '2024-03-10',
        lat: -6.2088,
        lng: 106.8456,
        rating: 4.5,
        reviews: [
            { user: 'Sari', text: 'Mungil dan bagus', rating: 5 },
            { user: 'Tono', text: 'Masak nasi enak', rating: 4 }
        ],
        sellerRating: 4.7,
        terjual: 3
    },
    {
        id: 's11',
        name: 'Meja Kerja Minimalis',
        category: 'Furniture',
        price: 85000,
        condition: 'Baik',
        location: 'Jakarta',
        campus: 'Trisakti',
        contact: '08113344556',
        description: 'Meja kerja minimalis ukuran 80x50 cm. Ada rak kecil. Cocok untuk WFH atau belajar.',
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80',
        date: '2024-03-15',
        lat: -6.1702,
        lng: 106.7903,
        rating: 4.0,
        reviews: [
            { user: 'Umar', text: 'Meja kokoh', rating: 4 }
        ],
        sellerRating: 4.3,
        terjual: 2
    },
    {
        id: 's12',
        name: 'Laptop Lenovo ThinkPad',
        category: 'Elektronik',
        price: 2500000,
        condition: 'Baik',
        location: 'Bandung',
        campus: 'ITB',
        contact: '08114455667',
        description: 'Lenovo ThinkPad X260, i5, 8GB RAM, SSD 256GB. Layar 12.5 inch. Cocok untuk coding dan tugas.',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',
        date: '2024-03-20',
        lat: -6.8894,
        lng: 107.6105,
        rating: 4.6,
        reviews: [
            { user: 'Vina', text: 'Laptop mulus, recommended!', rating: 5 },
            { user: 'Wawan', text: 'Cepet banget', rating: 4 }
        ],
        sellerRating: 4.8,
        terjual: 2
    },
    {
        id: 's13',
        name: 'Tas Ransel Eiger',
        category: 'Pakaian',
        price: 65000,
        condition: 'Baik',
        location: 'Bandung',
        campus: 'UNPAD',
        contact: '08115566778',
        description: 'Tas ransel Eiger 40L, warna hitam. Masih bagus, resleting lancar. Cocok untuk kuliah atau traveling.',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
        date: '2024-03-25',
        lat: -6.9217,
        lng: 107.6075,
        rating: 4.3,
        reviews: [
            { user: 'Xena', text: 'Tasnya besar', rating: 4 },
            { user: 'Yoga', text: 'Mantap', rating: 5 }
        ],
        sellerRating: 4.5,
        terjual: 3
    },
    {
        id: 's14',
        name: 'Kipas Angin Portable',
        category: 'Elektronik',
        price: 35000,
        condition: 'Seperti Baru',
        location: 'Bandung',
        campus: 'Telkom',
        contact: '08116677889',
        description: 'Kipas angin portable rechargeable. Baru dipakai 1 bulan. Cocok untuk kos yang panas.',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
        date: '2024-04-01',
        lat: -6.9733,
        lng: 107.6305,
        rating: 4.7,
        reviews: [
            { user: 'Zara', text: 'Kipasnya kenceng', rating: 5 }
        ],
        sellerRating: 4.9,
        terjual: 5
    },
    {
        id: 's15',
        name: 'Sprei Set Single Bed',
        category: 'Pakaian',
        price: 25000,
        condition: 'Baru',
        location: 'Bali',
        campus: 'Udayana',
        contact: '08117788990',
        description: 'Sprei set single bed warna biru navy. Masih baru, belum dipakai. Lengkap dengan sarung bantal.',
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80',
        date: '2024-04-05',
        lat: -8.7936,
        lng: 115.1589,
        rating: 4.8,
        reviews: [
            { user: 'Ayu', text: 'Warnanya cantik', rating: 5 },
            { user: 'Bima', text: 'Bahan adem', rating: 5 }
        ],
        sellerRating: 5.0,
        terjual: 4
    },
    {
        id: 's16',
        name: 'Magic Com Miyako',
        category: 'Alat Masak',
        price: 60000,
        condition: 'Baik',
        location: 'Bali',
        campus: 'ITB STIKOM Bali',
        contact: '08118899001',
        description: 'Magic com Miyako 1L. Masih berfungsi normal. Alasan jual: dapat rice cooker baru dari ibu.',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
        date: '2024-04-10',
        lat: -8.6705,
        lng: 115.2126,
        rating: 4.1,
        reviews: [
            { user: 'Candra', text: 'Masak nasi pulen', rating: 4 }
        ],
        sellerRating: 4.4,
        terjual: 2
    },
    {
        id: 's17',
        name: 'Buku Novel Kumpulan Cerpen',
        category: 'Buku',
        price: 15000,
        condition: 'Baik',
        location: 'Bali',
        campus: 'Udayana',
        contact: '08119900112',
        description: 'Kumpulan cerpen karya penulis lokal. Masih bagus, tidak ada yang sobek. Cocok untuk mengisi waktu luang.',
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80',
        date: '2024-04-15',
        lat: -8.7936,
        lng: 115.1589,
        rating: 4.0,
        reviews: [
            { user: 'Dian', text: 'Ceritanya seru', rating: 4 }
        ],
        sellerRating: 4.2,
        terjual: 3
    },
    {
        id: 's18',
        name: 'Lemari Pakaian 2 Pintu',
        category: 'Furniture',
        price: 150000,
        condition: 'Cukup',
        location: 'Tangerang',
        campus: 'UMN',
        contact: '08121001122',
        description: 'Lemari pakaian 2 pintu ukuran 120x50 cm. Masih layak pakai, ada sedikit gores di bagian samping.',
        image: 'https://images.unsplash.com/photo-1597006335770-25b6a72cb883?w=400&q=80',
        date: '2024-04-20',
        lat: -6.2488,
        lng: 106.6404,
        rating: 3.8,
        reviews: [
            { user: 'Eka', text: 'Lemari besar, sesuai', rating: 4 },
            { user: 'Fani', text: 'Ada lecet dikit tp ok', rating: 3 }
        ],
        sellerRating: 4.0,
        terjual: 2
    },
    {
        id: 's19',
        name: 'Setrika Philips',
        category: 'Elektronik',
        price: 40000,
        condition: 'Seperti Baru',
        location: 'Tangerang',
        campus: 'Untar',
        contact: '08122112233',
        description: 'Setrika Philips steam iron. Baru dipakai 2 kali. Alasan jual: dapat setrika baru.',
        image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&q=80',
        date: '2024-04-25',
        lat: -6.1702,
        lng: 106.6404,
        rating: 4.5,
        reviews: [
            { user: 'Gita', text: 'Mulus banget', rating: 5 }
        ],
        sellerRating: 4.7,
        terjual: 1
    },
    {
        id: 's20',
        name: 'Gantungan Baju Standing',
        category: 'Furniture',
        price: 30000,
        condition: 'Baik',
        location: 'Tangerang',
        campus: 'Pelita Harapan',
        contact: '08123223344',
        description: 'Gantungan baju standing, bisa muat 10-15 baju. Mudah dibongkar pasang. Cocok untuk kos.',
        image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=400&q=80',
        date: '2024-05-01',
        lat: -6.2402,
        lng: 106.6404,
        rating: 4.3,
        reviews: [
            { user: 'Hana', text: 'Simple dan berguna', rating: 4 },
            { user: 'Indra', text: 'Murah meriah', rating: 5 }
        ],
        sellerRating: 4.5,
        terjual: 6
    },
    {
        id: 's21',
        name: 'Matras Yoga',
        category: 'Lainnya',
        price: 35000,
        condition: 'Seperti Baru',
        location: 'Yogyakarta',
        campus: 'UGM',
        contact: '08124334455',
        description: 'Matras yoga tebal 6mm. Baru dipakai 3 kali. Cocok untuk olahraga di kos.',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80',
        date: '2024-05-05',
        lat: -7.7712,
        lng: 110.3777,
        rating: 4.6,
        reviews: [
            { user: 'Jati', text: 'Matrasnya tebal', rating: 5 },
            { user: 'Kartika', text: 'Nyaman dipakai', rating: 4 }
        ],
        sellerRating: 4.8,
        terjual: 3
    },
    {
        id: 's22',
        name: 'Buku Ekonomi Mikro',
        category: 'Buku',
        price: 20000,
        condition: 'Baik',
        location: 'Yogyakarta',
        campus: 'UGM',
        contact: '08125445566',
        description: 'Buku Ekonomi Mikro edisi 3. Masih bagus, ada highlighter di beberapa halaman.',
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80',
        date: '2024-05-10',
        lat: -7.7712,
        lng: 110.3777,
        rating: 4.2,
        reviews: [
            { user: 'Lintang', text: 'Buku lengkap', rating: 4 }
        ],
        sellerRating: 4.3,
        terjual: 4
    },
    {
        id: 's23',
        name: 'Lampu Belajar LED',
        category: 'Elektronik',
        price: 25000,
        condition: 'Baru',
        location: 'Yogyakarta',
        campus: 'UNY',
        contact: '08126556677',
        description: 'Lampu belajar LED clip-on, USB rechargeable. Masih baru dalam kotak. Cocok untuk belajar malam.',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&q=80',
        date: '2024-05-15',
        lat: -7.7828,
        lng: 110.3768,
        rating: 4.9,
        reviews: [
            { user: 'Maya', text: 'Terang banget', rating: 5 },
            { user: 'Nando', text: 'Bagus untuk belajar', rating: 5 }
        ],
        sellerRating: 5.0,
        terjual: 7
    },
    {
        id: 's24',
        name: 'Meja Belajar Lipat',
        category: 'Furniture',
        price: 65000,
        condition: 'Baik',
        location: 'Semarang',
        campus: 'UNDIP',
        contact: '08127667788',
        description: 'Meja belajar lipat ukuran 70x45 cm. Ringan dan mudah dipindah. Cocok untuk kos sempit.',
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80',
        date: '2024-05-20',
        lat: -7.0501,
        lng: 110.4381,
        rating: 4.4,
        reviews: [
            { user: 'Oscar', text: 'Meja kokoh', rating: 4 },
            { user: 'Putri', text: 'Pas di kos', rating: 5 }
        ],
        sellerRating: 4.6,
        terjual: 3
    },
    {
        id: 's25',
        name: 'Panci Set 2 Pcs',
        category: 'Alat Masak',
        price: 35000,
        condition: 'Baik',
        location: 'Semarang',
        campus: 'UNNES',
        contact: '08128778899',
        description: 'Set panci 2 ukuran (18cm & 20cm). Masih bagus, tidak penyok. Alasan jual: jarang masak.',
        image: 'https://images.unsplash.com/photo-1584990347449-a6f0e3e25e5a?w=400&q=80',
        date: '2024-05-25',
        lat: -7.0501,
        lng: 110.4381,
        rating: 4.0,
        reviews: [
            { user: 'Queen', text: 'Panci bagus', rating: 4 }
        ],
        sellerRating: 4.2,
        terjual: 2
    },
    {
        id: 's26',
        name: 'Hoodie Polos Hitam',
        category: 'Pakaian',
        price: 40000,
        condition: 'Seperti Baru',
        location: 'Semarang',
        campus: 'UNDIP',
        contact: '08129889900',
        description: 'Hoodie polos hitam ukuran L. Baru dipakai 2 kali. Bahan tebal dan hangat.',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80',
        date: '2024-06-01',
        lat: -7.0501,
        lng: 110.4381,
        rating: 4.7,
        reviews: [
            { user: 'Raka', text: 'Hoodie adem', rating: 5 },
            { user: 'Sinta', text: 'Ukuran pas', rating: 4 }
        ],
        sellerRating: 4.8,
        terjual: 4
    },
    {
        id: 's27',
        name: 'Dispenser Air Mini',
        category: 'Elektronik',
        price: 80000,
        condition: 'Cukup',
        location: 'Makassar',
        campus: 'UNHAS',
        contact: '08130990011',
        description: 'Dispenser air mini, bisa untuk galon kecil. Masih berfungsi normal. Ada sedikit retak di bagian belakang.',
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
        date: '2024-06-05',
        lat: -5.1354,
        lng: 119.4238,
        rating: 3.5,
        reviews: [
            { user: 'Tari', text: 'Fungsi normal', rating: 3 },
            { user: 'Ujang', text: 'Murah', rating: 4 }
        ],
        sellerRating: 3.8,
        terjual: 2
    },
    {
        id: 's28',
        name: 'Alat Sholat Travel',
        category: 'Lainnya',
        price: 45000,
        condition: 'Baru',
        location: 'Makassar',
        campus: 'UIN Alauddin',
        contact: '08131001122',
        description: 'Alat sholat travel lengkap (sajadah, mukena, tasbih). Masih baru, belum dipakai. Cocok untuk bekal kos.',
        image: 'https://images.unsplash.com/photo-1609599002809-1f8c82c2e2b8?w=400&q=80',
        date: '2024-06-10',
        lat: -5.1354,
        lng: 119.4238,
        rating: 5.0,
        reviews: [
            { user: 'Vivi', text: 'Lengkap banget', rating: 5 },
            { user: 'Wahyu', text: 'Barang baru', rating: 5 }
        ],
        sellerRating: 5.0,
        terjual: 5
    },
    {
        id: 's29',
        name: 'Rak Piring 2 Tingkat',
        category: 'Furniture',
        price: 28000,
        condition: 'Baik',
        location: 'Makassar',
        campus: 'UNHAS',
        contact: '08132112233',
        description: 'Rak piring 2 tingkat, bisa muat 10-15 piring. Mudah dibersihkan. Cocok untuk dapur kos.',
        image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=400&q=80',
        date: '2024-06-15',
        lat: -5.1354,
        lng: 119.4238,
        rating: 4.1,
        reviews: [
            { user: 'Xavier', text: 'Rak praktis', rating: 4 }
        ],
        sellerRating: 4.3,
        terjual: 3
    }
];

const campuses = [
    'ITS', 'UNAIR', 'UB', 'UM', 'UNEJ', 'POLIJE', 'ITB', 'UI', 'UGM', 'UNDIP',
    'UNESA', 'UPN', 'TELKOM', 'BINUS', 'UNPAD', 'UNIBRAW', 'UNHAS', 'USU'
];

const categories = [
    'Furniture', 'Elektronik', 'Pakaian', 'Alat Masak', 'Buku', 'Lainnya'
];

function getMessages() {
    const stored = localStorage.getItem('kosdeal_messages');
    return stored ? JSON.parse(stored) : [];
}

function saveMessages(messages) {
    localStorage.setItem('kosdeal_messages', JSON.stringify(messages));
}

function getCurrentUser() {
    let user = localStorage.getItem('kosdeal_current_user');
    if (!user) {
        user = 'User' + Date.now().toString().slice(-4);
        localStorage.setItem('kosdeal_current_user', user);
    }
    return user;
}

function getUserProfile() {
    const stored = localStorage.getItem('kosdeal_user_profile');
    if (stored) return JSON.parse(stored);
    const defaultProfile = {
        name: getCurrentUser(),
        role: '',
        campus: '',
        isVerified: false,
        verificationImage: '',
        verificationStatus: 'none',
        phone: '',
        bio: ''
    };
    localStorage.setItem('kosdeal_user_profile', JSON.stringify(defaultProfile));
    return defaultProfile;
}

function saveUserProfile(profile) {
    localStorage.setItem('kosdeal_user_profile', JSON.stringify(profile));
}

function getRoleBadge(role) {
    const badges = {
        'mahasiswa': '<span class="role-badge role-mahasiswa"><i class="fas fa-graduation-cap"></i> Mahasiswa</span>',
        'pekerja': '<span class="role-badge role-pekerja"><i class="fas fa-briefcase"></i> Pekerja</span>',
        'pemilik kos': '<span class="role-badge role-pemilik-kos"><i class="fas fa-building"></i> Pemilik Kos</span>'
    };
    return badges[role] || '';
}

function getVerificationBadge(isVerified) {
    if (isVerified) {
        return '<span class="verified-badge"><i class="fas fa-check-circle"></i> Terverifikasi</span>';
    }
    return '';
}

const komunitasDaerah = [
    { id: 'surabaya', name: 'Surabaya', icon: 'fa-city', desc: 'Kos-kosan sekitar ITS, UNAIR, UNESA, UPN' },
    { id: 'jakarta', name: 'Jakarta', icon: 'fa-building', desc: 'Kos-kosan sekitar UI, BINUS, Trisakti' },
    { id: 'bandung', name: 'Bandung', icon: 'fa-mountain', desc: 'Kos-kosan sekitar ITB, UNPAD, Telkom' },
    { id: 'malang', name: 'Malang', icon: 'fa-tree', desc: 'Kos-kosan sekitar UB, UM, UIN Malang' },
    { id: 'bali', name: 'Bali', icon: 'fa-umbrella-beach', desc: 'Kos-kosan sekitar Udayana, ITB STIKOM Bali' },
    { id: 'tangerang', name: 'Tangerang', icon: 'fa-industry', desc: 'Kos-kosan sekitar UMN, Untar, Pelita Harapan' },
    { id: 'yogyakarta', name: 'Yogyakarta', icon: 'fa-temple', desc: 'Kos-kosan sekitar UGM, UNY, AMIKOM' },
    { id: 'semarang', name: 'Semarang', icon: 'fa-anchor', desc: 'Kos-kosan sekitar UNDIP, UNNES' },
    { id: 'jember', name: 'Jember', icon: 'fa-leaf', desc: 'Kos-kosan sekitar UNEJ, POLIJE' },
    { id: 'makassar', name: 'Makassar', icon: 'fa-ship', desc: 'Kos-kosan sekitar UNHAS, UIN Alauddin' }
];

function getKomunitasMessages(daerahId) {
    const stored = localStorage.getItem('kosdeal_komunitas_' + daerahId);
    return stored ? JSON.parse(stored) : [];
}

function saveKomunitasMessages(daerahId, messages) {
    localStorage.setItem('kosdeal_komunitas_' + daerahId, JSON.stringify(messages));
}
