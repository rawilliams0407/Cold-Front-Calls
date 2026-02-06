import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  isUpsellOpen: boolean;
  upsellCategory: 'duck' | 'goose' | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
  setCartOpen: (isOpen: boolean) => void;
  setUpsellOpen: (isOpen: boolean) => void;
  handleCheckout: (navigate: (path: string) => void) => void;
  checkUpsellOpportunity: () => 'duck' | 'goose' | null;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      isUpsellOpen: false,
      upsellCategory: null,

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              isCartOpen: true, // Auto-open cart on add
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
            isCartOpen: true, // Auto-open cart on add
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

      setUpsellOpen: (isOpen) => set({ isUpsellOpen: isOpen }),

      handleCheckout: (navigate) => {
        const upsell = get().checkUpsellOpportunity();
        if (upsell) {
          set({
            upsellCategory: upsell,
            isUpsellOpen: true,
            isCartOpen: false
          });
        } else {
          navigate('/checkout');
        }
      },

      checkUpsellOpportunity: () => {
        const items = get().items;
        const hasDuck = items.some(
          (item) => item.category.toLowerCase().includes('duck')
        );
        const hasGoose = items.some(
          (item) => item.category.toLowerCase().includes('goose')
        );

        // If has Duck but no Goose, suggest Goose
        if (hasDuck && !hasGoose) {
          return 'goose';
        }
        // If has Goose but no Duck, suggest Duck
        if (hasGoose && !hasDuck) {
          return 'duck';
        }
        // No upsell opportunity
        return null;
      },
    }),
    {
      name: 'coldfront-cart',
      // Only persist items, not UI state
      partialize: (state) => ({ items: state.items }),
    }
  )
);
