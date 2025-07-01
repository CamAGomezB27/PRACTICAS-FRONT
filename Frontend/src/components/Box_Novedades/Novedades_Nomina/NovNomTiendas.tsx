import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';

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

interface Props {
  filtros?: {
    tienda: string;
    tipo: string;
    desde: string;
    hasta: string;
  };
  estado?: string;
  onCantidadChange?: (cantidad: number) => void;
}

const getColor = (estado: Estado) => {
  switch (estado) {
    case 'CREADA':
    case 'PENDIENTE':
      return 'bg-blue-600';
    case 'GESTIONADA':
      return 'bg-green-500';
    case 'EN GESTIÓN':
      return 'bg-yellow-400';
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

const getMensajePorEstado = (estado: Estado, esNomina?: boolean): string => {
  if (esNomina) {
    switch (estado) {
      case 'CREADA':
      case 'PENDIENTE':
        return '📤 Solicitud recibida. Aún no ha sido gestionada.';
      case 'EN GESTIÓN':
        return '🛠️ Se está gestionando esta novedad.';
      case 'GESTIONADA':
        return '✅ Validación completada. Esta novedad ya fue gestionada.';
      default:
        return '';
    }
  } else {
    switch (estado) {
      case 'CREADA':
      case 'PENDIENTE':
        return '✅ Archivo subido correctamente. Tu solicitud está lista para ser validada por el equipo de Nómina.';
      case 'EN GESTIÓN':
        return '🔄 El equipo de Nómina se encuentra validando tus solicitudes de esta novedad.';
      case 'GESTIONADA':
        return '📋 El equipo de Nómina ya validó tu novedad. Verifica si hay anotaciones o comentarios.';
      default:
        return '';
    }
  }
};

const NovedadesNomTiendas: React.FC<Props> = ({
  filtros,
  onCantidadChange,
  estado,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [novedades, setNovedades] = useState<Novedad[]>([]);

  const mostrarEstado = useCallback(
    (estado: Estado): Estado => {
      return user?.esNomina && estado === 'CREADA' ? 'PENDIENTE' : estado;
    },
    [user?.esNomina],
  );

  const fetchNovedades = useCallback(async () => {
    try {
      const response = await axios.get<Novedad[]>(
        'http://localhost:3000/novedad/todas-las-novedades',
        { params: filtros, withCredentials: true },
      );

      let data = response.data;

      if (estado && estado !== 'TODAS') {
        data = data.filter((n) => {
          const nombreEstado = mostrarEstado(n.estado_novedad.nombre_estado);
          return nombreEstado === estado;
        });
      }

      setNovedades(data);
      onCantidadChange?.(data.length);
    } catch (error) {
      console.error('Error al obtener novedades: ', error);
    }
  }, [filtros, estado, onCantidadChange, mostrarEstado]);

  useEffect(() => {
    fetchNovedades();
    const interval = setInterval(fetchNovedades, 10000);
    return () => clearInterval(interval);
  }, [fetchNovedades]);

  const gestionarNovedad = async (id_novedad: number) => {
    try {
      await axios.put(
        `http://localhost:3000/novedad/${id_novedad}/cambiar-estado`,
        { nuevoEstadoId: 2 }, //2 = EN GESTIÓN
        { withCredentials: true },
      );

      fetchNovedades();
    } catch (error) {
      console.error('❌ Error al cambiar el estado:', error);
      alert('No se pudo actualizar la novedad.');
    }
  };

  return (
    <div className="text-sm font-bold w-full bg-white rounded-2xl shadow-md flex flex-col space-y-4 p-2 overflow-y-auto max-h-[500px]">
      {novedades.map((novedad) => {
        const tiendaNombre =
          novedad.usuario?.usuario_tienda?.[0]?.tienda?.nombre_tienda ??
          'Sin tienda asociada';
        const estadoVisual = mostrarEstado(
          novedad.estado_novedad.nombre_estado,
        );
        const mensaje = getMensajePorEstado(estadoVisual, user?.esNomina);

        const stateVista = {
          id_novedad: novedad.id_novedad,
          descripcion: novedad.descripcion,
          tipo: novedad.tipo_novedad?.nombre_tipo ?? 'Sin tipo',
          estado: estadoVisual,
          tienda: tiendaNombre,
          fecha: novedad.fecha_creacion,
          cantidad: novedad.cantidad_solicitudes ?? 'N/A',
          iconName: getIconNameByTipoNovedad(novedad.tipo_novedad?.nombre_tipo),
        };

        return (
          <div
            key={novedad.id_novedad}
            className="flex flex-col bg-white rounded-xl shadow border border-gray-200 hover:shadow-lg transition-all duration-150 transform hover:scale-[1.01]"
          >
            {/* Línea lateral por estado */}
            <div
              className={`w-full h-3 rounded-t-md ${getColor(estadoVisual)}`}
            />

            {/* Contenido */}
            <div
              className="p-4 flex flex-col cursor-pointer"
              onClick={() =>
                navigate(`/vista-previa-masiva-tienda/${novedad.id_novedad}`, {
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
                })
              }
            >
              <div className="flex justify-between items-start">
                <p className="text-gray-800">
                  {`Solicitud ${novedad.es_masiva ? 'Masiva' : 'Individual'} ${novedad.tipo_novedad?.nombre_tipo ? `- ${novedad.tipo_novedad.nombre_tipo}` : ''}`}
                </p>

                <span
                  className={`text-xs font-semibold text-white px-2 py-1 rounded-full ${getColor(
                    estadoVisual,
                  )}`}
                >
                  {estadoVisual}
                </span>
              </div>

              <div className="text-xs text-gray-500 mt-1">{mensaje}</div>

              <div className="flex items-center justify-between mt-2 text-xs text-black">
                <div className="flex flex-col">
                  <span>{tiendaNombre}</span>
                  <span className="text-gray-500">
                    {new Date(novedad.fecha_creacion).toLocaleDateString(
                      'es-CO',
                      {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      },
                    )}
                  </span>
                  {novedad.es_masiva && (
                    <span className="italic text-[11px] mt-1 text-gray-500">
                      Con archivo adjunto •{' '}
                      <span className="text-yellow-400 font-semibold">
                        {novedad.cantidad_solicitudes ?? 'N/A'} Solicitudes
                      </span>
                    </span>
                  )}
                </div>

                <div className="flex gap-4 items-center mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      gestionarNovedad(novedad.id_novedad);
                      navigate(
                        `/vista-previa-masiva-novedad-nomina/${novedad.id_novedad}`,
                        {
                          state: stateVista,
                        },
                      );
                      console.log('Gestionar', novedad.id_novedad);
                    }}
                    className="bg-[#4669AF] hover:bg-[#3a5a9b] text-white text-xs px-6 py-1.5 rounded-md focus:outline-none"
                  >
                    Gestionar
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/vista-previa-masiva-novedad-nomina/${novedad.id_novedad}`,
                        {
                          state: stateVista,
                        },
                      );
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-6 py-1.5 rounded-md focus:outline-none"
                  >
                    Ver
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NovedadesNomTiendas;
