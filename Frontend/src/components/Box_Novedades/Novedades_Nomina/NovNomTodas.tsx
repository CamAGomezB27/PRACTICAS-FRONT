import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import {
  getColorPorEstado,
  getIconoPorEstado,
} from '../../../utils/iconosPorEstado';
import { getMensajePorEstado } from '../../../utils/mensajesPorEstado';
import AlertFiltros from '../../Alerts/AlertFiltros';

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

const NovedadesNomTodas: React.FC<Props> = ({
  filtros,
  estado,
  onCantidadChange,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [novedades, setNovedades] = useState<Novedad[]>([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

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
      setMostrarAlerta(data.length === 0);
      onCantidadChange?.(data.length);
    } catch (error) {
      console.error('Error al obtener novedades: ', error);
      setMostrarAlerta(true);
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
    <div className="text-sm font-bold w-full bg-white rounded-2xl shadow-md flex flex-col space-y-4 p-2 overflow-y-auto max-h-[450px]">
      {novedades.map((novedad) => {
        const tiendaNombre =
          novedad.usuario?.usuario_tienda?.[0]?.tienda?.nombre_tienda ??
          'Sin tienda asociada';
        const estadoVisual = mostrarEstado(
          novedad.estado_novedad.nombre_estado,
        );
        const mensajeTexto = getMensajePorEstado(
          estadoVisual,
          user?.esNomina ?? false,
        );

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
            <span
              className={`text-xs font-semibold text-white px-2 py-1 rounded-full ${getColorPorEstado(estadoVisual)}`}
            ></span>

            {/* Contenido */}
            <div
              className="p-4 flex flex-col cursor-pointer"
              onClick={() =>
                navigate(
                  `/vista-previa-masiva-novedad-nomina/${novedad.id_novedad}`,
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
              <div className="flex justify-between items-start">
                <div className="pl-1 pr-2 flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {`SOLICITUD #0${novedad.id_novedad} ${estadoVisual} - ${
                      novedad.tipo_novedad?.nombre_tipo ?? 'Sin tipo'
                    }`}
                  </p>

                  {mensajeTexto && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      {getIconoPorEstado(estadoVisual, user?.esNomina)}
                      <span>{mensajeTexto}</span>
                    </div>
                  )}
                </div>

                <span
                  className={`text-xs font-semibold text-white px-2 py-1 rounded-full ${getColorPorEstado(
                    estadoVisual,
                  )}`}
                >
                  {estadoVisual}
                </span>
              </div>

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
                {estadoVisual !== 'GESTIONADA' && (
                  <div className="flex gap-4 items-center mt-4">
                    {/* BOTÓN GESTIONAR */}
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        await gestionarNovedad(novedad.id_novedad); // ✅ SOLO acá se cambia el estado
                        navigate(
                          `/vista-previa-masiva-novedad-nomina/${novedad.id_novedad}`,
                          {
                            state: {
                              ...stateVista,
                              modoGestionInicial: true,
                            },
                          },
                        );
                      }}
                      className="bg-[#4669AF] hover:bg-[#3a5a9b] text-white text-xs px-6 py-1.5 rounded-md focus:outline-none"
                    >
                      Gestionar
                    </button>

                    {/* BOTÓN VER */}
                    {estadoVisual !== 'EN GESTIÓN' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/vista-previa-masiva-novedad-nomina/${novedad.id_novedad}`,
                            {
                              state: {
                                ...stateVista,
                                modoGestionInicial: false, // ✅ MODO VER
                              },
                            },
                          );
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-6 py-1.5 rounded-md focus:outline-none"
                      >
                        Ver
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {mostrarAlerta && (
        <AlertFiltros onClose={() => setMostrarAlerta(false)} />
      )}
    </div>
  );
};

export default NovedadesNomTodas;
