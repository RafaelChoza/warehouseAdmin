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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/menu' element={<Menu />} />
        <Route path='/products' element={<Products />} />
        <Route path='/login' element={<Login />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users-request' element={<RequestUser />} />
        <Route path='/items-cart' element={<ItemsCart />} />
        <Route path='/idMachineModal' element={<AsignMachineModal />} />
        <Route path='/create-product' element={<CreateProduct />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/closedOrders' element={<ClosedOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
