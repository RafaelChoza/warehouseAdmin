import { jwtDecode } from "jwt-decode";

export default async function postCar(token: string) {
  const decoded: any = jwtDecode(token);
  const userId = decoded.userId

  const url = "http://localhost:8080";

  const response = await fetch(`${url}/cart?id=${userId}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
