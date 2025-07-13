import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu';
import Products from './components/Products';
import Login from './components/Login';
import Users from './components/Users';
import RequestUser from './components/RequestUser';
import ItemsCart from './components/ItemsCart';
import AsignMachineModal from './components/AsignMachineModal';
import CreateProduct from './components/CreateProduct';
import Orders from './components/Orders';
import ClosedOrders from './components/ClosedOrders';
import IncreaseQtyModal from './components/IncreaseQtyModal';
import UpdatePassword from './components/UpdatePassword';
import UpdateOrderModal from './components/UpdateOrderModal';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = (open: boolean) => {
    setMenuOpen(open);
  };

  return (
    <BrowserRouter>
      <div className="flex">
        {/* Sidebar izquierdo fijo */}
        <Menu onToggle={handleMenuToggle} open={menuOpen} />
        {/* Contenedor del contenido principal con margen izquierdo */}
        <div className={`flex-1 ${menuOpen ? 'ml-64' : 'ml-15'} p-6 transition-all duration-300`}>
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users-request" element={<RequestUser />} />
            <Route path="/items-cart" element={<ItemsCart />} />
            <Route path="/idMachineModal" element={<AsignMachineModal />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/closedOrders" element={<ClosedOrders />} />
            <Route path="/increase-modal" element={<IncreaseQtyModal productId={0} />} />
            <Route path="/updatePassword" element={<UpdatePassword />} />
            <Route path="/updateOrder" element={<UpdateOrderModal />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;