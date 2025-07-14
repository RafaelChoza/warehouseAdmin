import { useEffect, type JSX } from "react";
import { useCart } from "../components/CartContext";
import deleteItem from "../service/deleteItem";
import updateQuantityService from "../service/updateQuantity";
import postIdMachine from "../service/postIdMachine";
import { useShopStore } from "../store/ShopState";
import type { CartTypeWithMachine } from "../Types";
import postOrder from "../service/postOrder";
import { jwtDecode } from "jwt-decode";

interface TokenType {
  userId: number
}


export default function ItemsCart(): JSX.Element {
  const { cart, fetchCart } = useCart();
  const { idMachineByProductId, setIdMachineForProduct, setOrder, fetchProducts } = useShopStore();


  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleDeleteItem = async (id: number): Promise<void> => {
    try {
      await deleteItem(id);
      await fetchCart();
      await fetchProducts();
    } catch (error) {
      console.error('Error eliminando item:', error);
    }
  };

  const handleUpdateQuantity = async (
    id: number,
    action: "increase" | "decrease"
  ): Promise<void> => {
    const success = await updateQuantityService(id, action);
    if (success) {
      await fetchCart();
      fetchProducts();
    }
  };

  const handleAsignMachine = async (id: number, idMachine: string): Promise<void> => {
    try {
      const response = await postIdMachine(id, idMachine);
      if (!response.ok) {
        console.log("Máquina asignada");
      }
    } catch (error) {
      console.error("Error al asignar máquina:", error);
    }
  };

  const handleSendOrder = () => {
    if (!cart) return;

    const formattedOrder: CartTypeWithMachine[] = cart.items.map(item => ({
      ...item,
      idMachine: idMachineByProductId[Number(item.id)] || ""
    }));

    const hasMissingMachines = formattedOrder.some(item => !item.idMachine);

    if (hasMissingMachines) {
      alert("Por favor asigna una máquina a todos los productos antes de enviar la solicitud.");
      return;
    }

    setOrder(formattedOrder);
    console.log("Orden lista para enviar:", formattedOrder);
    try {
      const token = localStorage.getItem("token")
      if (token) {
        console.log(token)
        try {
          const decoded = jwtDecode<TokenType>(token)

          console.log("Token decodificado:", decoded)

          const userId = decoded.userId
          postOrder(userId)
        } catch (error) {
          console.error("No existe token")
        }
      }

    } catch (error) {
      console.error("Error al enviar los datos")
    }

  };

  const handleSubmitOrder = async () => {
  if (!cart) return;

  // Asignar máquinas para cada producto en el carrito
  for (const item of cart.items) {
    const id = Number(item.id);
    const idMachine = idMachineByProductId[id];
    await handleAsignMachine(id, idMachine);
  }

  // Luego enviar la orden
  handleSendOrder();
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
                <th className="px-4 py-3">MRO</th>
                <th className="px-4 py-3">Cantidad</th>
                <th className="px-4 py-3">Asigna a que Máquina</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id} className="border-t hover:bg-orange-50 transition">
                  <td className="px-4 py-2">{item.product.id}</td>
                  <td className="px-4 py-2">{item.product.name}</td>
                  <td className="px-4 py-2">{item.product.description}</td>
                  <td className="px-4 py-2">{item.product.mro}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">
                    <input
                      className="border-2 rounded-2xl px-2 py-1 my-2"
                      type="text"
                      placeholder="Escribe ID Maq.  "
                      value={idMachineByProductId[Number(item.id)] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setIdMachineForProduct(Number(item.id), e.target.value)
                      }
                    />
                  </td>
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
      <div className="flex items-center">
        <button
          className="border-2 rounded-3xl px-3 py-2 bg-amber-600 text-white font-bold my-3 hover:bg-amber-700"
          onClick={handleSubmitOrder}>
          Enviar Solicitud
        </button>
      </div>
    </div>
  );
}
