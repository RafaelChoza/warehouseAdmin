import type { RecoverPasswordType } from "../Types"


export default async function postUpdatePassword(request: RecoverPasswordType) {
    const url = "http://localhost:8080"

    try {
        const response = await fetch(`${url}/auth/update-password`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(request)
        })
        if(!response) {
            console.log("Error al enviar los datos a la base de datos")
        } else {
            console.log("Los datos fueron enviados con exito")
        }
        return await response.json();
    } catch (error) {
        console.error("Hubo un error de comuniacion con el servidor", error)
    }
}
