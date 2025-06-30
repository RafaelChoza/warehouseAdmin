import { createContext, useContext, useState, useEffect } from "react";
import type { CartType } from "../Types";
import getActiveCart from "../service/getActiveCart";

type CartContextType = {
  cart: CartType | null;
  fetchCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartType | null>(null);

  const fetchCart = async () => {
    try {
      const data = await getActiveCart();
      setCart(data);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
};
