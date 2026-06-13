const sampleProducts = [
    {
        id: 's1',
        name: 'Meja Belajar Lipat',
        category: 'Furniture',
        price: 75000,
        condition: 'Baik',
        location: 'Surabaya',
        contact: '08123456789',
        description: 'Meja belajar lipat, masih layak pakai. Cocok untuk kos yang sempit. Sudah dipakai 1 tahun.',
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80',
        date: '2024-01-15'
    },
    {
        id: 's2',
        name: 'Kulkas Mini 1 Pintu',
        category: 'Elektronik',
        price: 350000,
        condition: 'Baik',
        location: 'Malang',
        contact: '08765432198',
        description: 'Kulkas mini Polytron, dingin masih normal. Cocok untuk kos. Alasan jual: pindah kos yang sudah ada kulkas.',
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80',
        date: '2024-01-20'
    },
    {
        id: 's3',
        name: 'Kompor Gas Portable',
        category: 'Alat Masak',
        price: 45000,
        condition: 'Seperti Baru',
        location: 'Jember',
        contact: '08567891234',
        description: 'Kompor gas portable, baru dipakai 2 bulan. Lengkap dengan selang dan regulator.',
        image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&q=80',
        date: '2024-02-01'
    },
    {
        id: 's4',
        name: 'Buku Kalkulus STIKOM',
        category: 'Buku',
        price: 25000,
        condition: 'Baik',
        location: 'Surabaya',
        contact: '08901234567',
        description: 'Buku kalkulus untuk mahasiswa STIKOM. Masih bagus, tidak ada yang sobek.',
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80',
        date: '2024-02-05'
    },
    {
        id: 's5',
        name: 'Kipas Angin Dinding',
        category: 'Elektronik',
        price: 55000,
        condition: 'Cukup',
        location: 'Surabaya',
        contact: '08134567890',
        description: 'Kipas angin dinding Maspion, masih berfungsi normal. Agak berisik tapi masih kencang.',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
        date: '2024-02-10'
    },
    {
        id: 's6',
        name: 'Rak Sepatu 3 Tingkat',
        category: 'Furniture',
        price: 35000,
        condition: 'Baik',
        location: 'Malang',
        contact: '08234567891',
        description: 'Rak sepatu 3 tingkat, bisa muat 6-9 pasang sepatu. Mudah dibongkar pasang.',
        image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=400&q=80',
        date: '2024-02-15'
    },
    {
        id: 's7',
        name: 'Panci Set 3 Pcs',
        category: 'Alat Masak',
        price: 40000,
        condition: 'Baik',
        location: 'Jember',
        contact: '08345678912',
        description: 'Set panci 3 ukuran. Masih bagus, tidak penyok. Alasan jual: jarang masak.',
        image: 'https://images.unsplash.com/photo-1584990347449-a6f0e3e25e5a?w=400&q=80',
        date: '2024-02-20'
    },
    {
        id: 's8',
        name: 'Baju Kemeja Pria Lengan Panjang',
        category: 'Pakaian',
        price: 30000,
        condition: 'Seperti Baru',
        location: 'Surabaya',
        contact: '08456789123',
        description: 'Kemeja pria ukuran L, warna putih. Baru dipakai 2 kali. Cocok untuk interview atau kerja.',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
        date: '2024-03-01'
    }
];
