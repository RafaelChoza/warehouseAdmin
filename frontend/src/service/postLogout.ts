

export default async function postLogout(token: string) {

    if (!token) {
        console.warn("No hay token, no se puede cerrar sesión");
        return;
    }

    const url = "http://localhost:8080"

    try {
        await fetch(`${url}/auth/logout`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        localStorage.removeItem("token")
        console.log("Logout exitoso")
    } catch (error) {
        console.error("Hubo un problema al cerrar sesión:", error);
        alert("Ocurrió un error. Inténtalo de nuevo más tarde.");
    }

}
