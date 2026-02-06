import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, User, Mail, Phone, MapPin } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCartStore();
  const orderDetailsRef = useRef<HTMLTextAreaElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  // Redirect to home if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/');
    }
  }, [items, navigate]);

  // Format order details for Netlify form
  useEffect(() => {
    if (orderDetailsRef.current) {
      const subtotal = getSubtotal();
      const orderLines = items.map(
        (item) => `${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})`
      );
      orderLines.push(`\nTotal: $${subtotal.toFixed(2)}`);
      orderDetailsRef.current.value = orderLines.join('\n');
    }
  }, [items, getSubtotal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    // Allow form to submit to Netlify
    // Clear cart after submission
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-obsidian text-stone-light font-body">
      {/* Header */}
      <header className="fixed w-full z-50 top-0 bg-obsidian/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-stone-light hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Shop</span>
          </Link>
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-platinum" size={20} />
            <span className="font-display text-xl font-bold text-white">Checkout</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-2xl font-display font-bold text-white mb-6">
                Order Summary
              </h2>
              <div className="bg-obsidian-light rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-obsidian-highlight flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">{item.name}</h3>
                        <p className="text-stone-light text-sm">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-platinum font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 bg-obsidian border-t border-white/10 flex items-center justify-between">
                  <span className="text-lg text-stone-light">Total</span>
                  <span className="text-2xl font-display font-bold text-white">
                    ${getSubtotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-2xl font-display font-bold text-white mb-6">
                Shipping Details
              </h2>
              
              {/* NETLIFY FORM */}
              <form
                name="order-submission"
                method="POST"
                data-netlify="true"
                action="/success"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Required hidden field for Netlify */}
                <input type="hidden" name="form-name" value="order-submission" />
                
                {/* Hidden order details for email notification */}
                <textarea
                  ref={orderDetailsRef}
                  name="order_details"
                  hidden
                  readOnly
                />

                {/* Name */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-light" size={18} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-obsidian-light border border-white/10 rounded-xl text-white placeholder:text-stone-light/50 focus:border-platinum focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-light" size={18} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-obsidian-light border border-white/10 rounded-xl text-white placeholder:text-stone-light/50 focus:border-platinum focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-light" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-obsidian-light border border-white/10 rounded-xl text-white placeholder:text-stone-light/50 focus:border-platinum focus:outline-none transition-colors"
                  />
                </div>

                {/* Shipping Address */}
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-stone-light" size={18} />
                  <textarea
                    name="address"
                    placeholder="Shipping Address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-obsidian-light border border-white/10 rounded-xl text-white placeholder:text-stone-light/50 focus:border-platinum focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-4 bg-platinum text-obsidian font-bold rounded-full hover:bg-white transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(228,228,231,0.2)] hover:scale-[1.02] transition-transform"
                >
                  Place Order
                </button>

                <p className="text-center text-stone-light text-sm">
                  We'll contact you to confirm payment details
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};
