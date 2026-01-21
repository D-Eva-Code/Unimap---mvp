import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      
      // Action to add item
      addToCart: (product) => set((state) => ({
        cartItems: [...state.cartItems, product]
      })),
      
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'cart-storage', // unique name for the item in local storage
      storage: createJSONStorage(() => localStorage), 
    }
  )
);

export default useCartStore;