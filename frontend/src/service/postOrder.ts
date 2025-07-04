

export default async function postOrder(userId: number) {

    const url = "http://localhost:8080"

    try {
        const response = await fetch(`${url}/order/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(`${url}/order/${userId}`)
        if(!response.ok) {
            console.log("Error al enviar los datos a la base de datos")
        }
        return await response.json()
    } catch (error) {
        console.error("Error en la comunicacion con el servidor", error)
    }
}
