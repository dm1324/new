import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState, CartItem } from './types';
import { products } from './data';

interface CartStore extends CartState {
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (productId) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.productId === productId);
        
        if (existingItem) {
          const updatedItems = currentItems.map(item =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          const total = calculateTotal(updatedItems);
          set({ items: updatedItems, total });
        } else {
          const updatedItems = [...currentItems, { productId, quantity: 1 }];
          const total = calculateTotal(updatedItems);
          set({ items: updatedItems, total });
        }
      },
      removeItem: (productId) => {
        const updatedItems = get().items.filter(item => item.productId !== productId);
        const total = calculateTotal(updatedItems);
        set({ items: updatedItems, total });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }
        
        const updatedItems = get().items.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        );
        const total = calculateTotal(updatedItems);
        set({ items: updatedItems, total });
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return total;
    
    const price = product.discount
      ? product.price * (1 - product.discount / 100)
      : product.price;
    
    return total + price * item.quantity;
  }, 0);
}