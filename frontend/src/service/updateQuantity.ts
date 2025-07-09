export default async function updateQuantity(id: number, action: "increase" | "decrease"): Promise<boolean> {
  try {
    const response = await fetch(
      `http://localhost:8080/cartItem${action === "increase" ? "Increase" : "Decrease"}/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!response.ok) throw new Error("No se pudo actualizar la cantidad");

    return true;
  } catch (error) {
    console.error("Error actualizando cantidad:", error);
    return false;
  }
}
