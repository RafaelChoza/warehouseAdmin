

export default async function getActiveCart() {
  
    const url = "http://localhost:8080";

    const response = await fetch(`${url}/cart/active`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    if(!response.ok) {
        throw new Error("Error al obtener los datos de la base de datos")
    }

    return await response.json()
}
