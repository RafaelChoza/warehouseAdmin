import type { OrderType } from "../Types"


export default async function updateOrder(id: OrderType["id"], updatedItems: OrderType[]) {
    const url = "http://localhost:8080"
    try {
        const response = await fetch(`${url}/${id}/items`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(updatedItems)
        })
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error al actualizar: ${errorText}`);
        }
        return response.json()
    } catch (error) {
        console.error("Error en el servisor", error)
    }
}
