import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import {
  FaBus,
  FaClock,
  FaFileAlt,
  FaFileSignature,
  FaList,
  FaMoneyBillAlt,
  FaUmbrellaBeach,
} from 'react-icons/fa';
import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import {
  Estado,
  getColorPorEstado,
  getIconoPorEstado,
} from '../../../utils/iconosPorEstado';
import { getMensajePorEstado } from '../../../utils/mensajesPorEstado';

interface DetalleNovedad {
  id_novedad: number;
  tipo: string;
  estado: Estado;
  tienda: string;
  fecha: string;
  cedula: string;
  nombre: string;
  detalle: string;
}

// Íconos por tipo de novedad
const iconMap: Record<string, ReactElement> = {
  FaBus: <FaBus className="text-white text-2xl" />,
  FaMoneyBillAlt: <FaMoneyBillAlt className="text-white text-2xl" />,
  FaClock: <FaClock className="text-white text-2xl" />,
  FaFileSignature: <FaFileSignature className="text-white text-2xl" />,
  FaFileAlt: <FaFileAlt className="text-white text-2xl" />,
  FaUmbrellaBeach: <FaUmbrellaBeach className="text-white text-2xl" />,
  FaList: <FaList className="text-white text-2xl" />,
};

const FormVistaPrevIndiv = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const { iconName } = location.state || {};

  const [novedad, setNovedad] = useState<DetalleNovedad | null>(null);

  useEffect(() => {
    if (id) {
      console.log('🌐 Haciendo petición GET al backend con id:', id);
      axios
        .get<DetalleNovedad>(`http://localhost:3000/novedad/${id}/individual`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log('✅ Respuesta del backend:', res.data);
          setNovedad(res.data);
        })
        .catch((err) => console.error('❌ Error al cargar novedad:', err));
    }
  }, [id]);

  if (!novedad) {
    console.log('⏳ Cargando novedad...');
    return <p className="text-center">Cargando novedad...</p>;
  }

  const mensajeTexto = getMensajePorEstado(
    novedad.estado,
    user?.esNomina ?? false,
    true,
  );
  const iconoEstado = getIconoPorEstado(novedad.estado, user?.esNomina);

  const formatearFecha = (fecha: string | Date | null | undefined): string => {
    if (!fecha) return '';
    const date = new Date(fecha);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('es-CO', {
      timeZone: 'UTC',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white">
      <div className="bg-white p-2 rounded-lg border border-gray-300 shadow-[2px_8px_12px_rgba(0,0,0,0.8)] hover:shadow-[4px_10px_14px_rgba(0,0,0,1)] hover:scale-105 transition-all duration-300">
        {/* Cabecera */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${getColorPorEstado(
                novedad.estado,
              )}`}
            >
              {iconMap[iconName] ?? <FaList className="text-white text-2xl" />}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {novedad.tipo}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                {iconoEstado}
                <span className="text-xs font-semibold text-gray-500">
                  {mensajeTexto}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                Solicitud #{novedad.id_novedad} • {novedad.tienda}{' '}
                {novedad.fecha && `/ ${formatearFecha(novedad.fecha)}`}
              </p>
            </div>
            <span
              className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${getColorPorEstado(
                novedad.estado,
              )}`}
            >
              {novedad.estado}
            </span>
          </div>
        </div>

        {/* Campos del formulario */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Cédula del Empleado
              </label>
              <input
                title="cedula"
                value={novedad.cedula}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 text-black"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nombres Completos
              </label>
              <input
                title="nombre"
                value={novedad.nombre}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 text-black"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">
                Detalle de la Novedad
              </label>
              <textarea
                title="detalle"
                value={novedad.detalle}
                disabled
                rows={4}
                className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 text-black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormVistaPrevIndiv;
