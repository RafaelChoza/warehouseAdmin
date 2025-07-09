

export default async function getClosedOrders() {
    const url = "http://localhost:8080"
    try {
        const response = await fetch(`${url}/closedOrder`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        if(!response.ok) {
            console.log("Error al recibir los datos de la base de datos")
        } else {
            console.log("Datos recibidos con éxito")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error en la comunicación con el servidor")
    }
  
}
