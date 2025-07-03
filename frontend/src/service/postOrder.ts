

export default async function postOrder() {

    const url = "http://localhost:8080"

    try {
        const response = await fetch(`${url}/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        if(!response.ok) {
            console.log("Error al enviar los datos a la base de datos")
        }
        return await response.json()
    } catch (error) {
        console.error("Error en la comunicacion con el servidor", error)
    }


}
