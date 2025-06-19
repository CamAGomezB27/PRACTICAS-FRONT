import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

type Estado = 'CREADA' | 'GESTIONADA' | 'EN PROCESO' | 'RECHAZADA';

interface Novedad {
  id_novedad: number;
  descripcion: string;
  fecha_creacion: string;
  estado_novedad: {
    nombre_estado: Estado;
  };
}

const getColor = (estado: Estado) => {
  switch (estado) {
    case 'CREADA':
      return 'bg-blue-500';
    case 'GESTIONADA':
      return 'bg-green-500';
    case 'EN PROCESO':
      return 'bg-yellow-500';
    case 'RECHAZADA':
      return 'bg-red-500';
  }
};

const NovedadesRecientes: React.FC = () => {
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

    const interval = setInterval(fetchNovedades, 10000); //10 segundos

    return () => clearInterval(interval); //limpiar
  }, []);

  return (
    <div className="text-sm font-bold w-[450px] bg-gray-400 rounded-2xl shadow-inner flex flex-col space-y-3 p-3">
      <div className="flex flex-col space-y-3 max-h-[200px] overflow-y-auto pr-1">
        {novedades.map((novedad) => (
          <div
            key={novedad.id_novedad}
            className="flex items-start bg-white rounded-xl shadow-sm p-3 relative cursor-pointer"
          >
            <div
              className={`w-1.5 h-full rounded-l-md absolute left-0 top-0 bottom-0 ${getColor(
                novedad.estado_novedad.nombre_estado as Estado,
              )}`}
            />
            <div className="pl-3 pr-1 flex-1">
              <p className="text-sm font-semibold text-gray-800">
                {`SOLICITUD #0${novedad.id_novedad} ${novedad.estado_novedad.nombre_estado}`}
              </p>
              <p className="text-xs text-gray-400">{novedad.descripcion}</p>
            </div>
            <span className="text-[10px] text-gray-800 absolute top-2 right-3">
              {new Date(novedad.fecha_creacion).toLocaleTimeString('es-CO', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NovedadesRecientes;
