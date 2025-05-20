// lib/store/wishlist.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCartStore } from "@/lib/store";

interface WishlistStore {
  items: string[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  moveToCart: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId) => {
        if (!get().items.includes(productId)) {
          set({ items: [...get().items, productId] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((id) => id !== productId) });
      },
      moveToCart: (productId) => {
        useCartStore.getState().addItem(productId);
        get().removeItem(productId);
      },
      clearWishlist: () => set({ items: [] }),
      isInWishlist: (productId) => get().items.includes(productId),
    }),
    {
      name: "wishlist-storage",
    }
  )
);
