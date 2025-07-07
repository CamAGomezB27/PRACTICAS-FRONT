import { Edit, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

const UsuariosRegistrados = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    {
      id: 1,
      nombre: 'Camilo Gómez',
      correo: 'camigomezbernal@gmail.com',
      rol: 'Administrador',
      estado: 'Activo',
      fechaRegistro: '10/05/2025',
    },
    {
      id: 2,
      nombre: 'Andrés Bernal',
      correo: 'andresbernal0527@gmail.com',
      rol: 'Gestor de Nómina',
      estado: 'Activo',
      fechaRegistro: '10/05/2025',
    },
    {
      id: 3,
      nombre: 'Martin Gonzalez',
      correo: 'martingonzales@gmail.com',
      rol: 'Jefe de Tienda',
      estado: 'Activo',
      fechaRegistro: '10/05/2025',
    },
    {
      id: 4,
      nombre: 'Jhoan Garcia',
      correo: 'garciajhon@gmail.com',
      rol: 'Administrador',
      estado: 'Inactivo',
      fechaRegistro: '10/05/2025',
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.rol.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  //   const handleEdit = (userId) => {
  //     console.log('Editar usuario:', userId);
  //   };

  //   const handleDelete = (userId) => {
  //     if (window.confirm('¿Está seguro que desea eliminar este usuario?')) {
  //       setUsers(users.filter((user) => user.id !== userId));
  //     }
  //   };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">
              USUARIOS REGISTRADOS
            </h1>
            <span className="text-sm text-gray-600">
              Total de Usuarios registrados: {users.length}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b bg-white">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar usuario..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 border-b">
                <th className="text-left py-3 px-6 font-semibold text-gray-700">
                  Usuario
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">
                  Correo
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">
                  Rol
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">
                  Estado
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">
                  Fecha de Registro
                </th>
                <th className="text-left py-3 px-6 font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                        <span className="text-gray-600 font-medium text-sm">
                          {user.nombre.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-800">
                        {user.nombre}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{user.correo}</td>
                  <td className="py-4 px-6 text-gray-700">{user.rol}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        user.estado === 'Activo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.estado}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {user.fechaRegistro}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        // onClick={() => handleEdit(user.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 transition-colors"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Editar</span>
                      </button>
                      <button
                        // onClick={() => handleDelete(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center space-x-1 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              No se encontraron usuarios
            </div>
            <div className="text-gray-400 text-sm mt-1">
              Intenta con diferentes términos de búsqueda
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsuariosRegistrados;
