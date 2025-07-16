
export default async function getConsumptionProduct(productId: number) {
  const url = "http://localhost:8080"
  try {
    const response = await fetch(`${url}/itemConsumptionLastMonth/${productId}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    if(!response.ok) {
        console.log("Error al recibir los datos de la base de datos")
    }
    const data = response.json()
    return data
  } catch (error) {
    console.error("Error en el servidor", error)
  }
}
