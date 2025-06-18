import React from 'react';

type Estado = 'CREADA' | 'GESTIONADA' | 'EN PROCESO' | 'RECHAZADA';

interface Novedad {
  id: number;
  estado: Estado;
  hora: string;
  descripcion: string;
}

const generarNovedades = (cantidad: number): Novedad[] => {
  return [...Array(cantidad)].map((_, i) => {
    const tipo = i % 4;
    const estado: Estado =
      tipo === 0
        ? 'CREADA'
        : tipo === 1
          ? 'GESTIONADA'
          : tipo === 2
            ? 'EN PROCESO'
            : 'RECHAZADA';

    const descripcion =
      estado === 'CREADA'
        ? 'La solicitud fue creada correctamente y está pendiente de revisión'
        : estado === 'GESTIONADA'
          ? 'Solicitud del Empleado en tienda fue gestionada'
          : estado === 'EN PROCESO'
            ? 'Solicitud del Empleado en tienda... En proceso'
            : 'Tu solicitud del Empleado fue rechazada';

    return {
      id: i + 1111,
      estado,
      hora: '9:41 AM',
      descripcion,
    };
  });
};

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
  const novedades = generarNovedades(10);

  return (
    <div className="text-sm font-bold w-[450px] bg-gray-400 rounded-2xl shadow-inner flex flex-col space-y-3 p-3">
      <div className="flex flex-col space-y-3 max-h-[200px] overflow-y-auto pr-1">
        {novedades.map((novedad, i) => (
          <div
            key={i}
            className="flex items-start bg-white rounded-xl shadow-sm p-3 relative cursor-pointer"
          >
            <div
              className={`w-1.5 h-full rounded-l-md absolute left-0 top-0 bottom-0 ${getColor(
                novedad.estado,
              )}`}
            />
            <div className="pl-3 pr-1 flex-1">
              <p className="text-sm font-semibold text-gray-800">
                {`SOLICITUD #0${novedad.id} ${novedad.estado}`}
              </p>
              <p className="text-xs text-gray-400">{novedad.descripcion}</p>
            </div>
            <span className="text-[10px] text-gray-800 absolute top-2 right-3">
              {novedad.hora}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NovedadesRecientes;
