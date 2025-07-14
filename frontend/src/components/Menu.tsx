import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import postLogout from '../service/postLogout'; // ajusta la ruta según tu proyecto

interface MenuProps {
  onToggle: (open: boolean) => void;
  open: boolean;
}

const Menu: React.FC<MenuProps> = ({ onToggle, open }) => {
  const navigate = useNavigate();

  const handleMouseOver = () => {
    onToggle(true);
  };

  const handleMouseOut = () => {
    onToggle(false);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    await postLogout(token || "");
    navigate("/login");
  };

  return (
    <aside
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={`border-1 fixed top-0 left-0 h-screen bg-gray-200 shadow-lg z-50 ${open ? 'w-64' : 'w-15'} transition-all duration-200 hover:border-r-12 hover:border-r-black`}
    >
      <div className="h-full flex flex-col justify-between">
        <div className="p-4">
          {/* Logo */}
          <h1 className="text-indigo-600 text-3xl font-bold mb-6 whitespace-nowrap">
            <span className={open ? 'inline' : 'hidden'}>Menú</span>
            <span className={open ? 'hidden' : 'inline'}>🏬</span>
          </h1>

          {/* Navegación */}
          <nav className="space-y-6">
            <Link to="/products" className="p-2 flex items-center space-x-2 text-gray-700 hover:text-indigo-300 text-lg hover:scale-105 hover:bg-gray-500 hover:rounded-2xl transition-all duration-300">
              <span>📦</span>
              <span className={open ? 'inline' : 'hidden'}>Productos</span>
            </Link>
            <Link to="/orders" className="p-2 flex items-center space-x-2 text-gray-700 hover:text-indigo-300 text-lg hover:scale-105 hover:bg-gray-500 hover:rounded-2xl transition-all duration-300">
              <span>📝</span>
              <span className={open ? 'inline' : 'hidden'}>Ordenes Abiertas</span>
            </Link>
            <Link to="/closedOrders" className="p-2 flex items-center space-x-2 text-gray-700 hover:text-indigo-300 text-lg hover:scale-105 hover:bg-gray-500 hover:rounded-2xl transition-all duration-300">
              <span>📁</span>
              <span className={open ? 'inline' : 'hidden'}>Ordenes Cerradas</span>
            </Link>
            <Link to="/create-product" className="p-2 flex items-center space-x-2 text-gray-700 hover:text-indigo-300 text-l hover:scale-105 hover:bg-gray-500 hover:rounded-2xl transition-all duration-300">
              <span>➕</span>
              <span className={open ? 'inline' : 'hidden'}>Crear Producto</span>
            </Link>
          </nav>
        </div>

        {/* Botón de Logout */}
        <div className="p-4">
          
          <button
            onClick={handleLogout}
            className="text-black font-semibold py-2 px-4 rounded-md w-full flex items-center justify-center space-x-2 hover:bg-red-700 hover:text-white hover:border-2 transition-all duration-300"
          >
            <span>🚪</span>
            <span className={open ? 'inline' : 'hidden'}>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Menu;
