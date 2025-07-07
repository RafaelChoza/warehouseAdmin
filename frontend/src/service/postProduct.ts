

export default async function postProduct() {
    const url = "http://localhost:8080"
  try {
    const response = await fetch(`${url}/product`, {
        method: "POST",
        headers: {
            "Content-Type": "application-json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    if(!response.ok) {
        alert("Error al enviar los datos a la base de datos")
    }
    return await response.json()
  } catch (error) {
    console.error("Error en el ervisor ", error)
  }
}
