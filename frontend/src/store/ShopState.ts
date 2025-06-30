import { create } from "zustand";

type ShopState = {
  idMachine: string;
  setIdMachine: (value: string) => void;
  selectedProductId: number | null;
  setSelectedProductId: (id: number) => void;
};

export const useShopStore = create<ShopState>((set) => ({
  idMachine: '',
  setIdMachine: (value) => set({ idMachine: value }),
  selectedProductId: null,
  setSelectedProductId: (id) => set({ selectedProductId: id }),
}));