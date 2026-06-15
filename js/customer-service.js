const csResponses = [
    { keywords: ['halo', 'hi', 'hai', 'pagi', 'siang', 'sore', 'malam'], reply: 'Halo! Ada yang bisa kami bantu? Silakan tanya seputar KosDeal ya 😊' },
    { keywords: ['beli', 'membeli', 'pembelian'], reply: 'Untuk membeli barang, tinggal klik tombol "Beli" di kartu barang, lalu ikuti langkah pembayarannya. Dana akan diamankan via escrow sampai barang kamu terima!' },
    { keywords: ['jual', 'menjual', 'upload', 'posting'], reply: 'Mau jual barang? Klik "Jual Barang" di navigasi, upload foto, isi info barang, dan tentukan harga. Mudah banget!' },
    { keywords: ['escrow', 'aman', 'pembayaran', 'dana'], reply: 'Sistem escrow KosDeal mengamankan dana pembeli sampai barang diterima. Jadi transaksi lebih aman dan terpercaya!' },
    { keywords: ['chat', 'pesan', 'penjual'], reply: 'Klik tombol "Chat" di kartu barang untuk ngobrol langsung dengan penjual. Bisa tanya kondisi, negosiasi harga, atau atur lokasi transaksi.' },
    { keywords: ['ongkir', 'pengiriman', 'logistik', 'kirim'], reply: 'KosDeal prioritas pengiriman hyperlocal dalam radius 5-10 km biar ongkir murah dan cepat sampainya!' },
    { keywords: ['rating', 'review', 'ulasan'], reply: 'Kamu bisa lihat rating penjual dan baca review dari pembeli sebelumnya sebelum transaksi. Jangan lupa kasih review setelah belanja ya!' },
    { keywords: ['komunitas', 'kampus', 'group'], reply: 'Fitur Komunitas memungkinkan kamu chat dengan pengguna dari kampus yang sama. Cari dan gabung di halaman Komunitas!' },
    { keywords: ['profile', 'profil', 'verifikasi', 'verif'], reply: 'Di halaman Profil kamu bisa melengkapi data diri, pilih peran (mahasiswa/pekerja/pemilik kos), dan verifikasi akun.' },
    { keywords: ['lupa', 'password', 'login', 'akun'], reply: 'Saat ini KosDeal menggunakan penyimpanan lokal. Data kamu tersimpan di browser yang kamu pakai.' },
    { keywords: ['terima kasih', 'makasih', 'thanks'], reply: 'Sama-sama! Senang bisa membantu. Ada lagi yang bisa kami bantu? 😊' },
    { keywords: ['admin', 'cs', 'customer service', 'operator'], reply: 'Iya, ini CS KosDeal! Ada yang bisa kami bantu? Tanyakan apa aja ya seputar KosDeal.' },
];

function getCsReply(message) {
    const lower = message.toLowerCase();
    for (const item of csResponses) {
        if (item.keywords.some(k => lower.includes(k))) {
            return item.reply;
        }
    }
    return 'Maaf, kami belum paham pertanyaan kamu. Coba tanya dengan kata kunci lain atau hubungi kami via WhatsApp ya!';
}

function getCsMessages() {
    const stored = localStorage.getItem('kosdeal_cs_messages');
    return stored ? JSON.parse(stored) : [];
}

function saveCsMessages(messages) {
    localStorage.setItem('kosdeal_cs_messages', JSON.stringify(messages));
}

function renderCsMessages() {
    const container = document.getElementById('csChatMessages');
    if (!container) return;
    const messages = getCsMessages();
    if (messages.length === 0) {
        container.innerHTML = '<p class="chat-empty">Halo! Ada yang bisa kami bantu? Silakan tulis pesan kamu 😊</p>';
        return;
    }
    container.innerHTML = messages.map(m => `
        <div class="chat-msg ${m.sender === 'user' ? 'chat-msg-own' : 'chat-msg-other'}">
            <div class="chat-msg-bubble">
                <p class="chat-msg-text">${m.text}</p>
                <span class="chat-msg-time">${new Date(m.time).toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'})}</span>
            </div>
        </div>
    `).join('');
    container.scrollTop = container.scrollHeight;
}

document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('openCsChat');
    const modal = document.getElementById('csChatModal');
    const closeBtn = document.querySelector('.close-cs-chat-modal');
    const form = document.getElementById('csChatForm');
    const input = document.getElementById('csChatInput');

    if (openBtn) {
        openBtn.addEventListener('click', function() {
            renderCsMessages();
            modal.style.display = 'flex';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === modal) modal.style.display = 'none';
    });

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const text = input.value.trim();
            if (!text) return;

            const messages = getCsMessages();
            messages.push({
                id: 'cs' + Date.now(),
                sender: 'user',
                text: text,
                time: new Date().toISOString()
            });
            saveCsMessages(messages);
            input.value = '';
            renderCsMessages();

            setTimeout(function() {
                const reply = getCsReply(text);
                const updatedMessages = getCsMessages();
                updatedMessages.push({
                    id: 'cs' + Date.now(),
                    sender: 'cs',
                    text: reply,
                    time: new Date().toISOString()
                });
                saveCsMessages(updatedMessages);
                renderCsMessages();
            }, 800);
        });
    }

    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            const isOpen = answer.style.maxHeight;

            document.querySelectorAll('.faq-answer').forEach(function(a) {
                a.style.maxHeight = null;
                a.style.padding = '0 24px';
            });
            document.querySelectorAll('.faq-question i').forEach(function(ic) {
                ic.style.transform = 'rotate(0deg)';
            });

            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '0 24px 24px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});
