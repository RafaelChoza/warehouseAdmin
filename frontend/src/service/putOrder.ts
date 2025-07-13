import type { OrderItemType } from "../Types"


export default async function putOrder(id: number, updatedItems: OrderItemType[]) {
    const url = "http://localhost:8080"
    try {
        const response = await fetch(`${url}/order/${id}/items`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
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
