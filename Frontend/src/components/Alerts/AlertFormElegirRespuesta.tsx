import React, { useEffect, useRef, useState } from 'react';
import { FiDownload, FiUploadCloud } from 'react-icons/fi';

interface FormAccionMasivaProps {
  onClose: () => void;
  onArchivoSeleccionado: (file: File) => void;
  onSeleccionarDescargar: () => void; // <- aquí devuelves control para navegar desde el padre
}

const FormAccionMasiva: React.FC<FormAccionMasivaProps> = ({
  onClose,
  onArchivoSeleccionado,
  onSeleccionarDescargar,
}) => {
  const [closing, setClosing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setClosing(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (closing) {
      const timer = setTimeout(() => onClose(), 500);
      return () => clearTimeout(timer);
    }
  }, [closing, onClose]);

  const handleCargarArchivo = () => {
    inputRef.current?.click();
  };

  const handleArchivoSeleccionado = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onArchivoSeleccionado(file);
      setClosing(true);
    }
  };

  const handleDescargar = () => {
    onSeleccionarDescargar(); // solo se lo delegamos al padre
    setClosing(true);
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
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-10 h-10 rounded-full border-2 border-[#4669AF] bg-white text-[#4669AF]
             flex items-center justify-center hover:bg-[#4669AF] hover:border-white hover:text-white 
             transition-all duration-300 font-bold text-lg"
          aria-label="Cerrar"
        >
          X
        </button>

        <h2 className="text-lg font-bold text-center">¿Qué deseas hacer?</h2>
        <p className="text-sm text-gray-600 text-center">
          Puedes cargar un archivo de respuesta o descargar la plantilla para
          gestionar.
        </p>

        <div className="flex flex-col gap-4 w-full mt-2">
          {/* Botón cargar */}
          <button
            onClick={handleCargarArchivo}
            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <FiUploadCloud className="text-xl" />
            Cargar archivo de respuesta
          </button>

          {/* Botón descargar */}
          <button
            onClick={handleDescargar}
            className="flex items-center justify-center gap-2 bg-[#4669AF] hover:brightness-110 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            <FiDownload className="text-xl" />
            Descargar archivo para gestionar
          </button>
        </div>

        {/* Input oculto para el archivo */}
        <input
          title="subir"
          type="file"
          accept=".xlsx"
          className="hidden"
          ref={inputRef}
          onChange={handleArchivoSeleccionado}
        />
      </div>
    </div>
  );
};

export default FormAccionMasiva;
