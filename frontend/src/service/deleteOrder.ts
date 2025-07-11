import type { OrderType } from "../Types"


export default async function deleteOrder(id: OrderType["id"]) {
  const url = "http://localhost:8080"
  try {
    const response = await fetch(`${url}/order/${id}`, {
        method: "DELETE",
        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
    })
    if(!response.ok) {
        console.error("No se pudo eliminar la orden")
    }
  } catch (error) {
    console.error(error)
  }
}
