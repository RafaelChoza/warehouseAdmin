import { useEffect, useState } from "react";
import type { OrderType } from "../Types";
import setOrderCompleted from "../service/setOrderCompleted";
import deleteOrder from "../service/deleteOrder";
import { useOrdersState } from "../store/ShopState";
import UpdateOrderModal from "./UpdateOrderModal";

export default function Orders() {
  const orders = useOrdersState(state => state.orders)
  const fetchOrders = useOrdersState(state => state.fetchOrders)
  const setSelectedOrder = useOrdersState(state => state.setSelectedOrder)
  const [loadingOrderId, setLoadingOrderId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders()
  }, []);

  const handleSetOrderCompleted = async (orderId: OrderType["id"]) => {
    setLoadingOrderId(Number(orderId));
    try {
      await setOrderCompleted(Number(orderId))
      fetchOrders()
    } catch (error) {
      console.error("Error al marcar la orden como completada")
    } finally {
      setLoadingOrderId(null);
    }
  }

  const handleDeleteOrder = async (id: OrderType["id"]) => {
    try {
      await deleteOrder(id)
      fetchOrders()
    } catch (error) {

    }
  }

  return (
    <div className="relative min-h-screen p-6 bg-gradient-to-br from-white via-orange-50 to-yellow-100">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Órdenes para Surtir</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">Cargando órdenes...</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-400"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Orden #{order.id}</h2>
              <p className="text-sm text-gray-600 mb-4">
                Estado:{" "}
                <span
                  className={`font-medium ${order.delivered ? "text-green-600" : "text-yellow-600"
                    }`}
                >
                  {order.delivered ? "Entregada" : "Pendiente"}
                </span>
              </p>

              <p>Solicitante: {order.user.firstName} {order.user.lastName}</p>
              <p>Solicitada el: {order.createdAt}</p>

              <ul className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="py-2 flex justify-between">
                    <div>
                      <p className="text-gray-800 font-medium">{item.product.name}</p>
                      <p className="text-gray-500 text-sm">
                        {item.quantity} unidades para máquina {item.forMachine}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                className="border-green-950 border-2 bg-orange-500 text-white rounded-3xl px-3 py-3 hover:scale-105 hover:bg-orange-700 flex items-center gap-2 disabled:opacity-50"
                disabled={loadingOrderId === order.id}
                onClick={() => {
                  if (order.id !== undefined) {
                    handleSetOrderCompleted(Number(order.id));
                  }
                }}
              >
                {loadingOrderId === order.id ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"></path>
                  </svg>
                ) : (
                  "Marcar como Surtida"
                )}
              </button>

              <button
                className="border-green-900 border-2 bg-green-600 text-white rounded-3xl px-3 py-2 mx-3 hover:scale-95 hover:bg-green-800"
                onClick={() => setSelectedOrder(order)}
              >
                Actualizar Cantidades
              </button>
              <button
                className="border-green-900 border-2 bg-red-600 text-white rounded-3xl px-3 py-2 mx-3 hover:scale-105 hover:bg-red-700"
                onClick={() => handleDeleteOrder(Number(order.id))}
              >
                Borrar Orden
              </button>
            </div>
          ))}
        </div>
      )}
      <div>
        <UpdateOrderModal />
      </div>
    </div>
  );
}
