

export default async function getOrders() {
    const url = "http://localhost:8080"

    try {
        const response = await fetch(`${url}/order`)
        if(!response.ok){
            console.log("Error al recibir los datos de las ordenes del servidor")
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
    
}
