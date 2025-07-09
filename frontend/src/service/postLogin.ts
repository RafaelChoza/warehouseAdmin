import type { LoginUserType } from "../Types"

export default async function postLogin(userLogin: LoginUserType) {

    const url = "http://localhost:8080"

    const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userLogin)
    })
    if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
}