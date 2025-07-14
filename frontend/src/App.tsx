import { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
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
import SendMailRecoverPassword from './components/SendMailRecoverPassword';
import VerificationCodeInput from './components/VerificationCodeInput';
import CreateNewPassword from './components/CreateNewPassword';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const unprotectedRoutes = [
    "/login",
    "/recoverEmail",
    "/createNewPassword",
    "/verificationCodeInput",
    "/users-request"
  ];

  const isProtectedRoute = !unprotectedRoutes.includes(location.pathname);

  const handleMenuToggle = (open: boolean) => {
    setMenuOpen(open);
  };

  return (
    <div className="flex">
      {/* Sidebar izquierdo fijo */}
      {isProtectedRoute && <Menu onToggle={handleMenuToggle} open={menuOpen} />}

      {/* Contenedor del contenido principal con margen izquierdo solo si hay menú */}
      <div
        className={`flex-1 ${
          isProtectedRoute ? (menuOpen ? 'ml-64' : 'ml-15') : ''
        } p-6 transition-all duration-300`}
      >
        <Routes>
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="/users-request" element={<RequestUser />} />
          <Route path="/items-cart" element={<ProtectedRoute><ItemsCart /></ProtectedRoute>} />
          <Route path="/idMachineModal" element={<ProtectedRoute><AsignMachineModal /></ProtectedRoute>} />
          <Route path="/create-product" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/closedOrders" element={<ProtectedRoute><ClosedOrders /></ProtectedRoute>} />
          <Route path="/increase-modal" element={<ProtectedRoute><IncreaseQtyModal productId={0} /></ProtectedRoute>} />
          <Route path="/updatePassword" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
          <Route path="/updateOrder" element={<ProtectedRoute><UpdateOrderModal /></ProtectedRoute>} />
          <Route path="/recoverEmail" element={<SendMailRecoverPassword />} />
          <Route path="/createNewPassword" element={<CreateNewPassword />} />
          <Route path="/verificationCodeInput" element={<VerificationCodeInput />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
