import { useEffect, useState } from 'react';
import type { UserType } from '../Types';
import fetchUsers from '../service/fetchUsers';

export default function Users() {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(error => console.error('Error al cargar usuarios:', error));
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-white via-orange-50 to-yellow-100 min-h-screen">
      <h2 className="text-3xl font-bold text-orange-600 mb-6">Usuarios</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">Cargando usuarios...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-orange-100 text-orange-800 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Apellido</th>
                <th className="px-4 py-3">Rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-orange-50 transition">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.firstName}</td>
                  <td className="px-4 py-2">{user.lastName}</td>
                  <td className="px-4 py-2">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
