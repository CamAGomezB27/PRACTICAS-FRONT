import axios from 'axios';
import React, { useEffect, useState, type ReactNode } from 'react';
import {
  FiCheckCircle,
  FiRefreshCw,
  FiTool,
  FiUploadCloud,
} from 'react-icons/fi';
import { HiOutlineDocumentCheck } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

interface MensajeEstado {
  icono: ReactNode;
  texto: string;
}

type Estado =
  | 'CREADA'
  | 'GESTIONADA'
  | 'EN GESTIÓN'
  | 'RECHAZADA'
  | 'PENDIENTE';

interface Novedad {
  id_novedad: number;
  descripcion: string;
  fecha_creacion: string;
  estado_novedad: {
    nombre_estado: Estado;
  };
  tipo_novedad?: {
    nombre_tipo: string;
  };
  usuario: {
    usuario_tienda: {
      tienda: {
        nombre_tienda: string;
      };
    }[];
  };
  es_masiva?: boolean;
  cantidad_solicitudes?: number;
}

const getColor = (estado: Estado) => {
  switch (estado) {
    case 'CREADA':
    case 'PENDIENTE':
      return 'bg-blue-500';
    case 'GESTIONADA':
      return 'bg-green-500';
    case 'EN GESTIÓN':
      return 'bg-yellow-500';
    case 'RECHAZADA':
      return 'bg-red-500';
  }
};

function getIconNameByTipoNovedad(tipo: string = ''): string {
  const tipoLower = tipo.toLowerCase();

  if (tipoLower.includes('transporte')) return 'FaBus';
  if (tipoLower.includes('descuento')) return 'FaMoneyBillAlt';
  if (tipoLower.includes('hora') || tipoLower.includes('extra'))
    return 'FaClock';
  if (tipoLower.includes('definitivo')) return 'FaFileSignature';
  if (tipoLower.includes('temporal')) return 'FaFileAlt';
  if (tipoLower.includes('vacaciones')) return 'FaUmbrellaBeach';

  return 'FaList';
}

const NovedadesRecientes: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [novedades, setNovedades] = useState<Novedad[]>([]);

  const fetchNovedades = async () => {
    try {
      const response = await axios.get<Novedad[]>(
        'http://localhost:3000/novedad',
        { withCredentials: true },
      );
      setNovedades(response.data);
    } catch (error) {
      console.error('Error al obtener novedades: ', error);
    }
  };

  useEffect(() => {
    fetchNovedades();
    const interval = setInterval(fetchNovedades, 10000);
    return () => clearInterval(interval);
  }, []);

  const mostrarEstado = (novedad: Novedad): Estado => {
    const estadoReal = novedad.estado_novedad.nombre_estado;
    if (user?.esNomina && estadoReal === 'CREADA') return 'PENDIENTE';
    return estadoReal;
  };

  const getMensajePorEstado = (
    estado: Estado,
    esNomina?: boolean,
  ): MensajeEstado => {
    if (esNomina) {
      switch (estado) {
        case 'CREADA':
        case 'PENDIENTE':
          return {
            icono: <FiUploadCloud className="text-xl text-blue-600" />,
            texto: 'Solicitud recibida. Aún no ha sido gestionada.',
          };
        case 'EN GESTIÓN':
          return {
            icono: <FiTool className="text-xl text-yellow-600" />,
            texto: 'Se está gestionando esta novedad.',
          };
        case 'GESTIONADA':
          return {
            icono: <FiCheckCircle className="text-xl text-green-600" />,
            texto: 'Validación completada. Esta novedad ya fue gestionada.',
          };
        default:
          return { icono: <></>, texto: '' };
      }
    } else {
      switch (estado) {
        case 'CREADA':
        case 'PENDIENTE':
          return {
            icono: <FiUploadCloud className="text-xl text-blue-600" />,
            texto:
              'Archivo subido correctamente. Tu solicitud está lista para ser validada por el equipo de Nómina.',
          };
        case 'EN GESTIÓN':
          return {
            icono: (
              <FiRefreshCw className="text-xl text-yellow-600 animate-spin-slow" />
            ),
            texto:
              'El equipo de Nómina se encuentra validando tus solicitudes de esta novedad.',
          };
        case 'GESTIONADA':
          return {
            icono: (
              <HiOutlineDocumentCheck className="text-xl text-green-600" />
            ),
            texto:
              'El equipo de Nómina ya validó tu novedad. Verifica si hay anotaciones o comentarios.',
          };
        default:
          return { icono: <></>, texto: '' };
      }
    }
  };

  return (
    <div className="text-sm font-bold w-[500px] bg-gray-400 rounded-2xl shadow-inner flex flex-col space-y-3 p-3">
      <div className="flex flex-col space-y-3 max-h-[200px] overflow-y-auto pr-1">
        {novedades.map((novedad) => {
          const tiendaNombre =
            novedad.usuario?.usuario_tienda?.[0]?.tienda?.nombre_tienda ??
            'Sin tienda asociada';

          const estadoVisual = mostrarEstado(novedad);
          const mensaje = getMensajePorEstado(estadoVisual, user?.esNomina);

          return (
            <div
              key={novedad.id_novedad}
              className="flex items-start bg-white rounded-xl shadow-sm p-3 relative cursor-pointer transform transition-transform duration-150 hover:scale-[1.01]"
              onClick={() =>
                navigate(
                  user?.esNomina
                    ? `/vista-previa-masiva-novedad-nomina/${novedad.id_novedad}`
                    : `/vista-previa-masiva-tienda/${novedad.id_novedad}`,
                  {
                    state: {
                      id_novedad: novedad.id_novedad,
                      descripcion: novedad.descripcion,
                      tipo: novedad.tipo_novedad?.nombre_tipo ?? 'Sin tipo',
                      estado: estadoVisual,
                      tienda: tiendaNombre,
                      fecha: novedad.fecha_creacion,
                      cantidad: novedad.cantidad_solicitudes ?? 'N/A',
                      iconName: getIconNameByTipoNovedad(
                        novedad.tipo_novedad?.nombre_tipo,
                      ),
                    },
                  },
                )
              }
            >
              <div
                className={`w-1.5 h-full rounded-l-md absolute left-0 top-0 bottom-0 ${getColor(
                  estadoVisual,
                )}`}
              />
              <div className="pl-3 pr-1 flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {`SOLICITUD #0${novedad.id_novedad} ${estadoVisual} - ${
                    novedad.tipo_novedad?.nombre_tipo ?? 'Sin tipo'
                  }`}
                </p>

                {mensaje && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>{mensaje.icono}</span>
                    <span>{mensaje.texto}</span>
                  </div>
                )}

                {novedad.es_masiva && (
                  <p className="text-[10px] text-gray-500 italic">
                    Tienda: {tiendaNombre} • Solicitudes:{' '}
                    {novedad.cantidad_solicitudes ?? 'N/A'} • 📎 Archivo adjunto
                  </p>
                )}
              </div>
              <span className="text-[10px] text-gray-800 absolute top-2 right-3">
                {new Date(novedad.fecha_creacion).toLocaleTimeString('es-CO', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NovedadesRecientes;
