

const Menu = () => {
  return (
    <header className="shadow-md bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">MiAlmacén</h1>
        <nav className="space-x-6 hidden md:flex">
          <a href="#" className="text-gray-700 hover:text-indigo-600">Inicio</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600">Productos</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600">Carrito</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600">Contacto</a>
        </nav>
        <a href="#" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          Iniciar sesión
        </a>
      </div>
    </header>
  );
};

export default Menu;
