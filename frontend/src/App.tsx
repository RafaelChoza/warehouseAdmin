import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Menu from './components/Menu'
import Products from './components/Products'
import Login from './components/Login'
import Users from './components/Users'
import RequestUser from './components/RequestUser'
import ItemsCart from './components/ItemsCart'

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
        </Routes>
    </BrowserRouter>
  )
}

export default App
