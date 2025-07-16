

export default async function getItemQuantity() {
    const url = "http://localhost:8080"
    try {
        const response = await fetch(`${url}/getProductQuantities`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        if(!response) {
            console.log("Error al recibir los datos de la base de de datos")
        } else {
            console.log("Datos recibidos correctamente")
        }
        const data = response.json()
        return data
    } catch (error) {
        
    }
}
