// Main Interactivity for Cold Front Calls
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const navInner = document.getElementById('nav-inner');

    // Scroll handling for Navigation
    const handleScroll = () => {
        if (navInner) {
            if (window.scrollY > 20) {
                navInner.classList.add('nav-scrolled');
            } else {
                navInner.classList.remove('nav-scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (!mobileMenu.classList.contains('hidden')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'unset';
        });
    }

    // Cart Logic Initialization
    const updateCartCount = () => {
        const cartCountEl = document.getElementById('cart-count');
        if (cartCountEl) {
            const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
            const count = cartItems.length;
            if (count > 0) {
                cartCountEl.textContent = count;
                cartCountEl.classList.remove('hidden');
            } else {
                cartCountEl.classList.add('hidden');
            }
        }
    };

    // Hero Slideshow Logic
    const slideshow = document.getElementById('hero-slideshow');
    if (slideshow) {
        const imgs = slideshow.querySelectorAll('.slideshow-img');
        let currentIdx = 0;

        setInterval(() => {
            imgs[currentIdx].classList.remove('active');
            imgs[currentIdx].style.opacity = '0';
            imgs[currentIdx].style.transition = 'opacity 2s ease-in-out';

            currentIdx = (currentIdx + 1) % imgs.length;

            imgs[currentIdx].classList.add('active');
            imgs[currentIdx].style.opacity = '1';
            imgs[currentIdx].style.transition = 'opacity 2s ease-in-out';
        }, 8000);
    }

    updateCartCount();

    // Listen for storage changes (for multiple tabs or manual updates)
    window.addEventListener('storage', (e) => {
        if (e.key === 'cart') {
            updateCartCount();
        }
    });
});
