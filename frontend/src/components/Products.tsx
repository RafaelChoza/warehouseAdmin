import { useCart } from '../components/CartContext';
import { useEffect, useState } from 'react';
import type { ProductType } from '../Types';
import postCartItem from '../service/postCartItem';
import ItemsCart from './ItemsCart';
import { useShopStore } from '../store/ShopState';
import IncreaseQtyModal from './IncreaseQtyModal';

export default function Products() {
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const { cart, fetchCart } = useCart();
  const { products, fetchProducts } = useShopStore();

  const searchTermInitialState = () => setSearchTerm("");

  const toggleCart = () => setShowCart(prev => !prev);

  const openQtyModal = (productId: number) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProductId(null);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const checkKanbanWarning = (product: ProductType): boolean => {
    return product.quantity <= product.kanbanQuantity;
  };

  const handleAddToCart = async (product: ProductType) => {
    try {
      if (typeof product.id !== 'number') throw new Error('El producto no tiene un ID válido');
      await postCartItem(product.id, 1);
      await fetchCart();
      await fetchProducts();
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen p-6 bg-gradient-to-br from-white via-orange-50 to-yellow-100">
      <button
        onClick={toggleCart}
        className="mb-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
      >
        {showCart ? "Cerrar carrito" : `Ver carrito (${cart?.items.length || 0})`}
      </button>

      <h2 className="text-3xl font-bold text-orange-600 mb-4">Productos</h2>

      <input
        type="text"
        placeholder="Buscar por nombre, descripción o proveedor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 px-4 py-2 border border-orange-300 rounded shadow-sm w-full max-w-md focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button
        className='mx-4 px-3 py-2 bg-orange-400 text-white font-extrabold rounded-3xl hover:bg-orange-700 hover:scale-95'
        onClick={searchTermInitialState}
      >
        Limpiar
      </button>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No se encontraron productos.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-orange-100 text-orange-800 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3">Cantidad</th>
                <th className="px-4 py-3">Kanban</th>
                <th className="px-4 py-3">MRO</th>
                <th className="px-4 py-3">Proveedor</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className="border-t hover:bg-orange-50 transition">
                  <td className="px-4 py-2">{product.id}</td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.description}</td>
                  <td className="px-4 py-2">{product.quantity}</td>
                  <td className="px-4 py-2">{product.kanbanQuantity}</td>
                  <td className="px-4 py-2">{product.mro}</td>
                  <td className="px-4 py-2">{product.vendor}</td>
                  <td className="px-4 py-2">
                    {checkKanbanWarning(product) && (
                      <p className="text-xs text-red-500 font-bold mb-1">⚠️ KANBAN AGOTADO</p>
                    )}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs hover:scale-105 transition-transform"
                    >
                      Agregar al carrito
                    </button>
                    <button
                      onClick={() => openQtyModal(Number(product.id))}
                      className="bg-gradient-to-r from-rose-300 to-rose-500 text-white px-3 py-1 rounded-full text-xs hover:scale-105 transition-transform my-2"
                    >
                      Ajustar Cantidades
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
          w-[60rem]
        `}
      >
        <ItemsCart />
      </div>

      {/* Modal para ajustar cantidades */}
      {showModal && selectedProductId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md py-10 px-4 relative">
            <button
              className="absolute top-10 right-2 text-orange-600 text-xl font-bold hover:scale-110"
              onClick={closeModal}
            >
              Cerrar
            </button>
            <IncreaseQtyModal productId={selectedProductId} />
          </div>
        </div>
      )}

    </div>
  );
}
