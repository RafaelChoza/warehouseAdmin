import type { OrderType } from "../Types"


export default async function setOrderCompleted(orderId: OrderType["id"]) {
  const url = "http://localhost:8080"
  try {
    const response = await fetch(`${url}/closedOrder/${orderId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    if(!response.ok) {
        console.log("Error al enviar los datos a la base de datos")
    } else {
        console.log("Datos enviados a la base de datos con exito")
    }
    return response
  } catch (error) {
    console.error("Error con el servidor")
  }
}
