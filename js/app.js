function getProducts() {
    const stored = localStorage.getItem('kosdeal_products');
    if (stored) {
        return JSON.parse(stored);
    }
    localStorage.setItem('kosdeal_products', JSON.stringify(sampleProducts));
    return sampleProducts;
}

function saveProducts(products) {
    localStorage.setItem('kosdeal_products', JSON.stringify(products));
}

function getOrders() {
    const stored = localStorage.getItem('kosdeal_orders');
    return stored ? JSON.parse(stored) : [];
}

function saveOrders(orders) {
    localStorage.setItem('kosdeal_orders', JSON.stringify(orders));
}

function getEscrowBalance() {
    return parseInt(localStorage.getItem('kosdeal_escrow') || '0');
}

function setEscrowBalance(val) {
    localStorage.setItem('kosdeal_escrow', val.toString());
}

function formatPrice(price) {
    return 'Rp ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function getRelativeTime(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Hari ini';
    if (days === 1) return 'Kemarin';
    if (days < 7) return days + ' hari lalu';
    if (days < 30) return Math.floor(days / 7) + ' minggu lalu';
    return Math.floor(days / 30) + ' bulan lalu';
}

function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty) + ` <span class="rating-num">${rating}</span>`;
}

function getDistanceFromUser(productLat, productLng) {
    const userLat = parseFloat(localStorage.getItem('kosdeal_user_lat'));
    const userLng = parseFloat(localStorage.getItem('kosdeal_user_lng'));
    if (!userLat || !userLng) return null;
    const R = 6371;
    const dLat = (productLat - userLat) * Math.PI / 180;
    const dLng = (productLng - userLng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLat * Math.PI / 180) * Math.cos(productLat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function smartPriceEngine(product) {
    const avgPriceByCategory = {
        'Furniture': 50000,
        'Elektronik': 200000,
        'Pakaian': 35000,
        'Alat Masak': 40000,
        'Buku': 30000,
        'Lainnya': 25000
    };
    const conditionDiscount = {
        'Baru': 1.0,
        'Seperti Baru': 0.85,
        'Baik': 0.7,
        'Cukup': 0.5
    };
    const ageDiscount = Math.max(0.7, 1 - (new Date() - new Date(product.date)) / (1000 * 60 * 60 * 24 * 365));
    const avgPrice = avgPriceByCategory[product.category] || 25000;
    const condMultiplier = conditionDiscount[product.condition] || 0.7;
    const suggestedPrice = Math.round(avgPrice * condMultiplier * ageDiscount);
    const minPrice = Math.round(suggestedPrice * 0.8);
    const maxPrice = Math.round(suggestedPrice * 1.2);
    const isFair = product.price >= minPrice && product.price <= maxPrice;
    return { suggestedPrice, minPrice, maxPrice, isFair };
}

function createProductCard(product) {
    const pricing = smartPriceEngine(product);
    const distance = getDistanceFromUser(product.lat, product.lng);
    const distStr = distance !== null ? `${distance.toFixed(1)} km` : '';
    const stars = renderStars(product.rating || 0);
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="product-condition ${product.condition.toLowerCase().replace(/\s/g, '-')}">${product.condition}</span>
                ${product.terjual ? `<span class="product-sold"><i class="fas fa-check-circle"></i> ${product.terjual}x terjual</span>` : ''}
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
                ${pricing.isFair ? '' : `<span class="price-badge ${product.price > pricing.maxPrice ? 'price-high' : 'price-low'}">
                    ${product.price > pricing.maxPrice ? '⚡ Agak mahal' : '💰 Murah banget!'}
                </span>`}
                <div class="product-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${product.location}</span>
                    ${product.campus ? `<span><i class="fas fa-university"></i> ${product.campus}</span>` : ''}
                    ${distStr ? `<span><i class="fas fa-route"></i> ${distStr}</span>` : ''}
                    <span><i class="far fa-clock"></i> ${getRelativeTime(product.date)}</span>
                </div>
                <div class="product-rating">${stars}</div>
                <p class="product-desc">${product.description.substring(0, 80)}${product.description.length > 80 ? '...' : ''}</p>
                <div class="product-actions">
                    <button class="btn btn-whatsapp btn-sm btn-chat" data-id="${product.id}" data-name="${product.name}" data-seller="${product.contact}">
                        <i class="fas fa-comment-dots"></i> Chat
                    </button>
                    <button class="btn btn-outline btn-sm btn-beli" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Beli
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    const emptyState = document.getElementById('emptyState');
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.style.display = 'flex';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';
    container.innerHTML = products.map(createProductCard).join('');
}

function getCategoryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || '';
}

function getCampusFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('campus') || '';
}

