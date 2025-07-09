import { useEffect, useState } from "react"
import getClosedOrders from "../service/getClosedOrders"
import type { ClosedOrderType } from "../Types"

export default function ClosedOrders() {
  const [closedOrders, setClosedOrders] = useState<ClosedOrderType[]>([])

  useEffect(() => {
    getClosedOrders().then(data => {
      if (data) {
        setClosedOrders(data)
        console.log("datos de closedOrders", data)
      }
    })
  }, [])

  return (
    <div className="relative min-h-screen p-6 bg-gradient-to-br from-white via-orange-50 to-yellow-100">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Órdenes Cerradas</h1>

      {closedOrders.length === 0 ? (
        <p className="text-gray-500">Cargando órdenes cerradas...</p>
      ) : (
        <div className="space-y-6">
          {closedOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-400"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Orden #{order.originalOrderId}</h2>
              <p className="text-sm text-gray-600 mb-4">
                Usuario: <span className="font-medium text-gray-900">
                  {order.user.firstName} {order.user.lastName} ({order.user.email})
                </span>
              </p>

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
  )
}
