import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  onCheckout,
}) => {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-obsidian-light border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-platinum" size={24} />
                <h2 className="text-2xl font-display font-bold text-white">
                  Your Cart
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-stone-light hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="text-white/20 mb-4" size={64} />
                  <p className="text-stone-light text-lg">Your cart is empty</p>
                  <p className="text-white/40 text-sm mt-2">
                    Add some calls to get started
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 p-4 bg-obsidian rounded-xl border border-white/5"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-obsidian-highlight flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-display font-medium truncate">
                        {item.name}
                      </h3>
                      <p className="text-platinum text-sm font-bold mt-1">
                        ${item.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-white font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-full hover:bg-red-500/20 transition-colors text-stone-light hover:text-red-400 self-start"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-stone-light text-lg">Subtotal</span>
                  <span className="text-white font-display font-bold text-2xl">
                    ${getSubtotal().toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={onCheckout}
                  className="w-full py-4 bg-platinum text-obsidian font-bold rounded-full hover:bg-white transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(228,228,231,0.2)]"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
