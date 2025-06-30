import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const AlertSeguridad: React.FC = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md shadow-inner max-w-sm">
      {/* Título con ícono al lado */}
      <div className="flex items-center gap-2 mb-2">
        <FiAlertTriangle className="text-yellow-600 text-2xl" />
        <span className="text-yellow-800 font-bold text-base">
          Aviso de Seguridad
        </span>
      </div>

      {/* Cuerpo del mensaje */}
      <p className="text-sm text-yellow-900 leading-snug">
        Este intento de acceso ha sido registrado en los logs del sistema. El
        acceso no autorizado a recursos protegidos puede estar sujeto a medidas
        disciplinarias.
      </p>
    </div>
  );
};

export default AlertSeguridad;
