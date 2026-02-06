import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, ShieldCheck, ArrowLeft, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { SEO } from '../components/SEO';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect to shop
  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-display font-bold text-white mb-4">Your cart is empty</h1>
        <Link to="/shop" className="text-platinum hover:text-white transition-colors underline underline-offset-4">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      // Netlify Forms Submission
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearCart();
      navigate('/success');
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-stone-light pt-20 pb-32">
      <SEO title="Checkout" description="Complete your order for premium Cold Front Calls custom waterfowl calls." />
      
      <div className="max-w-6xl mx-auto px-6">
        <Link to="/shop" className="inline-flex items-center gap-2 text-stone-light hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Continue Shopping
        </Link>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-display font-bold text-white mb-8 flex items-center gap-4">
              <Truck className="text-platinum" />
              Shipping Details
            </h1>

            <form 
              name="checkout" 
              method="POST" 
              data-netlify="true" 
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="checkout" />
              {/* Cart Data for Netlify */}
              <input type="hidden" name="cart-items" value={JSON.stringify(items.map(i => `${i.name} (x${i.quantity})`))} />
              <input type="hidden" name="total-amount" value={getSubtotal().toFixed(2)} />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-platinum/60">First Name</label>
                  <input required name="first-name" type="text" className="w-full bg-obsidian-light border border-white/10 rounded-xl px-4 py-3 text-white focus:border-platinum outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-platinum/60">Last Name</label>
                  <input required name="last-name" type="text" className="w-full bg-obsidian-light border border-white/10 rounded-xl px-4 py-3 text-white focus:border-platinum outline-none transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-platinum/60">Email Address</label>
                <input required name="email" type="email" className="w-full bg-obsidian-light border border-white/10 rounded-xl px-4 py-3 text-white focus:border-platinum outline-none transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-platinum/60">Shipping Address</label>
                <input required name="address" type="text" className="w-full bg-obsidian-light border border-white/10 rounded-xl px-4 py-3 text-white focus:border-platinum outline-none transition-colors" />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-platinum/60">City</label>
                  <input required name="city" type="text" className="w-full bg-obsidian-light border border-white/10 rounded-xl px-4 py-3 text-white focus:border-platinum outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-platinum/60">State</label>
                  <input required name="state" type="text" className="w-full bg-obsidian-light border border-white/10 rounded-xl px-4 py-3 text-white focus:border-platinum outline-none transition-colors" />
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 space-y-8">
                <div className="flex items-center gap-4 text-white">
                  <CreditCard className="text-platinum" />
                  <h2 className="text-2xl font-display font-medium">Payment Information</h2>
                </div>
                
                <div className="bg-obsidian-highlight/30 p-6 rounded-2xl border border-white/5 flex items-start gap-4">
                  <ShieldCheck className="text-emerald-500 mt-1 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">
                    This is a secure mock checkout. Clicking "Complete Order" will simulate a transaction and clear your cart for demonstration purposes.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-platinum text-obsidian font-bold rounded-full hover:bg-white transition-all uppercase tracking-[0.2em] text-sm shadow-[0_0_30px_rgba(228,228,231,0.2)] flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Processing Order...'
                  ) : (
                    <>
                      <Send size={18} />
                      Complete Order — ${getSubtotal().toFixed(2)}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32 h-fit"
          >
            <div className="bg-obsidian-light rounded-3xl border border-white/10 p-8 shadow-2xl">
              <h2 className="text-2xl font-display font-bold text-white mb-8 border-b border-white/5 pb-4">Order Summary</h2>
              
              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl bg-obsidian-highlight overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-xs text-stone-light uppercase tracking-wider mt-1">{item.category}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-stone-light">Qty: {item.quantity}</span>
                        <span className="text-platinum font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-400">FREE</span>
                </div>
                <div className="flex justify-between text-2xl font-display font-bold pt-4 border-t border-white/5">
                  <span className="text-white">Total</span>
                  <span className="text-platinum">${getSubtotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
