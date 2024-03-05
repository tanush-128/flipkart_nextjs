import { Product } from "@prisma/client";
import { create } from "zustand";
import { RemoveItemFromCart } from "./actions/actions";

interface ProductWithQuantity extends Product {
  quantity: number;
}

interface CartStore {
  products: ProductWithQuantity[];

  setProducts: (products: ProductWithQuantity[]) => void;
  increaseProductQuantity: (i: number) => void;
  decreaseProductQuantity: (i: number) => void;
  setProductQuantity: (i: number, quantity: number) => void;
  removeProduct: (i: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  increaseProductQuantity: (i: number) =>
    set((state) => {
      const products = [...state.products];
      products[i]!.quantity += 1;
      return { products };
    }),
  decreaseProductQuantity: (i: number) =>
    set((state) => {
      const products = [...state.products];
      products[i]!.quantity -= 1;
      return { products };
    }),
  setProductQuantity: (i: number, quantity: number) =>
    set((state) => {
      const products = [...state.products];
      products[i]!.quantity = quantity;
      return { products };
    }),

  removeProduct: (i: number) => {
    set((state) => {
      const products = [...state.products];
      products.splice(i, 1);
      return { products };
    });
  },
}));
