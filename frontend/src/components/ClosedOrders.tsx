import { useEffect, useState } from "react";
import getClosedOrders from "../service/getClosedOrders";
import type { ClosedOrderType } from "../Types";

export default function ClosedOrders() {
  const [closedOrders, setClosedOrders] = useState<ClosedOrderType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getClosedOrders().then(data => {
      if (data) {
        setClosedOrders(data);
        console.log("datos de closedOrders", data);
      }
    });
  }, []);

  const clearSearchInput = () => {
    setSearchTerm("")
  }

  const searchOrder = closedOrders.filter(order =>
  order.createdAt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  order.user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  order.user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  order.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  order.originalOrderId.toString().includes(searchTerm.toLowerCase()) ||
  order.items.some(item =>
    item.product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.forMachine?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product.mro?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product.vendor?.toLowerCase().includes(searchTerm.toLowerCase())
  )
);


  return (
    <div className="relative min-h-screen p-6 bg-gradient-to-br from-white via-orange-50 to-yellow-100">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Órdenes Cerradas</h1>

      <input
        type="text"
        placeholder="Buscar por ID, Fecha, Producto, Máquina..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 px-4 py-2 border border-orange-300 rounded shadow-sm w-full max-w-md focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button onClick={clearSearchInput} className="mx-3 bg-amber-500 text-white font-bold p-2 rounded-2xl hover:bg-amber-700 hover:scale-95">
        Limpiar
      </button>
      {searchOrder.length === 0 ? (
        <p className="text-gray-500">No se encontraron órdenes cerradas.</p>
      ) : (
        <div className="space-y-6">
          {searchOrder.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-400"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Orden #{order.originalOrderId}
              </h2>
              <div className="text-sm text-gray-600 mb-4">
                <p>
                  <strong>Usuario:</strong>{" "}
                  <span className="text-gray-900">
                    {order.user.firstName} {order.user.lastName} ({order.user.email})
                  </span>
                </p>
                <p>
                  <strong>Cerrada el:</strong> {order.createdAt}
                </p>
              </div>

              <ul className="divide-y divide-gray-200">
                {order.items.map(item => (
                  <li key={item.id} className="py-2">
                    <p className="text-gray-800 font-medium">{item.product.name}</p>
                    <p className="text-gray-500 text-sm">
                      {item.quantity} unidades para máquina {item.forMachine}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
