import type { OrderType } from "../Types";


export default async function setAsDelivered(id: OrderType["id"]) {
    const url = "http://localhost:8080"
  try {
    const response = await fetch(`${url}/order/${id}/deliver`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    if(!response.ok) {
        console.log("Error al enviar la solicitud al servidor")
    } else {
        console.log("Orden marcada como entregada")
    }
  } catch (error) {
    console.log(error)
  }
}
