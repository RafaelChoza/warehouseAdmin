import { create } from "zustand";
import type { CartTypeWithMachine } from "../Types";

type ShopState = {
  idMachineByProductId: Record<number, string>;
  setIdMachineForProduct: (id: number, value: string) => void;
  order: CartTypeWithMachine[];
  setOrder: (order: CartTypeWithMachine[]) => void;
};


export const useShopStore = create<ShopState>((set) => ({
  idMachineByProductId: {},
  setIdMachineForProduct: (id, value) =>
    set((state) => ({
      idMachineByProductId: { ...state.idMachineByProductId, [id]: value },
    })),
  order: [],
  setOrder: (order) => set({ order }),
}));

  