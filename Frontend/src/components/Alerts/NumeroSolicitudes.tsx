import { useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';

interface NumeroSolicitudesAlertProps {
  onSubmit: (cantidad: number) => void;
  onClose: () => void;
}

const NumeroSolicitudesAlert: React.FC<NumeroSolicitudesAlertProps> = ({
  onSubmit,
  onClose,
}) => {
  const [cantidad, setCantidad] = useState('');
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setClosing(true), 15000); //se cierra
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (closing) {
      const timer = setTimeout(() => onClose(), 500);
      return () => clearTimeout(timer);
    }
  }, [closing, onClose]);

  const handleSubmit = () => {
    const parsed = parseInt(cantidad);
    if (!isNaN(parsed) && parsed > 0) {
      onSubmit(parsed);
      setClosing(true);
    } else {
      alert('Por favor ingresa un número válido.');
    }
  };

  // Solo permitir números en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCantidad(value);
    }
  };

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
        className={`relative bg-white text-[#4669AF] px-8 py-6 rounded-3xl shadow-2xl border-4 border-[#4669AF] max-w-md w-full mx-4 flex flex-col items-center gap-4 transform transition-all duration-500 ${
          closing
            ? '-translate-y-20 opacity-0 scale-95'
            : 'translate-y-0 opacity-100 scale-100 animate-slideUp'
        }`}
      >
        {/* Botón de cerrar (X) mejorado */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-10 h-10 rounded-full border-2 border-[#4669AF] bg-white text-[#4669AF]
             flex items-center justify-center hover:bg-[#4669AF] hover:border-white hover:text-white 
             transition-all duration-300 font-bold text-lg"
          aria-label="Cerrar"
        >
          X
        </button>

        <div className="bg-[#4669AF] text-white p-2 rounded-full shadow-md">
          <FiEdit3 className="text-4xl" />
        </div>

        <p className="text-lg font-bold text-center">
          ¿Cuántas solicitudes vas a subir?
        </p>

        {/* Input de texto simple sin flechas */}
        <input
          type="text"
          value={cantidad}
          onChange={handleInputChange}
          placeholder="Ej: 3"
          className="w-28 text-center border-2 border-[#4669AF] rounded-md px-3 py-2 text-[#4669AF] text-lg font-semibold
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4669AF] focus:border-[#4669AF]
                     bg-white shadow-sm"
          maxLength={3}
        />

        <button
          onClick={handleSubmit}
          className="mt-2 bg-[#4669AF] text-white px-6 py-2 rounded-md hover:opacity-90 font-semibold
                     transition-opacity duration-200"
        >
          Generar Plantilla
        </button>
      </div>
    </div>
  );
};

export default NumeroSolicitudesAlert;
