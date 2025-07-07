import React, { useState } from 'react';
import {
  FaBus,
  FaClock,
  FaFileAlt,
  FaFileSignature,
  FaList,
  FaMoneyBillAlt,
  FaUmbrellaBeach,
} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Individual from './FormIndivi';
import Masivo from './FormMasivo';

// Mapeo de íconos
const iconMap = {
  FaBus: <FaBus size={20} />,
  FaMoneyBillAlt: <FaMoneyBillAlt size={20} />,
  FaFileAlt: <FaFileAlt size={20} />,
  FaClock: <FaClock size={20} />,
  FaFileSignature: <FaFileSignature size={20} />,
  FaUmbrellaBeach: <FaUmbrellaBeach size={20} />,
  FaList: <FaList size={20} />,
};

// claves del iconMap
type IconKey = keyof typeof iconMap;

const FormSolicitudes: React.FC = () => {
  const { state } = useLocation();

  const titulo = state?.titulo || 'Título por defecto';
  const iconName = state?.iconName;
  const icon =
    iconName && iconName in iconMap ? (
      iconMap[iconName as IconKey]
    ) : (
      <FaFileAlt size={20} />
    );

  const [modoMasivo, setMasivo] = useState(false);

  const handleToggle = () => setMasivo((prev) => !prev);

  // Sombra dinámica según el modo
  const hoverShadow = modoMasivo
    ? 'hover:shadow-[4px_8px_15px_rgba(10,10,200,1.5)]' // masivo
    : 'hover:shadow-[4px_8px_15px_rgba(200,10,10,1.5)]'; // individual

  return (
    <section
      className={`bg-white px-8 rounded-lg w-full max-w-5xl mx-auto relative shadow-[2px_8px_12px_rgba(0,0,0,0.8)] ${hoverShadow} transform hover:scale-105 transition-all duration-300 ease-in-out hover:-translate-y-2`}
    >
      {/* TITULO */}
      <div className="text-black flex items-center gap-2 mb-2 justify-center">
        {icon}
        <h2 className="font-bold text-lg"> {titulo} </h2>
      </div>

      {/* LINEA DIVISIÓN */}
      <div className="border-t border-black mb-4" />

      {/* DESCRIPCIÓN Y SWITCH */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-black text-sm">
            Gestionar las novedades de {titulo} para tus empleados
          </p>
        </div>
        <div className="text-black flex flex-col items-end gap-1 text-sm font-medium">
          <p className="text-xs text-gray-700 mb-1 mr-1">
            ¿De qué modo quieres subir tu novedad?
          </p>
          <div className="flex items-center gap-2 -mt-1">
            <span className={!modoMasivo ? 'font-bold' : ''}>Individual</span>
            <label
              className="relative inline-flex items-center cursor-pointer"
              aria-label="Cambiar modo de formulario"
            >
              <input
                type="checkbox"
                className="sr-only peer"
                checked={modoMasivo}
                onChange={handleToggle}
                title="Cambiar entre modo individual y masivo"
              />
              <div className="w-11 h-6 bg-red-600 rounded-full peer peer-checked:bg-blue-600 transition-all" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </label>
            <span className={modoMasivo ? 'font-bold' : ''}>Masivo</span>
          </div>
        </div>
      </div>

      {/* INFORMACIÓN DE FORMULARIOS */}
      <div className="flex items-center gap-2 font-bold text-sm border-b border-black pb-1 mb-4 text-black">
        <FaFileAlt size={20} />
        <h3>Información de Solicitud</h3>
      </div>

      {/* FORMULARIOS DINAMICOS */}
      {modoMasivo ? <Masivo /> : <Individual />}
    </section>
  );
};

export default FormSolicitudes;
