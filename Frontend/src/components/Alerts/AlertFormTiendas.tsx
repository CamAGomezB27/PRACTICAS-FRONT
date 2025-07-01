import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface FormElegirTiendaProps {
  onClose: () => void;
  onSelect: (tienda: string) => void;
}

interface Tienda {
  id_tienda: number;
  nombre_tienda: string;
}
const FormElegirTienda: React.FC<FormElegirTiendaProps> = ({
  onClose,
  onSelect,
}) => {
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [tiendaSeleccionada, setTiendaSeleccionada] = useState('');

  useEffect(() => {
    const fetchTiendas = async () => {
      try {
        const res = await axios.get<Tienda[]>('http://localhost:3000/tiendas', {
          withCredentials: true,
        });
        setTiendas(res.data);
      } catch (error) {
        console.error('❌ Error cargando tiendas:', error);
      }
    };

    fetchTiendas();
  }, []);

  const [closing, setClosing] = useState(false);

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

  const navigate = useNavigate();

  const handleTiendaSelect = (tienda: string) => {
    navigate('/solicitudes-por-tiendas', {
      state: { tiendaSeleccionada: tienda },
    });
  };

  const handleSubmit = () => {
    if (tiendaSeleccionada) {
      onSelect(tiendaSeleccionada);
      handleTiendaSelect(tiendaSeleccionada);
      setClosing(true);
    } else {
      alert('Por favor selecciona una tienda');
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

        {/* Ícono decorativo */}
        <div className="bg-[#4669AF] text-white p-2 rounded-full shadow-md">
          <FiMapPin className="text-4xl" />
        </div>

        <p className="text-lg font-bold text-center">
          Selecciona la tienda que deseas revisar
        </p>

        <select
          title="Tienda"
          name="tienda"
          value={tiendaSeleccionada}
          onChange={(e) => setTiendaSeleccionada(e.target.value)} // <--- esta línea es clave
          className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-[#4669AF] cursor-pointer"
        >
          <option value="">Todas las Tiendas</option>
          {tiendas.map((tienda) => (
            <option key={tienda.id_tienda} value={tienda.nombre_tienda}>
              {tienda.nombre_tienda}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="mt-2 bg-[#4669AF] text-white px-6 py-2 rounded-md hover:opacity-90 font-semibold
                     transition-opacity duration-200"
        >
          Ver Solicitudes
        </button>
      </div>
    </div>
  );
};

export default FormElegirTienda;
