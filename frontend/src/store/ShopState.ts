import { create } from "zustand";
import type { CartTypeWithMachine, OrderType, ProductType } from "../Types";
import fetchProducts from "../service/fetchProducts";
import getOrders from "../service/getOrders";

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

type OrdersState = {
  orders: OrderType[],
  fetchOrders: () => void,
}

export const useOrdersState = create<OrdersState>((set) => ({
  orders: [],
  fetchOrders: async () => {
    try {
      const data = await getOrders();
      set({orders: data})
    } catch (error) {
      console.error("Error al obtener orders", error)
    }
  }
}))

  