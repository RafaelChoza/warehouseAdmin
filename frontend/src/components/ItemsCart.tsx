import { useEffect } from "react";
import { useCart } from "../components/CartContext";
import deleteItem from "../service/deleteItem";
import updateQuantityService from "../service/updateQuantity";


export default function ItemsCart() {
  const { cart, fetchCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteItem(id);
      await fetchCart(); // Actualiza el estado del carrito después de eliminar el item
    } catch (error) {
      console.error('Error eliminando item:', error);
    }
  };

  const handleUpdateQuantity = async (id: number, action: "increase" | "decrease") => {
    const success = await updateQuantityService(id, action);
    if (success) {
      await fetchCart();
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
              {cart.items.map(item => (
                <tr key={item.id} className="border-t hover:bg-orange-50 transition">
                  <td className="px-4 py-2">{item.product.id}</td>
                  <td className="px-4 py-2">{item.product.name}</td>
                  <td className="px-4 py-2">{item.product.description}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleUpdateQuantity(Number(item.id), "increase")}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleUpdateQuantity(Number(item.id), "decrease")}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleDeleteItem(Number(item.id))}
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
