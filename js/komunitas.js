document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

    const grid = document.getElementById('komunitasGrid');
    if (grid) {
        grid.innerHTML = komunitasDaerah.map(d => `
            <div class="komunitas-card" data-id="${d.id}">
                <div class="komunitas-card-icon">
                    <i class="fas ${d.icon}"></i>
                </div>
                <h3>${d.name}</h3>
                <p>${d.desc}</p>
                <span class="komunitas-member-count">
                    <i class="fas fa-user"></i> ${getKomunitasMemberCount(d.id)} anggota
                </span>
                <button class="btn btn-primary btn-sm btn-join-komunitas" data-id="${d.id}" data-name="${d.name}" data-desc="${d.desc}">
                    <i class="fas fa-comment-dots"></i> Ngobrol
                </button>
            </div>
        `).join('');
    }

    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn-join-komunitas');
        if (!btn) return;
        const id = btn.dataset.id;
        const name = btn.dataset.name;
        const desc = btn.dataset.desc;

        const modal = document.getElementById('komunitasChatModal');
        if (modal) {
            document.getElementById('komunitasChatName').textContent = name;
            document.getElementById('komunitasChatDesc').textContent = desc;
            document.getElementById('komunitasDaerahId').value = id;
            renderKomunitasMessages(id);
            modal.style.display = 'flex';
        }
    });

    const chatForm = document.getElementById('komunitasChatForm');
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const daerahId = document.getElementById('komunitasDaerahId').value;
            const input = document.getElementById('komunitasChatInput');
            const text = input.value.trim();
            if (!text) return;

            const messages = getKomunitasMessages(daerahId);
            messages.push({
                id: 'kmsg' + Date.now(),
                sender: getCurrentUser(),
                text: text,
                time: new Date().toISOString()
            });
            saveKomunitasMessages(daerahId, messages);
            input.value = '';
            renderKomunitasMessages(daerahId);
            updateMemberCount(daerahId);
        });
    }

    function renderKomunitasMessages(daerahId) {
        const container = document.getElementById('komunitasChatMessages');
        if (!container) return;
        const messages = getKomunitasMessages(daerahId);
        const currentUser = getCurrentUser();
        if (messages.length === 0) {
            container.innerHTML = '<p class="chat-empty">Belum ada pesan. Jadilah yang pertama ngobrol!</p>';
            return;
        }
        container.innerHTML = messages.map(m => {
            const senderProfile = getUserProfile();
            const isOwn = m.sender === currentUser;
            const profile = isOwn ? senderProfile : { role: '', isVerified: false };
            const roleBadge = getRoleBadge(profile.role);
            const verifBadge = getVerificationBadge(profile.isVerified);
            return `
            <div class="chat-msg ${isOwn ? 'chat-msg-own' : 'chat-msg-other'}">
                <div class="chat-msg-bubble">
                    <strong style="font-size:12px;display:block;margin-bottom:2px;opacity:0.8">${m.sender}</strong>
                    <p class="chat-msg-text">${m.text}</p>
                    <span class="chat-msg-time">${new Date(m.time).toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'})}</span>
                </div>
            </div>
            `;
        }).join('');
        container.scrollTop = container.scrollHeight;
    }

    function getKomunitasMemberCount(daerahId) {
        const messages = getKomunitasMessages(daerahId);
        const uniqueUsers = new Set(messages.map(m => m.sender));
        return uniqueUsers.size || 0;
    }

    function updateMemberCount(daerahId) {
        const cards = document.querySelectorAll('.komunitas-card');
        cards.forEach(card => {
            if (card.dataset.id === daerahId) {
                const countEl = card.querySelector('.komunitas-member-count');
                if (countEl) {
                    countEl.innerHTML = `<i class="fas fa-user"></i> ${getKomunitasMemberCount(daerahId)} anggota`;
                }
            }
        });
    }

    const closeModal = document.querySelector('.close-komunitas-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.getElementById('komunitasChatModal').style.display = 'none';
        });
    }

    window.addEventListener('click', function(e) {
        const modal = document.getElementById('komunitasChatModal');
        if (e.target === modal) modal.style.display = 'none';
    });
});
