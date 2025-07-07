import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';

interface Tienda {
  id_tienda: number;
  nombre_tienda: string;
}

interface Rol {
  id_rol: number;
  nombre_rol: string;
}

interface FormCrearUsuarioProps {
  onClose: () => void;
  onCrear: (data: {
    nombre: string;
    correo: string;
    rol: string;
    esJefe: boolean;
    tienda?: number;
  }) => void;
}

const FormCrearUsuario: React.FC<FormCrearUsuarioProps> = ({
  onClose,
  onCrear,
}) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [rol, setRol] = useState('');
  const [esJefe, setEsJefe] = useState(false);
  const [tienda, setTienda] = useState<number | ''>('');
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [roles, setRoles] = useState<Rol[]>([]);

  // Marcar automáticamente si el rol es jefe
  useEffect(() => {
    setEsJefe(rol === 'Jefe de Tienda');
  }, [rol]);

  useEffect(() => {
    const fetchTiendas = async () => {
      try {
        const res = await axios.get<Tienda[]>('http://localhost:3000/tiendas', {
          withCredentials: true,
        });
        setTiendas(res.data);
      } catch (error) {
        console.error('❌ Error cargando tiendas:', error);
        setTiendas([]);
      }
    };
    fetchTiendas();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get<Rol[]>('http://localhost:3000/roles', {
          withCredentials: true,
        });
        setRoles(res.data);
      } catch (error) {
        console.error('❌ Error cargando roles:', error);
        setRoles([]);
      }
    };
    fetchRoles();
  }, []);

  const handleCrear = () => {
    if (!nombre || !correo || !rol) {
      alert('Todos los campos obligatorios deben estar completos.');
      return;
    }

    onCrear({
      nombre,
      correo,
      rol,
      esJefe,
      tienda: esJefe && tienda !== '' ? Number(tienda) : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="relative z-50 bg-white text-gray-700 px-8 py-6 rounded-2xl shadow-2xl max-w-lg w-full mx-4">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-10 h-10 rounded-full border-2 border-[#4669AF] bg-white text-[#4669AF]
             flex items-center justify-center hover:bg-[#4669AF] hover:border-white hover:text-white 
             transition-all duration-300 font-bold text-lg"
          aria-label="Cerrar"
        >
          X
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <FaUserPlus size={80} className="text-[#4669AF]" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Registro de Usuario
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Complete los siguientes campos para crear un nuevo usuario
          </p>
        </div>

        {/* Formulario */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-800 mb-1 block">
                Nombres Completos <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ej: Camilo Andrés Gómez Bernal"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#4669AF]"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-800 mb-1 block">
                Correo Corporativo <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="correo@empresa.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#4669AF]"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              Rol de Usuario <span className="text-red-500">*</span>
            </label>
            <select
              title="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#4669AF]"
            >
              <option value="">Seleccione un rol</option>
              {roles.map((r) => (
                <option key={r.id_rol} value={r.nombre_rol}>
                  {r.nombre_rol}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-800 mb-2 block">
                ¿Es jefe de Tienda?
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center text-gray-700">
                  <input
                    type="radio"
                    name="esJefe"
                    checked={esJefe}
                    readOnly
                    className="mr-2 text-indigo-600"
                  />
                  <span className="text-sm">Sí</span>
                </label>
                <label className="flex items-center text-gray-700">
                  <input
                    type="radio"
                    name="esJefe"
                    checked={!esJefe}
                    readOnly
                    className="mr-2 text-indigo-600"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-800 mb-1 block">
                Asignar Tienda
              </label>
              <select
                title="tienda"
                value={tienda}
                onChange={(e) => setTienda(Number(e.target.value))}
                disabled={!esJefe}
                className={`w-full px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                  esJefe
                    ? 'border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#4669AF]'
                    : 'border border-gray-200 text-gray-400 bg-gray-100 cursor-not-allowed'
                }`}
              >
                <option value="">Todas las Tiendas</option>
                {tiendas.map((t) => (
                  <option key={t.id_tienda} value={t.id_tienda}>
                    {t.nombre_tienda}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={handleCrear}
            className="flex-1 bg-[#4669AF] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-[#3c5ca0]"
          >
            CREAR
          </button>
          <button
            onClick={() => {
              setNombre('');
              setCorreo('');
              setRol('');
              setEsJefe(false);
              setTienda('');
            }}
            className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-black"
          >
            LIMPIAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCrearUsuario;
