import { useState } from 'react';
import postUsers from '../service/postUser';
import type { UserRequestFormType } from '../Types';

const initialStateForm = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  role: 'USER',
}

export default function RequestUser() {
  const [formData, setFormData] = useState<UserRequestFormType>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(formData)
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const result = await postUsers(formData);
      console.log('Usuario registrado con éxito:', result);
      setFormData(initialStateForm)

    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Ocurrió un error al registrar el usuario.');
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white via-orange-50 to-yellow-100 min-h-screen">
      <h2 className="text-3xl font-bold text-orange-600 mb-6">Registrar Usuario</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            className="border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder="Nombre"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border border-orange-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="USER">Usuario</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-2 rounded-full text-sm hover:scale-105 transition-transform"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
