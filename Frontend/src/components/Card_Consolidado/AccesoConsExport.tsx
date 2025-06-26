import React from 'react';
import { FaFileAlt, FaList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const ExportacionesConsolidadas: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleConsultar = () => {
    if (user?.esJefe) {
      navigate('/exportacion-consolidados-tienda');
    } else if (user?.esNomina) {
      navigate('/exportacion-consolidados-nomina');
    } else {
      // Fallback en caso de que no tenga ninguno de los roles esperados
      console.warn('Usuario sin rol válido para esta acción');
    }
  };

  return (
    <div className="w-[400px] mt-8 bg-[#4669AF] text-white shadow-xl rounded-xl p-5 hover:scale-[1.03] transition-transform duration-300 cursor-pointer group">
      <div className="flex items-center gap-3 mb-3">
        <FaFileAlt className="text-white" size={26} />
        <h3 className="text-lg font-bold">Histórico de Solicitudes</h3>
      </div>

      <p className="text-sm text-white/90 mb-3">
        Consulta novedades anteriores o descarga el consolidado completo.
      </p>

      <div className="flex justify-center mt-2">
        <button
          className="flex items-center gap-1 bg-white text-[#4669AF] text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors"
          onClick={handleConsultar}
        >
          <FaList size={12} />
          Consultar
        </button>
      </div>
    </div>
  );
};

export default ExportacionesConsolidadas;
