

export default async function postIdMachine(id: number, idMachine: string) {
    const url = "http://localhost:8080"
   try {
        const response = await fetch(`${url}/cartItem/asignMachine/${id}?idMachine=${idMachine}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({})
        })
        if(!response.ok) {
            alert("Error al enviar los datos a la base de datos")
        }
        return await response.json();
   } catch (error) {
        console.error("Error en la solicitud:", error);
   }
}
