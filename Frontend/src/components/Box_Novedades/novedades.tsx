import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

type Estado =
  | 'CREADA'
  | 'GESTIONADA'
  | 'EN GESTIÓN'
  | 'RECHAZADA'
  | 'PENDIENTE';

interface Novedad {
  id_novedad: number;
  descripcion: string;
  fecha_creacion: string;
  estado_novedad: {
    nombre_estado: Estado;
  };
  tipo_novedad?: {
    nombre_tipo: string;
  };
  usuario: {
    usuario_tienda: {
      tienda: {
        nombre_tienda: string;
      };
    }[];
  };
}

const getColor = (estado: Estado) => {
  switch (estado) {
    case 'CREADA':
    case 'PENDIENTE':
      return 'bg-blue-500';
    case 'GESTIONADA':
      return 'bg-green-500';
    case 'EN GESTIÓN':
      return 'bg-yellow-500';
    case 'RECHAZADA':
      return 'bg-red-500';
  }
};

const NovedadesRecientes: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [novedades, setNovedades] = useState<Novedad[]>([]);

  const fetchNovedades = async () => {
    try {
      const response = await axios.get<Novedad[]>(
        'http://localhost:3000/novedad',
        { withCredentials: true },
      );
      setNovedades(response.data);
    } catch (error) {
      console.error('Error al obtener novedades: ', error);
    }
  };

  useEffect(() => {
    fetchNovedades();
    const interval = setInterval(fetchNovedades, 10000);
    return () => clearInterval(interval);
  }, []);

  // Reemplaza "CREADA" por "PENDIENTE" si el usuario es de Nómina
  const mostrarEstado = (estado: Estado): Estado => {
    return user?.esNomina && estado === 'CREADA' ? 'PENDIENTE' : estado;
  };

  return (
    <div className="text-sm font-bold w-[500px] bg-gray-400 rounded-2xl shadow-inner flex flex-col space-y-3 p-3">
      <div className="flex flex-col space-y-3 max-h-[200px] overflow-y-auto pr-1">
        {novedades.map((novedad) => {
          const tiendaNombre =
            novedad.usuario?.usuario_tienda?.[0]?.tienda?.nombre_tienda ??
            'Sin tienda asociada';

          const estadoVisual = mostrarEstado(
            novedad.estado_novedad.nombre_estado,
          );

          return (
            <div
              key={novedad.id_novedad}
              className="flex items-start bg-white rounded-xl shadow-sm p-3 relative cursor-pointer 
              transform transition-transform duration-150 hover:scale-[1.01]"
              onClick={() => navigate('/vista-previa-masiva-tienda')}
            >
              <div
                className={`w-1.5 h-full rounded-l-md absolute left-0 top-0 bottom-0 ${getColor(
                  estadoVisual,
                )}`}
              />
              <div className="pl-3 pr-1 flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {`SOLICITUD #0${novedad.id_novedad} ${estadoVisual} - ${
                    novedad.tipo_novedad?.nombre_tipo ?? 'Sin tipo'
                  }`}
                </p>
                <p className="text-xs text-gray-400">{novedad.descripcion}</p>
                <p className="text-[10px] text-gray-500 italic">
                  Tienda: {tiendaNombre}
                </p>
              </div>
              <span className="text-[10px] text-gray-800 absolute top-2 right-3">
                {new Date(novedad.fecha_creacion).toLocaleTimeString('es-CO', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NovedadesRecientes;
