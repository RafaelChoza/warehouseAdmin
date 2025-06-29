import { useEffect, useState } from "react";
import getActiveCart from "../service/getActiveCart";
import type { CartType } from "../Types";

export default function ItemsCart() {
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

  const token = localStorage.getItem("token");

  const updateQuantity = async (id: number, action: "increase" | "decrease") => {
    try {
      const response = await fetch(`http://localhost:8080/cartItem${action === "increase" ? "Increase" : "Decrease"}/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("No se pudo actualizar la cantidad");
      await fetchCart();
    } catch (error) {
      console.error("Error actualizando cantidad:", error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/cartItem/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("No se pudo eliminar el producto del carrito");
      await fetchCart();
    } catch (error) {
      console.error("Error eliminando item:", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white via-orange-50 to-yellow-100 min-h-screen">
      <h2 className="text-3xl font-bold text-orange-600 mb-6">Carrito</h2>
      {!cart ? (
        <p className="text-gray-500">Cargando carrito...</p>
      ) : cart.items.length === 0 ? (
        <p className="text-gray-500">El carrito está vacío.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-orange-100 text-orange-800 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3">Cantidad</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id} className="border-t hover:bg-orange-50 transition">
                  <td className="px-4 py-2">{item.product.id}</td>
                  <td className="px-4 py-2">{item.product.name}</td>
                  <td className="px-4 py-2">{item.product.description}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      +
                    </button>
                    <button
                      
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      -
                    </button>
                    <button
                      
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
