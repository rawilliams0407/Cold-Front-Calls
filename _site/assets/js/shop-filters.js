// Shop Filtering Logic
const initFilters = () => {
    const categoryFilter = document.getElementById('category-filter');
    const productsGrid = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-state');
    const productCount = document.getElementById('product-count');
    const resetBtn = document.getElementById('reset-filters');

    if (!productsGrid) return;

    const cards = Array.from(productsGrid.querySelectorAll('.product-card'));

    const filterProducts = (val) => {
        const categoryVal = (val || (categoryFilter ? categoryFilter.value : 'all')).toLowerCase();
        let visibleCount = 0;

        cards.forEach(card => {
            const productCategories = (card.getAttribute('data-category') || '').toLowerCase();
            const categoriesArr = productCategories.split(' ').map(c => c.trim()).filter(c => c);

            const categoryMatch = categoryVal === 'all' || categoriesArr.includes(categoryVal);

            if (categoryMatch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (productCount) productCount.textContent = visibleCount;
        if (emptyState && productsGrid) {
            if (visibleCount === 0) {
                emptyState.classList.remove('hidden');
                productsGrid.classList.add('hidden');
            } else {
                emptyState.classList.add('hidden');
                productsGrid.classList.remove('hidden');
            }
        }
    };

    const updateURL = (val) => {
        const url = new URL(window.location);
        if (val === 'all') {
            url.searchParams.delete('category');
        } else {
            url.searchParams.set('category', val);
        }
        window.history.replaceState({ category: val }, '', url);
    };

    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            filterProducts(categoryFilter.value);
            updateURL(categoryFilter.value);
        });
    }

    if (resetBtn && categoryFilter) {
        resetBtn.addEventListener('click', () => {
            categoryFilter.value = 'all';
            filterProducts('all');
            updateURL('all');
        });
    }

    window.addEventListener('popstate', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const cat = urlParams.get('category') || 'all';
        if (categoryFilter) {
            categoryFilter.value = cat.toLowerCase();
            filterProducts(cat);
        }
    });

    // Apply filter from URL on page load
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');

    if (catParam && categoryFilter) {
        const normalizedParam = catParam.toLowerCase().trim();

        for (let opt of categoryFilter.options) {
            if (opt.value.toLowerCase() === normalizedParam) {
                categoryFilter.value = opt.value;
                filterProducts(categoryFilter.value);
                return;
            }
        }
    }

    filterProducts('all');
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFilters);
} else {
    initFilters();
}