function requestGeolocation() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve(false);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                localStorage.setItem('kosdeal_user_lat', pos.coords.latitude);
                localStorage.setItem('kosdeal_user_lng', pos.coords.longitude);
                resolve(true);
            },
            () => resolve(false),
            { timeout: 5000 }
        );
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

    await requestGeolocation();

    const products = getProducts();

    const featuredContainer = document.getElementById('featuredProducts');
    if (featuredContainer) {
        const featured = products.slice(0, 4);
        renderProducts(featured, 'featuredProducts');
        document.getElementById('totalProducts').textContent = products.length;
    }

    const allContainer = document.getElementById('allProducts');
    if (allContainer) {
        let filteredProducts = [...products];
        const categoryFilter = getCategoryFromUrl();
        const campusFilter = getCampusFromUrl();

        if (categoryFilter) {
            filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
        }
        if (campusFilter) {
            filteredProducts = filteredProducts.filter(p => p.campus === campusFilter);
        }

        renderProducts(filteredProducts, 'allProducts');

        const searchInput = document.getElementById('searchInput');
        const categorySelect = document.getElementById('categoryFilter');
        const campusSelect = document.getElementById('campusFilter');
        const sortSelect = document.getElementById('sortFilter');

        if (categoryFilter && categorySelect) categorySelect.value = categoryFilter;
        if (campusFilter && campusSelect) campusSelect.value = campusFilter;

        function filterAndSort() {
            let result = [...products];
            const search = (searchInput ? searchInput.value : '').toLowerCase();
            const category = categorySelect ? categorySelect.value : '';
            const campus = campusSelect ? campusSelect.value : '';
            const sort = sortSelect ? sortSelect.value : 'newest';

            if (search) {
                result = result.filter(p =>
                    p.name.toLowerCase().includes(search) ||
                    p.description.toLowerCase().includes(search) ||
                    p.location.toLowerCase().includes(search) ||
                    p.campus.toLowerCase().includes(search)
                );
            }

            if (category) result = result.filter(p => p.category === category);
            if (campus) result = result.filter(p => p.campus === campus);

            switch (sort) {
                case 'newest': result.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
                case 'oldest': result.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
                case 'cheapest': result.sort((a, b) => a.price - b.price); break;
                case 'expensive': result.sort((a, b) => b.price - a.price); break;
                case 'nearest':
                    result.sort((a, b) => {
                        const dA = getDistanceFromUser(a.lat, a.lng) || 9999;
                        const dB = getDistanceFromUser(b.lat, b.lng) || 9999;
                        return dA - dB;
                    });
                    break;
                case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
            }

            renderProducts(result, 'allProducts');
        }

        if (searchInput) searchInput.addEventListener('input', filterAndSort);
        if (categorySelect) categorySelect.addEventListener('change', filterAndSort);
        if (campusSelect) campusSelect.addEventListener('change', filterAndSort);
        if (sortSelect) sortSelect.addEventListener('change', filterAndSort);
    }

    const form = document.getElementById('addProductForm');
    if (form) {
        const imageUpload = document.getElementById('imageUpload');
        const imageInput = document.getElementById('productImage');
        const imagePreview = document.getElementById('imagePreview');
        const previewImg = document.getElementById('previewImg');
        const removeImageBtn = document.getElementById('removeImage');
        const priceInput = document.getElementById('productPrice');
        const categorySelect = document.getElementById('productCategory');
        const conditionSelect = document.getElementById('productCondition');
        const smartSuggestion = document.getElementById('smartSuggestion');

        function updateSmartPrice() {
            const category = categorySelect.value;
            const condition = conditionSelect.value;
            if (category && condition) {
                const avgPrices = {
                    'Furniture': 50000, 'Elektronik': 200000, 'Pakaian': 35000,
                    'Alat Masak': 40000, 'Buku': 30000, 'Lainnya': 25000
                };
                const condDiscount = { 'Baru': 1.0, 'Seperti Baru': 0.85, 'Baik': 0.7, 'Cukup': 0.5 };
                const suggested = Math.round((avgPrices[category] || 25000) * (condDiscount[condition] || 0.7));
                smartSuggestion.innerHTML = `
                    <i class="fas fa-robot"></i>
                    Smart Pricing: Harga pasar untuk <strong>${category} (${condition})</strong> sekitar <strong>${formatPrice(suggested)}</strong>
                `;
                smartSuggestion.style.display = 'flex';
            } else {
                smartSuggestion.style.display = 'none';
            }
        }

        categorySelect.addEventListener('change', updateSmartPrice);
        conditionSelect.addEventListener('change', updateSmartPrice);

        imageUpload.addEventListener('click', function() { imageInput.click(); });

        imageUpload.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#6366f1';
            this.style.background = '#eef2ff';
        });

        imageUpload.addEventListener('dragleave', function() {
            this.style.borderColor = '#d1d5db';
            this.style.background = '#f9fafb';
        });

        imageUpload.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#d1d5db';
            this.style.background = '#f9fafb';
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) handleImage(file);
        });

        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) handleImage(this.files[0]);
        });

        function handleImage(file) {
            if (file.size > 5 * 1024 * 1024) { alert('Ukuran foto maksimal 5MB!'); return; }
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                imageUpload.style.display = 'none';
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }

        removeImageBtn.addEventListener('click', function() {
            previewImg.src = '';
            imageInput.value = '';
            imageUpload.style.display = 'flex';
            imagePreview.style.display = 'none';
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('productName').value;
            const category = document.getElementById('productCategory').value;
            const price = parseInt(document.getElementById('productPrice').value);
            const condition = document.getElementById('productCondition').value;
            const location = document.getElementById('productLocation').value;
            const campus = document.getElementById('productCampus').value;
            const contact = document.getElementById('productContact').value;
            const description = document.getElementById('productDescription').value;
            const image = previewImg.src || 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&q=80';

            const userLat = parseFloat(localStorage.getItem('kosdeal_user_lat')) || -7.2797;
            const userLng = parseFloat(localStorage.getItem('kosdeal_user_lng')) || 112.7953;

            const newProduct = {
                id: 'p' + Date.now(),
                name, category, price, condition, location, campus, contact, description, image,
                date: new Date().toISOString().split('T')[0],
                lat: userLat, lng: userLng,
                rating: 0, reviews: [], sellerRating: 5.0, terjual: 0
            };

            const allProducts = getProducts();
            allProducts.unshift(newProduct);
            saveProducts(allProducts);

            alert('Barang berhasil diupload! 🎉');
            window.location.href = 'products.html';
        });
    }

    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn-beli');
        if (!btn) return;
        const productId = btn.dataset.id;
        const allProducts = getProducts();
        const product = allProducts.find(p => p.id === productId);
        if (!product) return;

        const modal = document.getElementById('escrowModal');
        if (modal) {
            document.getElementById('escrowProductName').textContent = product.name;
            document.getElementById('escrowProductPrice').textContent = formatPrice(product.price);
            document.getElementById('escrowTotal').textContent = formatPrice(product.price);
            document.getElementById('escrowProductId').value = product.id;
            modal.style.display = 'flex';
        }
    });

    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn-chat');
        if (!btn) return;
        const productId = btn.dataset.id;
        const productName = btn.dataset.name;
        const sellerContact = btn.dataset.seller;
        const allProducts = getProducts();
        const product = allProducts.find(p => p.id === productId);
        if (!product) return;

        const modal = document.getElementById('chatModal');
        if (modal) {
            document.getElementById('chatProductName').textContent = productName;
            document.getElementById('chatSellerInfo').textContent = product.location + (product.campus ? ' - ' + product.campus : '');
            document.getElementById('chatProductId').value = productId;
            document.getElementById('chatSellerContact').value = sellerContact;
            renderChatMessages(productId);
            modal.style.display = 'flex';
        }
    });

    const chatForm = document.getElementById('chatForm');
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const productId = document.getElementById('chatProductId').value;
            const input = document.getElementById('chatInput');
            const text = input.value.trim();
            if (!text) return;

            const messages = getMessages();
            messages.push({
                id: 'msg' + Date.now(),
                productId: productId,
                sender: getCurrentUser(),
                text: text,
                time: new Date().toISOString()
            });
            saveMessages(messages);
            input.value = '';
            renderChatMessages(productId);
        });
    }

    function renderChatMessages(productId) {
        const container = document.getElementById('chatMessages');
        if (!container) return;
        const messages = getMessages().filter(m => m.productId === productId);
        const currentUser = getCurrentUser();
        if (messages.length === 0) {
            container.innerHTML = '<p class="chat-empty">Belum ada pesan. Kirim pesan pertama!</p>';
            return;
        }
        container.innerHTML = messages.map(m => `
            <div class="chat-msg ${m.sender === currentUser ? 'chat-msg-own' : 'chat-msg-other'}">
                <div class="chat-msg-bubble">
                    <p class="chat-msg-text">${m.text}</p>
                    <span class="chat-msg-time">${new Date(m.time).toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'})}</span>
                </div>
            </div>
        `).join('');
        container.scrollTop = container.scrollHeight;
    }

    const closeChatModal = document.querySelector('.close-chat-modal');
    if (closeChatModal) {
        closeChatModal.addEventListener('click', function() {
            document.getElementById('chatModal').style.display = 'none';
        });
    }

    window.addEventListener('click', function(e) {
        const modal = document.getElementById('chatModal');
        if (e.target === modal) modal.style.display = 'none';
    });

    const escrowForm = document.getElementById('escrowForm');
    if (escrowForm) {
        escrowForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const productId = document.getElementById('escrowProductId').value;
            const name = document.getElementById('escrowName').value;
            const address = document.getElementById('escrowAddress').value;
            const paymentMethod = document.getElementById('escrowPayment').value;

            const allProducts = getProducts();
            const product = allProducts.find(p => p.id === productId);
            if (!product) return;

            const balance = getEscrowBalance();
            setEscrowBalance(balance + product.price);

            const orders = getOrders();
            orders.push({
                id: 'ORD' + Date.now(),
                productId, productName: product.name,
                price: product.price,
                buyer: name, address, paymentMethod,
                status: 'Menunggu Konfirmasi',
                date: new Date().toISOString()
            });
            saveOrders(orders);

            product.terjual = (product.terjual || 0) + 1;
            saveProducts(allProducts);

            alert(`Pesanan berhasil! Dana Rp ${formatPrice(product.price)} sudah masuk escrow KosDeal. Menunggu konfirmasi penjual.`);
            document.getElementById('escrowModal').style.display = 'none';
            escrowForm.reset();
            updateEscrowDisplay();
        });
    }

    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.getElementById('escrowModal').style.display = 'none';
        });
    }

    window.addEventListener('click', function(e) {
        const modal = document.getElementById('escrowModal');
        if (e.target === modal) modal.style.display = 'none';
    });

    function updateEscrowDisplay() {
        const balanceEl = document.getElementById('escrowBalanceDisplay');
        if (balanceEl) {
            balanceEl.textContent = formatPrice(getEscrowBalance());
        }
    }
    updateEscrowDisplay();

    const ordersContainer = document.getElementById('ordersList');
    if (ordersContainer) {
        const orders = getOrders();
        if (orders.length === 0) {
            ordersContainer.innerHTML = '<p class="no-orders">Belum ada transaksi escrow.</p>';
        } else {
            ordersContainer.innerHTML = orders.map(o => `
                <div class="order-card">
                    <div class="order-header">
                        <strong>${o.productName}</strong>
                        <span class="order-status ${o.status.toLowerCase().replace(/\s/g, '-')}">${o.status}</span>
                    </div>
                    <div class="order-body">
                        <p><i class="fas fa-user"></i> ${o.buyer}</p>
                        <p><i class="fas fa-money-bill"></i> ${formatPrice(o.price)}</p>
                        <p><i class="fas fa-calendar"></i> ${new Date(o.date).toLocaleDateString('id-ID')}</p>
                    </div>
                    <div class="order-actions">
                        <button class="btn btn-success btn-sm confirm-order" data-id="${o.id}"><i class="fas fa-check"></i> Konfirmasi</button>
                        <button class="btn btn-danger btn-sm cancel-order" data-id="${o.id}"><i class="fas fa-times"></i> Batalkan</button>
                    </div>
                </div>
            `).join('');
        }
    }

    document.addEventListener('click', function(e) {
        const confirmBtn = e.target.closest('.confirm-order');
        if (confirmBtn) {
            const orderId = confirmBtn.dataset.id;
            let orders = getOrders();
            const order = orders.find(o => o.id === orderId);
            if (order) {
                order.status = 'Selesai';
                saveOrders(orders);
                alert('Pesanan dikonfirmasi! Dana escrow akan dirilis ke penjual.');
                location.reload();
            }
        }
    });

    document.addEventListener('click', function(e) {
        const cancelBtn = e.target.closest('.cancel-order');
        if (cancelBtn) {
            const orderId = cancelBtn.dataset.id;
            let orders = getOrders();
            const order = orders.find(o => o.id === orderId);
            if (order) {
                const balance = getEscrowBalance();
                setEscrowBalance(balance - order.price);
                orders = orders.filter(o => o.id !== orderId);
                saveOrders(orders);
                alert('Pesanan dibatalkan. Dana dikembalikan.');
                location.reload();
            }
        }
    });

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const productId = document.getElementById('reviewProductId').value;
            const userName = document.getElementById('reviewName').value;
            const rating = parseInt(document.getElementById('reviewRating').value);
            const text = document.getElementById('reviewText').value;

            const allProducts = getProducts();
            const product = allProducts.find(p => p.id === productId);
            if (product) {
                if (!product.reviews) product.reviews = [];
                product.reviews.push({ user: userName, text, rating });
                const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
                product.rating = Math.round((totalRating / product.reviews.length) * 10) / 10;
                saveProducts(allProducts);
                alert('Review berhasil dikirim! Terima kasih.');
                reviewForm.reset();
                location.reload();
            }
        });
    }
});
