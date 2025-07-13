
export default async function postValidateCode(code: string) {
    const url = "http://localhost:8080"
    const email = localStorage.getItem("StorageEmail")

    if (!email) {
        alert("No se encontró el correo electrónico en localStorage.");
        return;
    }

    try {
        const response = await fetch(`${url}/email/validate?email=${email}&inputCode=${code}`, {
            method: "POST"
        })
        if(!response.ok) {
            console.error("Error al enviar los datos a la base de datos")
        } else {
            console.log("Datos enviados con éxito")
        }
    } catch (error) {
        
    }
}
