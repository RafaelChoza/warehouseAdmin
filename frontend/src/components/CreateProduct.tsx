import { useState } from "react";
import type { ProductType } from "../Types";
import postProduct from "../service/postProduct";

export default function CreateProduct() {
    const initialState = {
        name: "",
        description: "",
        vendor: "",
        quantity: 0,
        kanbanQuantity: 0,
        price: 0,
        mro: "",
    }

    const [formData, setFormData] = useState<ProductType>(initialState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData)
        try {
            const result = await postProduct(formData);
            console.log(result);
        } catch (error) {
            console.error("Error en el servidor ", error)
        }
    }

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-white via-orange-50 to-yellow-100">
            <h2 className="text-3xl font-bold text-orange-600 mb-6">Agregar Producto a Base de Datos</h2>

            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre del Producto"
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        onChange={handleChange}
                        value={formData.name}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Descripción"
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        onChange={handleChange}
                        value={formData.description}
                        required
                    />
                    <input
                        type="text"
                        name="vendor"
                        placeholder="Fabricante"
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        onChange={handleChange}
                        value={formData.vendor}
                        required
                    />
                    <input
                        type="text"
                        name="mro"
                        placeholder="MRO"
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        onChange={handleChange}
                        value={formData.mro}
                        required
                    />
                    <div className="p-4 bg-gray-100">
                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-700">Cantidad</label>
                        <input
                            id="quantity"
                            type="number"
                            name="quantity"
                            placeholder="Cantidad"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-black"
                            onChange={handleChange}
                            value={formData.quantity}
                            required
                        />
                    </div>

                    <div className="p-4 bg-gray-100">
                        <label htmlFor="quantityKanban" className="block mb-2 text-sm font-medium text-gray-700">Cantidad Kanban</label>
                        <input
                            id="kanbanQuantity"
                            type="number"
                            name="kanbanQuantity"
                            placeholder="Cantidad Kanban"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-black"
                            onChange={handleChange}
                            value={formData.kanbanQuantity}
                            required
                        />
                    </div>

                    <div className="p-4 bg-gray-100">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">Precio</label>
                        <input
                            id="price"
                            type="number"
                            name="price"
                            placeholder="Precio"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-black"
                            onChange={handleChange}
                            value={formData.price}
                            required
                        />
                    </div>


                    <div className="md:col-span-2 text-right">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
                        >
                            Guardar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
