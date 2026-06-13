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

function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="product-condition ${product.condition.toLowerCase().replace(/\s/g, '-')}">${product.condition}</span>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
                <div class="product-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${product.location}</span>
                    <span><i class="far fa-clock"></i> ${getRelativeTime(product.date)}</span>
                </div>
                <p class="product-desc">${product.description.substring(0, 80)}${product.description.length > 80 ? '...' : ''}</p>
                <a href="https://wa.me/${product.contact}?text=Halo%20Kak,%20saya%20tertarik%20dengan%20${encodeURIComponent(product.name)}%20dari%20KosDeal" target="_blank" class="btn btn-whatsapp btn-sm">
                    <i class="fab fa-whatsapp"></i> Chat via WA
                </a>
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

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

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

        if (categoryFilter) {
            filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
        }

        renderProducts(filteredProducts, 'allProducts');

        const searchInput = document.getElementById('searchInput');
        const categorySelect = document.getElementById('categoryFilter');
        const sortSelect = document.getElementById('sortFilter');

        if (categoryFilter && categorySelect) {
            categorySelect.value = categoryFilter;
        }

        function filterAndSort() {
            let result = [...products];
            const search = (searchInput ? searchInput.value : '').toLowerCase();
            const category = categorySelect ? categorySelect.value : '';
            const sort = sortSelect ? sortSelect.value : 'newest';

            if (search) {
                result = result.filter(p =>
                    p.name.toLowerCase().includes(search) ||
                    p.description.toLowerCase().includes(search) ||
                    p.location.toLowerCase().includes(search)
                );
            }

            if (category) {
                result = result.filter(p => p.category === category);
            }

            switch (sort) {
                case 'newest':
                    result.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                case 'oldest':
                    result.sort((a, b) => new Date(a.date) - new Date(b.date));
                    break;
                case 'cheapest':
                    result.sort((a, b) => a.price - b.price);
                    break;
                case 'expensive':
                    result.sort((a, b) => b.price - a.price);
                    break;
            }

            renderProducts(result, 'allProducts');
        }

        if (searchInput) searchInput.addEventListener('input', filterAndSort);
        if (categorySelect) categorySelect.addEventListener('change', filterAndSort);
        if (sortSelect) sortSelect.addEventListener('change', filterAndSort);
    }

    const form = document.getElementById('addProductForm');
    if (form) {
        const imageUpload = document.getElementById('imageUpload');
        const imageInput = document.getElementById('productImage');
        const imagePreview = document.getElementById('imagePreview');
        const previewImg = document.getElementById('previewImg');
        const removeImageBtn = document.getElementById('removeImage');

        imageUpload.addEventListener('click', function() {
            imageInput.click();
        });

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
            if (file && file.type.startsWith('image/')) {
                handleImage(file);
            }
        });

        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                handleImage(this.files[0]);
            }
        });

        function handleImage(file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Ukuran foto maksimal 5MB!');
                return;
            }
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
            const contact = document.getElementById('productContact').value;
            const description = document.getElementById('productDescription').value;
            const image = previewImg.src || 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&q=80';

            const newProduct = {
                id: 'p' + Date.now(),
                name,
                category,
                price,
                condition,
                location,
                contact,
                description,
                image,
                date: new Date().toISOString().split('T')[0]
            };

            const allProducts = getProducts();
            allProducts.unshift(newProduct);
            saveProducts(allProducts);

            alert('Barang berhasil diupload! 🎉');
            window.location.href = 'products.html';
        });
    }
});
