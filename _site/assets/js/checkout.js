// Checkout Page Logic
document.addEventListener('DOMContentLoaded', () => {
    const checkoutCartItems = document.getElementById('checkout-cart-items');
    const checkoutTotal = document.getElementById('checkout-total');
    const checkoutForm = document.getElementById('checkout-form');
    const orderDetailsField = document.getElementById('order-details-field');
    const submitBtn = document.getElementById('submit-order');

    if (!checkoutForm) return;

    const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');

    const renderCheckoutCart = () => {
        const cart = getCart();
        if (cart.length === 0) {
            checkoutCartItems.innerHTML = '<p class="text-stone-light italic">Your cart is empty.</p>';
            checkoutTotal.textContent = '$0.00';
            submitBtn.disabled = true;
            return;
        }

        submitBtn.disabled = false;

        // Group items to show quantities
        const grouped = cart.reduce((acc, item) => {
            acc[item.title] = acc[item.title] || { ...item, quantity: 0 };
            acc[item.title].quantity++;
            return acc;
        }, {});

        checkoutCartItems.innerHTML = Object.values(grouped).map(item => `
            <div class="flex justify-between items-center text-platinum">
                <div class="flex items-center gap-3">
                    <span class="text-xs text-stone-light">${item.quantity}x</span>
                    <span class="text-sm font-medium">${item.title}</span>
                </div>
                <span class="text-sm font-bold text-ice-400">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
        checkoutTotal.textContent = `$${total.toFixed(2)}`;
    };

    renderCheckoutCart();

    // Handle Form Submission
    checkoutForm.addEventListener('submit', (e) => {
        const cart = getCart();
        if (cart.length === 0) {
            e.preventDefault();
            alert('Your cart is empty.');
            return;
        }

        // Format order details for the hidden field
        const grouped = cart.reduce((acc, item) => {
            acc[item.title] = acc[item.title] || { price: item.price, quantity: 0 };
            acc[item.title].quantity++;
            return acc;
        }, {});

        const orderString = Object.entries(grouped)
            .map(([title, data]) => `${data.quantity}x ${title} - $${(data.price * data.quantity).toFixed(2)}`)
            .join('\n');

        const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
        const finalDetails = `ORDER SUMMARY:\n${orderString}\n\nTOTAL: $${total.toFixed(2)}`;

        orderDetailsField.value = finalDetails;

        // Clear cart after a slight delay to allow form submission to capture data
        // Note: Netlify will redirect, but we want the cart empty for when they return.
        setTimeout(() => {
            localStorage.removeItem('cart');
        }, 100);
    });
});
