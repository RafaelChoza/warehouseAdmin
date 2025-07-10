import React from 'react';
import { Link } from 'react-router-dom';

interface MenuProps {
  onToggle: (open: boolean) => void;
  open: boolean;
}

const Menu: React.FC<MenuProps> = ({ onToggle, open }) => {
  const handleMouseOver = () => {
    onToggle(true);
  };

  const handleMouseOut = () => {
    onToggle(false);
  };

  return (
    <aside
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={`fixed top-0 left-0 h-screen bg-gray-200 shadow-lg z-50 ${open ? 'w-64' : 'w-15'} transition-all duration-300`}
    >
      {/* Contenido del menú */}
      <div className="h-full flex flex-col justify-between">
        <div className="p-4">
          {/* Logo con texto oculto */}
          <h1 className="text-indigo-600 text-2xl font-bold mb-6 whitespace-nowrap">
            <span className={open ? 'inline' : 'hidden'}>MiAlmacén</span>
            <span className={open ? 'hidden' : 'inline'}>🏬</span>
          </h1>
          <nav className="space-y-6">
            <Link to="/products" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 text-lg">
              <span>📦</span>
              <span className={open ? 'inline' : 'hidden'}>Productos</span>
            </Link>
           <Link to="/orders" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 text-lg">
              <span>📝</span>
              <span className={open ? 'inline' : 'hidden'}>Ordenes Abiertas</span>
            </Link>
            <Link to="/closedOrders" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 text-lg">
              <span>📁</span>
              <span className={open ? 'inline' : 'hidden'}>Ordenes Cerradas</span>
            </Link>
            <Link to="/create-product" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 text-lg">
              <span>➕</span>
              <span className={open ? 'inline' : 'hidden'}>Crear Producto</span>
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Menu;