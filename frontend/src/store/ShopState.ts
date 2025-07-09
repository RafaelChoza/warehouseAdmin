import { create } from "zustand";
import type { CartTypeWithMachine, ProductType } from "../Types";
import fetchProducts from "../service/fetchProducts";

type ShopState = {
  idMachineByProductId: Record<number, string>;
  setIdMachineForProduct: (id: number, value: string) => void;
  order: CartTypeWithMachine[];
  setOrder: (order: CartTypeWithMachine[]) => void;
  products: ProductType[];
  fetchProducts: () => void;
};


export const useShopStore = create<ShopState>((set) => ({
  idMachineByProductId: {},
  setIdMachineForProduct: (id, value) =>
    set((state) => ({
      idMachineByProductId: { ...state.idMachineByProductId, [id]: value },
    })),
  order: [],
  setOrder: (order) => set({ order }),
  products: [],
  fetchProducts: async () => {
    try {
      const data = await fetchProducts();
      set({products: data})
    } catch (error) {
      console.error("Error al obtener productos", error);
    }
  }
}));

  