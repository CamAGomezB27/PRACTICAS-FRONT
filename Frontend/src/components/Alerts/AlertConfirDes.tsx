import React, { useState } from 'react';

interface Props {
  onCerrar: () => void;
  onConfirmar: () => void;
  //   onDescargarPrimero: () => void;
  setMensajeInfo: (mensaje: {
    tipo: 'warning' | 'success';
    texto: string;
  }) => void; // 👈 nuevo prop
}

const FormConfirmarDescarga: React.FC<Props> = ({
  onCerrar,
  onConfirmar,
  setMensajeInfo,
}) => {
  const [cerrando, setCerrando] = useState(false);

  const cerrarAnimado = () => {
    setCerrando(true);
    setTimeout(() => onCerrar(), 300);
  };

  const handleNo = () => {
    setTimeout(() => {
      cerrarAnimado();
      setMensajeInfo({
        tipo: 'warning',
        texto: 'Primero descarga el archivo antes de gestionar la solicitud.',
      });
    }, 500);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ${
        cerrando
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 backdrop-blur-sm'
      }`}
    >
      <div
        className={`relative bg-white border-4 border-[#4669AF] text-[#4669AF] px-8 py-6 rounded-3xl shadow-2xl max-w-md w-full mx-4 flex flex-col items-center gap-4 transform transition-all duration-300 ${
          cerrando
            ? 'scale-95 opacity-0 translate-y-6'
            : 'scale-100 opacity-100'
        }`}
      >
        {/* Botón cerrar */}
        <button
          onClick={cerrarAnimado}
          className="absolute top-3 right-3 w-10 h-10 rounded-full border-2 border-[#4669AF] bg-white text-[#4669AF]
             flex items-center justify-center hover:bg-[#4669AF] hover:text-white hover:border-white transition-all duration-300 text-lg"
          aria-label="Cerrar"
        >
          ×
        </button>

        {/* Título */}
        <h2 className="text-xl font-bold text-center">
          ¿Ya descargaste el archivo?
        </h2>

        <p className="text-sm text-gray-600 text-center">
          Debes descargar el archivo de respuestas antes de gestionar esta
          solicitud.
        </p>

        {/* Acciones */}
        <div className="flex flex-col gap-3 w-full pt-2">
          <button
            onClick={handleNo}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition-colors"
          >
            No
          </button>

          <button
            onClick={() => {
              onConfirmar(); //  Si ya descargó → pasar normal
              setMensajeInfo({
                tipo: 'success',
                texto: 'Continúa con tu gestión. ¡Gracias por confirmar!',
              });
              cerrarAnimado();
            }}
            className="bg-[#4669AF] hover:bg-[#3a5a9b] text-white font-semibold py-2 rounded-lg transition-all"
          >
            Sí, ya lo descargué
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormConfirmarDescarga;
