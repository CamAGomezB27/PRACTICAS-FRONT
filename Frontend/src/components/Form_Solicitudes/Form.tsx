import React, { useState } from 'react';
import Individual from './FormIndivi';
import Masivo from './FormMasivo';
import { FaBus } from 'react-icons/fa';
import { FaFileAlt } from 'react-icons/fa';

const FormSolicitudes: React.FC = () => {
  const [modoMasivo, setMasivo] = useState(false);

  const handleToggle = () => setMasivo((prev) => !prev);

  return (
    <section className="bg-white shadow-lg px-8  rounded-md w-full max-w-4xl mx-auto relative">
      {/* TITULO */}
      <div className="text-black flex items-center gap-2 mb-2 justify-center">
        <FaBus size={20} />
        <h2 className="font-bold text-lg"> Auxilio de Transporte </h2>
      </div>

      {/* LINEA DIVISIÓN */}
      <div className="border-t border-black mb-4" />

      {/* DESCRIPCIÓN Y SWITCH */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-black text-sm">
          Gestionar las novedades de Auxilio de Transporte para tus empleados
        </p>
        <div className="text-black flex items-center gap-2 text-sm font-medium">
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
