import { useCart } from '../components/CartContext';
import { useEffect, useState } from 'react';
import fetchProducts from '../service/fetchProducts';
import type { ProductType } from '../Types';
import postCartItem from '../service/postCartItem';
import ItemsCart from './ItemsCart';
import { useShopStore } from '../store/ShopState';
import AsignMachineModal from './AsignMachineModal';

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [showCart, setShowCart] = useState(false);
  const { cart, fetchCart } = useCart();
  const { setSelectedProductId } = useShopStore();
  const [showModal, setShowModal] = useState(false);
  const toggleCart = () => setShowCart(prev => !prev);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(console.error);
  }, []);

  const handleAddToCart = async (product: ProductType) => {
    try {
      if (typeof product.id !== 'number') throw new Error('El producto no tiene un ID válido');
      await postCartItem(product.id, 1);
      await fetchCart();
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  };

  

  return (
    <div className="relative min-h-screen p-6 bg-gradient-to-br from-white via-orange-50 to-yellow-100">
      <button
        onClick={toggleCart}
        className="mb-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        {showCart ? "Cerrar carrito" : `Ver carrito (${cart?.items.length || 0})`}
      </button>

      <h2 className="text-3xl font-bold text-orange-600 mb-6">Productos</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">Cargando productos...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-orange-100 text-orange-800 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3">Cantidad</th>
                <th className="px-4 py-3">MRO</th>
                <th className="px-4 py-3">Proveedor</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-t hover:bg-orange-50 transition">
                  <td className="px-4 py-2">{product.id}</td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.description}</td>
                  <td className="px-4 py-2">{product.quantity}</td>
                  <td className="px-4 py-2">{product.mro}</td>
                  <td className="px-4 py-2">{product.vendor}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        if (typeof product.id === 'number') {
                          handleAddToCart(product);
                          setSelectedProductId(product.id);
                          setShowModal(true)
                        } else {
                          console.error("El producto no tiene un ID válido");
                        }
                      }}
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs hover:scale-105 transition-transform"
                    >
                      Agregar al carrito
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div
        className={`
          fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50
          ${showCart ? "translate-x-0" : "translate-x-full"}
          w-[40rem]
        `}
      >
        <ItemsCart />
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative z-60">
            <AsignMachineModal />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-white bg-orange-600 px-2 py-1 rounded hover:bg-orange-700 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
