import getActiveCart from "./getActiveCart";

export default async function postCartItem(productId: number, quantity: number = 1) {
  const url = "http://localhost:8080";
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No estás autenticado");

  // Obtener carrito activo
  const cart = await getActiveCart()

  // Agregar producto al carrito
  const response = await fetch(`${url}/cartItem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      cart: { id: cart.id },
      product: { id: productId },
      quantity: quantity
    })
  });

  if (!response.ok) {
    throw new Error("No se pudo agregar el producto al carrito");
  }

  return await response.json();
}
