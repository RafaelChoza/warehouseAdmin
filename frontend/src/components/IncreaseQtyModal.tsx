import { useState } from "react";
import increaseDecreaseProductQty from "../service/increaseDecreaseProductQty";

export default function IncreaseQtyModal({ productId }: { productId: number }) {
  const [newQty, setNewQty] = useState<number>(0);
  const [action, setAction] = useState<"increase" | "decrease">("increase");
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQty(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await increaseDecreaseProductQty(productId, action, newQty);
    if (success) {
      setMessage(`✅ Cantidad actualizada exitosamente (${action})`);
    } else {
      setMessage("❌ Error al actualizar la cantidad.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white via-orange-50 to-yellow-100">
      <h2 className="text-3xl font-bold text-orange-600 mb-6">Ajuste de cantidad de Producto</h2>

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8">
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          <input
            type="number"
            name="newQty"
            placeholder="Ingrese la cantidad"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={newQty}
            onChange={handleChange}
          />

          <select
            value={action}
            onChange={(e) => setAction(e.target.value as "increase" | "decrease")}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="increase">Aumentar</option>
            <option value="decrease">Disminuir</option>
          </select>

          {message && <p className="text-sm text-orange-600 font-semibold">{message}</p>}

          <div className="text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Guardar Cambio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
