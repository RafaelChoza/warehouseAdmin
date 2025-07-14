import { useState } from "react";
import postCreateNewPassword from "../service/postCreateNewPassword";

export default function CreateNewPassword() {
  const [formData, setFormData] = useState({
    username: "",
    newPassword: "",
    newPassword2: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.newPassword2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Datos para enviar:", formData);
    await postCreateNewPassword(formData)
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white via-orange-50 to-yellow-100">
      <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">Crear Nueva Contraseña</h2>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="username"
            placeholder="Escribe tu usuario"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={handleChange}
            value={formData.username}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="Nueva contraseña"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={handleChange}
            value={formData.newPassword}
            required
          />
          <input
            type="password"
            name="newPassword2"
            placeholder="Confirmar nueva contraseña"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={handleChange}
            value={formData.newPassword2}
            required
          />

          <div className="text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Cambiar Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
1