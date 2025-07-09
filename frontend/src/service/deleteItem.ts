

export default async function deleteItem(id: number): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:8080/cartItem/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) throw new Error("No se pudo eliminar el producto del carrito");

    return true;
  } catch (error) {
    console.error("Error eliminando item:", error);
    return false;
  }
}

