import { useShopStore } from '../store/ShopState';
import postIdMachine from '../service/postIdMachine';

export default function AsignMachineModal() {
  const { idMachine, setIdMachine } = useShopStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdMachine(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (selectedProductId !== null) {
        const response = await postIdMachine(selectedProductId, idMachine);
        if (response.ok) {
        console.log("Máquina asignada correctamente");
      }
      } else {
        console.error("Falló la asignación");
      }
    } catch (error) {
      console.error("Error al enviar el ID de máquina:", error);
    }
  };

  const handleAsignMachine = async (id: number, idMachine: string) => {
    try {
      const response = await postIdMachine(id, idMachine);
      if (!response.ok) {
        console.log("Máquina asignada");
      }
    } catch (error) {
      console.error("Error al asignar máquina:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white via-orange-50 to-yellow-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">Asignar Máquina</h2>
        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="idMachine">
          ID de Máquina
        </label>
        <input
          type="text"
          
          id="idMachine"
          placeholder="Escribe el ID de la máquina"
          value={idMachine}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 rounded-md font-semibold hover:scale-105 transition-transform"
          onSubmit={() => handleAsignMachine}
        >
          Confirmar Asignación
        </button>
      </div>
    </div>
  );
}
