

export default async function postSendEmail(email: string) {
    const url = "http://localhost:8080"
    try {
        const response = await fetch(`${url}/email/send?to=${email}`, {
            method: "POST"
        })
        if(!response.ok) {
            console.error("Error al enviar el correo a la base de datos")
        } else {
            console.log("Se envió el correo con éxito")
        }
    } catch (error) {
        console.error("Error con el servidor", error)
    }
}
