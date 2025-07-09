import { useEffect, useState } from "react";
import type { OrderType } from "../Types";
import getOrders from "../service/getOrders";
import setOrderCompleted from "../service/setOrderCompleted";

export default function Orders() {
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const allOrders = await getOrders();
      console.log(allOrders)
      if (allOrders) {
        const normalized = allOrders.map((order: any) => ({
          ...order,
          orderItem: order.items ?? [],
        }));
        setOrders(normalized);
      }
    };

    fetchOrders();
  }, []);

  const handleSetOrderCompleted = async (orderId: OrderType["id"]) => {
    try {
      await setOrderCompleted(Number(orderId))
    } catch (error) {
      console.error("Error al marcar la orden como completada")
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
                className="border-green-950 border-2 bg-orange-500 text-white rounded-3xl px-3 py-3 hover:scale-105 hover:bg-orange-700"
                onClick={() => {
                  if (order.id !== undefined) {
                    handleSetOrderCompleted(Number(order.id));
                  }
                }}

              >Marcar como Surtida</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
