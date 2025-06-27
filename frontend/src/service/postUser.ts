import type { UserRequestFormType } from "../Types"

export default async function postUsers(user: UserRequestFormType) {

    const url = "http://localhost:8080"

    const response = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
}