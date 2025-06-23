import { useEffect, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface ExitoArchivoAlertProps {
  nombreArchivo: string;
  tituloNovedad: string;
  idCaso: number;
  onClose: () => void;
}

const ExitoArchivoAlert: React.FC<ExitoArchivoAlertProps> = ({
  nombreArchivo,
  tituloNovedad,
  idCaso,
  onClose,
}) => {
  const [closing, setClosing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setClosing(true), 6000); // autocierre
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (closing) {
      const timer = setTimeout(() => {
        onClose();
        navigate('/dashboard-jefe');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [closing, onClose, navigate]);

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
        className={`relative bg-white text-green-600 px-8 py-6 rounded-3xl shadow-2xl border-4 border-green-600 max-w-md w-full mx-4 flex flex-col items-center gap-4 transform transition-all duration-500 ${
          closing
            ? '-translate-y-20 opacity-0 scale-95'
            : 'translate-y-0 opacity-100 scale-100 animate-slideUp'
        }`}
      >
        {/* Ícono */}
        <div className="bg-green-600 text-white p-2 rounded-full shadow-md">
          <FiCheckCircle className="text-4xl" />
        </div>

        <p className="text-lg font-bold text-center">
          Archivo subido con éxito
        </p>

        <div className="text-sm text-gray-700 text-center space-y-1">
          <p>
            Su novedad de <strong>{tituloNovedad}</strong> fue creada con el
            código <strong>CASO-{idCaso}</strong> usando el archivo{' '}
            <strong>{nombreArchivo}</strong>.
          </p>
          <p className="text-gray-600 italic">
            No olvides estar pendiente del estado de esta solicitud en tu panel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExitoArchivoAlert;
