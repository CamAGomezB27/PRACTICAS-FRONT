import { useEffect, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

interface ErroresArchivoAlertProps {
  errores: string[];
  onClose: () => void;
}

const ErroresArchivoAlert: React.FC<ErroresArchivoAlertProps> = ({
  errores,
  onClose,
}) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setClosing(true), 100000); // autocierre
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (closing) {
      const timer = setTimeout(() => onClose(), 500);
      return () => clearTimeout(timer);
    }
  }, [closing, onClose]);

  return (
    <div
      role="dialog"
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        closing
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 backdrop-blur-sm'
      }`}
    >
      <div
        className={`relative bg-white text-red-600 px-8 py-6 rounded-3xl shadow-2xl border-4 border-red-600 max-w-md w-full mx-4 flex flex-col items-center gap-4 transform transition-all duration-500 ${
          closing
            ? '-translate-y-20 opacity-0 scale-95'
            : 'translate-y-0 opacity-100 scale-100 animate-slideUp'
        }`}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-10 h-10 rounded-full border-2 border-red-600 bg-white text-red-600
             flex items-center justify-center hover:bg-red-600 hover:border-white hover:text-white 
             transition-all duration-300 font-bold text-lg"
          aria-label="Cerrar"
        >
          X
        </button>

        <div className="bg-red-600 text-white p-2 rounded-full shadow-md">
          <FiAlertTriangle className="text-4xl" />
        </div>

        <p className="text-lg font-bold text-center">Archivo no válido</p>

        <ul className="text-sm text-gray-700 list-disc list-inside text-left max-h-52 overflow-y-auto w-full">
          {errores.map((error, idx) => (
            <li key={idx} className="text-red-600">
              {error}
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-2 bg-red-600 text-white px-6 py-2 rounded-md hover:opacity-90 font-semibold transition-opacity duration-200"
        >
          Volver a intentar
        </button>
      </div>
    </div>
  );
};

export default ErroresArchivoAlert;
