export default async function fetchUsers() {

    const url = "http://localhost:8080"

    const response = await fetch(`${url}/user`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
}