import React from 'react';

interface Props {
  cantidad: number;
  estadoSeleccionado: string;
  onEstadoChange: (estado: string) => void;
}

const BarraInformativaTiendas: React.FC<Props> = ({
  cantidad,
  estadoSeleccionado,
  onEstadoChange,
}) => {
  return (
    <div className="w-full bg-[#4669AF] text-white flex items-center justify-between px-4 py-2 rounded-full shadow-md text-sm font-semibold mb-2">
      <span>
        Hay {cantidad}{' '}
        {estadoSeleccionado === 'TODAS'
          ? 'Solicitudes'
          : `Solicitudes en estado ${estadoSeleccionado}`}
      </span>

      <select
        title="Estados"
        value={estadoSeleccionado}
        onChange={(e) => onEstadoChange(e.target.value)}
        className="bg-gray-500 text-white text-sm px-3 py-1 rounded-md focus:outline-none cursor-pointer"
      >
        <option value="TODAS">Todas</option>
        <option value="PENDIENTE">Pendiente</option>
        <option value="EN GESTIÓN">En Gestión</option>
        <option value="GESTIONADA">Gestionada</option>
      </select>
    </div>
  );
};

export default BarraInformativaTiendas;
