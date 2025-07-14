export default async function increaseDecreaseProductQty(
  id: number,
  action: "increase" | "decrease",
  amount: number
): Promise<boolean> {
  try {
    const param = `${action}Quantity=${amount}`;
    const response = await fetch(
      `http://localhost:8080/product/${action}Qty?id=${id}&${param}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
