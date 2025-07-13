import { useState } from 'react';
import postLogin from '../service/postLogin';
import { Link, useNavigate } from 'react-router-dom';
import postCar from '../service/postCar';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(username, password)
    e.preventDefault();
    try {
      const response = await postLogin({ username, password })
      const token = response.token
      localStorage.setItem("token", token)
      await postCar(token)
      navigate("/products")
      console.log(response.token)
    } catch (error) {
      alert("Credenciales no validas")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-yellow-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Usuario</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <Link to="/recoverEmail" className='text-blue-500 underline text-xs'>Olvidaste tu contraseña?</Link>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 rounded-md font-semibold hover:scale-105 transition-transform"
          >
            Entrar
          </button>
        </form>
        <div>
          <p className='my-5'>Registro de nuevo usuario</p>
          <div className='flex justify-center'>
            <Link
              to="/users-request"
              type="submit"
              className="text-center w-3/4 bg-gradient-to-r from-red-700 to-yellow-500 text-white py-2 rounded-md font-semibold hover:scale-105 transition-transform"
            >
              Registrarse
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
