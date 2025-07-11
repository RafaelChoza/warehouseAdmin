import { useState } from "react";
import type { RecoverPasswordType } from "../Types";
import postUpdatePassword from "../service/postUpdatePassword";

const initialState: RecoverPasswordType = {
    username: "",
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
};

export default function UpdatePassword() {
    const [formData, setFormData] = useState<RecoverPasswordType>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await postUpdatePassword(formData)

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-yellow-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
                    Actualizar Contraseña
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Escribe tu usuario"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
                        <input
                            type="password"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            placeholder="Escribe tu contraseña actual"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Escribe tu nueva contraseña"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nueva contraseña</label>
                        <input
                            type="password"
                            name="newPassword2"
                            value={formData.newPassword2}
                            onChange={handleChange}
                            placeholder="Confirma tu nueva contraseña"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 rounded-md font-semibold hover:scale-105 transition-transform"
                    >
                        Enviar información
                    </button>
                </form>
            </div>
        </div>
    );
}
