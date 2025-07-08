import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import {
  getColorPorEstado,
  getIconNamePorEstado,
  getIconoPorEstado,
} from '../../utils/iconosPorEstado';
import { getMensajePorEstado } from '../../utils/mensajesPorEstado';

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
      setNovedades(
        response.data.sort(
          (a, b) =>
            new Date(b.fecha_creacion).getTime() -
            new Date(a.fecha_creacion).getTime(),
        ),
      );
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

  return (
    <div className="text-sm font-bold w-[550px] -translate-x-7 bg-gray-400 rounded-2xl shadow-inner flex flex-col space-y-3 p-3">
      <div className="flex flex-col space-y-3 max-h-[200px] overflow-y-auto pr-1">
        {[...novedades]
          .sort((a, b) => b.id_novedad - a.id_novedad)
          .map((novedad) => {
            const tiendaNombre =
              novedad.usuario?.usuario_tienda?.[0]?.tienda?.nombre_tienda ??
              'Sin tienda asociada';

            const estadoVisual = mostrarEstado(novedad);
            const icono = getIconoPorEstado(estadoVisual, user?.esNomina);
            const mensajeTexto = getMensajePorEstado(
              mostrarEstado(novedad), // ← eso te devuelve 'CREADA', 'GESTIONADA', etc.
              user?.esNomina ?? false,
              !novedad.es_masiva,
            );

            return (
              <div
                key={novedad.id_novedad}
                className="flex items-start bg-white rounded-xl shadow-sm p-3 relative cursor-pointer transform transition-transform duration-150 hover:scale-[1.01]"
                onClick={() =>
                  navigate(
                    novedad.es_masiva
                      ? user?.esNomina
                        ? `/vista-previa-masiva-novedad-nomina/${novedad.id_novedad}` // Masiva Nómina
                        : `/vista-previa-masiva-tienda/${novedad.id_novedad}` //  Masiva Tienda
                      : user?.esNomina
                        ? `/vista-previa-individual-nomina/${novedad.id_novedad}` // Individual Nómina
                        : `/vista-previa-individual-tienda/${novedad.id_novedad}`, // Individual Tienda

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
                        iconoEstado: getIconNamePorEstado(
                          estadoVisual,
                          user?.esNomina,
                        ),
                        mensajeTexto: mensajeTexto,
                      },
                    },
                  )
                }
              >
                <div
                  className={`w-1.5 h-full rounded-l-md absolute left-0 top-0 bottom-0 ${getColorPorEstado(estadoVisual)}`}
                />
                <div className="pl-3 pr-1 flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {`SOLICITUD #0${novedad.id_novedad} ${estadoVisual} - ${
                      novedad.tipo_novedad?.nombre_tipo ?? 'Sin tipo'
                    }`}
                  </p>

                  {mensajeTexto && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>{icono}</span>
                      <span>{mensajeTexto}</span>
                    </div>
                  )}

                  <p className="text-[10px] text-gray-500 italic">
                    Tienda: {tiendaNombre}
                    {novedad.es_masiva && (
                      <>
                        {' • '}Solicitudes:{' '}
                        {novedad.cantidad_solicitudes ?? 'N/A'}
                        {' • '}📎 Archivo adjunto
                      </>
                    )}
                  </p>
                </div>
                <span className="text-[10px] text-gray-800 absolute top-2 right-3">
                  {new Date(novedad.fecha_creacion).toLocaleDateString(
                    'es-CO',
                    {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    },
                  )}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NovedadesRecientes;
