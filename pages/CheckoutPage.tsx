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

  // Generate order details string for the hidden field
  const generateOrderDetails = () => {
    return items
      .map(
        (item) =>
          `${item.name} (${item.category}) x${item.quantity} - $${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join('\n') + `\n\nSubtotal: $${getSubtotal().toFixed(2)}`;
  };

  // Update hidden field whenever items change
  useEffect(() => {
    if (orderDetailsRef.current) {
      orderDetailsRef.current.value = generateOrderDetails();
    }
  }, [items]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/');
    }
  }, [items, navigate]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-obsidian pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-stone-light hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
              <ShoppingBag className="text-platinum" />
              Order Summary
            </h2>

            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-obsidian-light rounded-xl border border-white/5"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-obsidian-highlight flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-display font-medium">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-light uppercase tracking-wider">
                      {item.category}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-white/60">Qty: {item.quantity}</span>
                      <span className="text-platinum font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="bg-obsidian-light rounded-xl p-6 border border-white/5 space-y-3">
              <div className="flex justify-between text-stone-light">
                <span>Subtotal</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-light">
                <span>Shipping</span>
                <span className="text-ice-400">Calculated after order</span>
              </div>
              <div className="h-px bg-white/10 my-4" />
              <div className="flex justify-between text-white text-xl font-display font-bold">
                <span>Total</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-display font-bold text-white mb-6">
              Your Information
            </h2>

            <form
              name="order"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              action="/success"
              className="space-y-6"
            >
              {/* Netlify Form Handling */}
              <input type="hidden" name="form-name" value="order" />
              <p className="hidden">
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>
              
              {/* Hidden Order Details */}
              <textarea
                ref={orderDetailsRef}
                name="order_details"
                defaultValue={generateOrderDetails()}
                className="hidden"
                aria-hidden="true"
              />

              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-stone-light text-sm mb-2">
                  <User size={14} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-obsidian-light rounded-xl border border-white/10 text-white placeholder-white/30 focus:border-platinum focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-stone-light text-sm mb-2">
                  <Mail size={14} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-obsidian-light rounded-xl border border-white/10 text-white placeholder-white/30 focus:border-platinum focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-stone-light text-sm mb-2">
                  <Phone size={14} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-obsidian-light rounded-xl border border-white/10 text-white placeholder-white/30 focus:border-platinum focus:outline-none transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center gap-2 text-stone-light text-sm mb-2">
                  <MapPin size={14} />
                  Shipping Address
                </label>
                <textarea
                  name="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-obsidian-light rounded-xl border border-white/10 text-white placeholder-white/30 focus:border-platinum focus:outline-none transition-colors resize-none"
                  placeholder="123 Main St, City, State 12345"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-platinum text-obsidian font-bold rounded-full hover:bg-white transition-all uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(228,228,231,0.3)] hover:shadow-[0_0_40px_rgba(228,228,231,0.4)]"
              >
                Place Order
              </button>

              <p className="text-center text-white/40 text-sm">
                You'll receive an email confirmation and we'll reach out to finalize payment.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
