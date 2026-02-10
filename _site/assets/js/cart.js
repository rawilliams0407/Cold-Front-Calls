// Cart & Upsell Logic
const DEFAULT_UPSELLS = {
    duck: {
        id: 'down-draft',
        name: "Down Draft",
        price: 149.99,
        image: "/assets/products/down-draft-enhanced.png",
        category: "Duck"
    },
    goose: {
        id: 'perfect-storm',
        name: "Perfect Storm",
        price: 189.99,
        image: "/assets/products/perfect-storm-enhanced.png",
        category: "Goose"
    }
};

const UPSELL_PRODUCTS = {
    duck: (window.COLD_FRONT_UPSELLS && window.COLD_FRONT_UPSELLS.duck) ? window.COLD_FRONT_UPSELLS.duck : DEFAULT_UPSELLS.duck,
    goose: (window.COLD_FRONT_UPSELLS && window.COLD_FRONT_UPSELLS.goose) ? window.COLD_FRONT_UPSELLS.goose : DEFAULT_UPSELLS.goose
};

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const cartToggle = document.getElementById('cart-toggle');
    const cartCountEl = document.getElementById('cart-count');
    const cartSidebarWrapper = document.getElementById('cart-sidebar-wrapper');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartEmptyState = document.getElementById('cart-empty-state');
    const cartFooter = document.getElementById('cart-footer');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const checkoutBtn = document.getElementById('cart-checkout-btn');

    const upsellWrapper = document.getElementById('upsell-modal-wrapper');
    const upsellModal = document.getElementById('upsell-modal');
    const upsellBackdrop = document.getElementById('upsell-backdrop');
    const closeUpsellBtn = document.getElementById('close-upsell');
    const acceptUpsellBtn = document.getElementById('accept-upsell');
    const declineUpsellBtn = document.getElementById('decline-upsell');

    let currentUpsellProduct = null;
    let hasShownUpsell = false;

    // --- Core Cart Functions ---

    const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');

    const saveCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateUI();
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
    };

    const addToCart = (product) => {
        const cart = getCart();
        // Check if item already exists by title
        const existing = cart.find(item => item.title === product.title);
        if (existing) {
            // In the simple array cart, we just push another one or handle qty
            // Let's stick to the array of items for now as expected by checkout.js
            cart.push(product);
        } else {
            cart.push(product);
        }
        saveCart(cart);
        openCart();
    };

    const removeFromCart = (index) => {
        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
    };

    const updateUI = () => {
        const cart = getCart();

        // Update Nav Count
        if (cartCountEl) {
            cartCountEl.textContent = cart.length;
            if (cart.length > 0) {
                cartCountEl.classList.remove('hidden');
            } else {
                cartCountEl.classList.add('hidden');
            }
        }

        // Update Sidebar
        if (cart.length === 0) {
            cartEmptyState.classList.remove('hidden');
            cartItemsList.classList.add('hidden');
            cartFooter.classList.add('hidden');
        } else {
            cartEmptyState.classList.add('hidden');
            cartItemsList.classList.remove('hidden');
            cartFooter.classList.remove('hidden');

            const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
            cartSubtotalEl.textContent = `$${total.toFixed(2)}`;

            cartItemsList.innerHTML = cart.map((item, index) => `
                <div class="flex gap-4 p-4 bg-obsidian rounded-xl border border-white/5">
                    <div class="w-16 h-16 rounded-lg overflow-hidden bg-obsidian-highlight flex-shrink-0">
                        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="text-white font-display font-medium truncate">${item.title}</h3>
                        <p class="text-platinum text-sm font-bold mt-1">$${parseFloat(item.price).toFixed(2)}</p>
                    </div>
                    <button class="remove-item-btn p-2 rounded-full hover:bg-red-500/20 transition-colors text-stone-light hover:text-red-400" data-index="${index}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
                    </button>
                </div>
            `).join('');

            // Add events to remove buttons
            document.querySelectorAll('.remove-item-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    removeFromCart(parseInt(btn.getAttribute('data-index')));
                });
            });
        }
    };

    // --- UI Controls ---

    const openCart = () => {
        cartSidebarWrapper.classList.remove('hidden');
        setTimeout(() => {
            cartBackdrop.classList.add('opacity-100');
            cartSidebar.classList.remove('translate-x-full');
        }, 10);
    };

    const closeCart = () => {
        cartBackdrop.classList.remove('opacity-100');
        cartSidebar.classList.add('translate-x-full');
        setTimeout(() => {
            cartSidebarWrapper.classList.add('hidden');
        }, 500);
    };

    const openUpsell = (category) => {
        currentUpsellProduct = UPSELL_PRODUCTS[category];
        if (!currentUpsellProduct) return;

        // Populate Modal
        document.getElementById('upsell-image').src = currentUpsellProduct.image;
        document.getElementById('upsell-thumb').src = currentUpsellProduct.image;
        document.getElementById('upsell-title').textContent = currentUpsellProduct.name;
        document.getElementById('upsell-category').textContent = currentUpsellProduct.category;
        document.getElementById('upsell-price').textContent = `$${currentUpsellProduct.price.toFixed(2)}`;
        document.getElementById('upsell-category-label').textContent = category === 'duck' ? 'Duck' : 'Goose';

        upsellWrapper.classList.remove('hidden');
        setTimeout(() => {
            upsellBackdrop.classList.add('opacity-100');
            upsellModal.classList.remove('scale-90', 'opacity-0');
        }, 10);
    };

    const closeUpsell = () => {
        upsellBackdrop.classList.remove('opacity-100');
        upsellModal.classList.add('scale-90', 'opacity-0');
        setTimeout(() => {
            upsellWrapper.classList.add('hidden');
        }, 300);
    };

    const checkUpsellOpportunity = () => {
        const cart = getCart();
        const categories = cart.map(item => (item.category || '').toLowerCase());
        const hasDuck = categories.some(cat => cat.includes('duck'));
        const hasGoose = categories.some(cat => cat.includes('goose'));

        if (hasDuck && !hasGoose) return 'goose';
        if (hasGoose && !hasDuck) return 'duck';
        return null;
    };

    const handleCheckoutFlow = () => {
        const opportunity = checkUpsellOpportunity();
        if (opportunity && !hasShownUpsell) {
            hasShownUpsell = true;
            closeCart();
            setTimeout(() => openUpsell(opportunity), 300);
        } else {
            window.location.href = '/checkout';
        }
    };

    // --- Event Handlers ---

    // Global Add to Cart Delegation
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (btn) {
            const product = {
                id: btn.getAttribute('data-id'),
                title: btn.getAttribute('data-title'),
                price: btn.getAttribute('data-price'),
                image: btn.getAttribute('data-image'),
                category: btn.getAttribute('data-category')
            };
            addToCart(product);
        }
    });

    if (cartToggle) {
        cartToggle.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }

    if (cartBackdrop) {
        cartBackdrop.addEventListener('click', closeCart);
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckoutFlow);
    }

    if (closeUpsellBtn) {
        closeUpsellBtn.addEventListener('click', closeUpsell);
    }

    if (declineUpsellBtn) {
        declineUpsellBtn.addEventListener('click', () => {
            closeUpsell();
            window.location.href = '/checkout';
        });
    }

    if (acceptUpsellBtn) {
        acceptUpsellBtn.addEventListener('click', () => {
            if (currentUpsellProduct) {
                const product = {
                    id: currentUpsellProduct.id,
                    title: currentUpsellProduct.name,
                    price: currentUpsellProduct.price,
                    image: currentUpsellProduct.image,
                    category: currentUpsellProduct.category
                };
                const cart = getCart();
                cart.push(product);
                saveCart(cart);
            }
            closeUpsell();
            window.location.href = '/checkout';
        });
    }

    // Audio Demo Logic
    let currentAudio = null;
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.listen-demo-btn');
        if (btn) {
            const audioUrl = btn.getAttribute('data-audio');
            if (currentAudio) {
                currentAudio.pause();
                if (currentAudio.dataset.src === audioUrl) {
                    currentAudio = null;
                    return;
                }
            }
            currentAudio = new Audio(audioUrl);
            currentAudio.dataset.src = audioUrl;
            currentAudio.play();
        }
    });

    // Initial UI update
    updateUI();
});

