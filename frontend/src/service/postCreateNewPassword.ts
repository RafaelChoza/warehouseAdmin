import type { CreateNewPasswordType } from "../Types";


export default async function postCreateNewPassword(request: CreateNewPasswordType) {
    const url = "http://localhost:8080"
    try {
        const response = await fetch(`${url}/email/updateCodePassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })
        if(!response.ok) {
            console.error("Error al enviar los datos a la base de datos")
        } else {
            console.log("Datos enviados con exito")
        }
        const data = await response.json()
        return data;
    } catch (error) {
        console.error("Error con el servidor", error)
    }
}