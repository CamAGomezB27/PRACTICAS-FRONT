import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MasivoProps {
  tipo: string;
}

const Masivo: React.FC<MasivoProps> = ({ tipo }) => {
  const navigate = useNavigate();

  console.log('Tipo de solicitud', tipo);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.xlsx')) {
      console.log('Archivo recibido:', file.name);
      // Aquí podrías hacer la carga con FormData si deseas
    } else {
      alert('Por favor sube un archivo .xlsx válido.');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
      {/* Pasos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {/* Paso 1 */}
        <div className="border rounded p-4 shadow border-black">
          <div className="w-8 h-8 rounded-full bg-[#4669AF] mx-auto flex items-center justify-center font-bold text-sm">
            1
          </div>
          <p className="font-semibold mt-2">Descarga la plantilla</p>
          <p className="text-sm text-gray-600 mt-1">
            Descarga la plantilla con el formato requerido por Nómina
          </p>
          <button
            onClick={() => window.open(``)}
            className="mt-2 bg-gray-800 text-white px-4 py-1 rounded hover:opacity-90"
          >
            Descargar Plantilla
          </button>
        </div>

        {/* Paso 2 */}
        <div className="border rounded p-4 shadow border-black">
          <div className="w-8 h-8 rounded-full bg-[#4669AF] mx-auto flex items-center justify-center font-bold text-sm">
            2
          </div>
          <p className="font-semibold mt-2">Llenar información</p>
          <p className="text-sm text-gray-600 mt-1">
            Completa la información requerida para <strong>{tipo}</strong> de
            acuerdo al formato del archivo.
          </p>
        </div>

        {/* Paso 3 */}
        <div className="border rounded p-4 shadow border-black">
          <div className="w-8 h-8 rounded-full bg-[#4669AF] mx-auto flex items-center justify-center font-bold text-sm">
            3
          </div>
          <p className="font-semibold mt-2">Subir Archivo</p>
          <p className="text-sm text-gray-600 mt-1">
            Cargar archivo completo con tus solicitudes a procesar
          </p>
          <button className="mt-2 bg-gray-800 text-white px-4 py-1 rounded hover:opacity-90">
            Subir Archivo
          </button>
        </div>
      </div>

      {/* Zona de arrastrar y soltar archivo */}
      <div
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        className="border border-dashed border-black p-2 rounded text-center"
      >
        <p className="font-semibold">Arrastra y suelta tu archivo aquí</p>
        <p className="text-sm text-gray-500">
          Recuerda que debe ser .xlsx con nuestro formato para poder revisar de
          manera correcta tu solicitud
        </p>
      </div>

      {/* Botón regresar */}
      <div className="flex justify-end p-2">
        <button
          className="bg-[#4669AF] text-white px-8 py-1 rounded-lg hover:opacity-90"
          onClick={() => navigate('/dashboard-jefe')}
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default Masivo;
