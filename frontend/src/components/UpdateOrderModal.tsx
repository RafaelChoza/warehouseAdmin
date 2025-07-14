import { useEffect, useState } from "react";
import { useOrdersState } from "../store/ShopState"
import putOrder from "../service/putOrder";

export default function UpdateOrderModal() {
  const selectedOrder = useOrdersState(state => state.selectedOrder)
  const [editedItems, setEditedItems] = useState(selectedOrder?.items || [])

  useEffect(() => {
    setEditedItems(selectedOrder?.items || []);
  }, [selectedOrder]);

  if (!selectedOrder) return null; // Si no hay orden seleccionada, no mostrar nada

  const handleChange = (itemId: number, field: "quantity" | "forMachine", value: number | string) => {
    setEditedItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };


  const handleSave = async () => {
    if (!selectedOrder) return null;
    try {
      await putOrder(Number(selectedOrder.id), editedItems);
      useOrdersState.getState().setSelectedOrder(null);
      useOrdersState.getState().fetchOrders();
    } catch (error) {
      console.error("Error al guardar los cambios", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
        <h1 className="text-xl font-bold mb-4 text-orange-600">
          Orden #{selectedOrder.id}
        </h1>
        <div className="max-h-64 overflow-y-auto mb-4">
          {editedItems.map(item => (
            <div key={item.id} className="mb-2">
              <p className="font-medium text-gray-800">{item.product.name}</p>
              <label className="mx-3" htmlFor="">Cantidad:</label>
              <input
                className="border-1 my-2 rounded"
                onChange={(e) => handleChange(Number(item.id), "quantity" , Number(e.target.value))}
                type="number"
                value={item.quantity}
              />
              <label htmlFor="">Maquina:</label>
              <input
                className="border-1 my-2 rounded"
                onChange={(e) => handleChange(Number(item.id), "forMachine", e.target.value)}
                type="text"
                value={item.forMachine}
              />
            </div>
          ))}
          
        </div>
          <button
            className="p-2 bg-amber-600 rounded-2xl text-white hover:scale-95 hover:bg-amber-700"
            onClick={handleSave}
          >Guardar</button>

        <button
          className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
          onClick={() => useOrdersState.getState().setSelectedOrder(null)}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
