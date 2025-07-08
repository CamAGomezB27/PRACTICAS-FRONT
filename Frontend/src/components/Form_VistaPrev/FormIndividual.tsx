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
import { useAuth } from '../../context/useAuth';
import {
  Estado,
  getColorPorEstado,
  getIconoPorEstado,
} from '../../utils/iconosPorEstado';
import { getMensajePorEstado } from '../../utils/mensajesPorEstado';
import CamposRespuestaNomina from './CamposRespVistaPre';
import CamposVistaPrevia from './CamposVistaPrevia';

interface DetalleNovedad {
  id_novedad: number;
  tipo: string;
  estado: Estado;
  tienda: string;
  fecha: string;
  cedula: string;
  nombre: string;
  detalle: string;

  jornada_actual?: string;
  nueva_jornada?: string;
  salario_actual?: number;
  nuevo_salario?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  consecutivo?: string;

  //ESPACIOS NOMINA
  respuesta: string;
  validacion: string;
  ajuste: boolean;
  fecha_ajuste: string;
  area_responsable: string;
  inconsistencia: string;
  fecha_pago: string;
}

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

  const [estadoNovedad, setEstadoNovedad] = useState<Estado>('CREADA');

  const [modoEdicion, setModoEdicion] = useState(false);

  const [respuestaNomina, setRespuestaNomina] = useState({
    respuesta: '',
    validacion: '',
    ajuste: false,
    area_responsable: '',
    inconsistencia: '',
    fecha_pago: null as Date | null,
    responsable_validacion: '', // ← nuevo
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/novedad/${id}/individual`, {
          withCredentials: true,
        })
        .then((res) => {
          const data = res.data;
          console.log('✅ Datos recibidos del backend:', data); // 🔍 Aquí revisamos qué trae

          const estadosValidos: Estado[] = [
            'CREADA',
            'EN GESTIÓN',
            'GESTIONADA',
          ];

          if (!estadosValidos.includes(data.estado)) {
            console.warn('Estado no válido:', data.estado);
            return;
          }

          setNovedad(data as DetalleNovedad);
          setEstadoNovedad(data.estado);
          setRespuestaNomina({
            responsable_validacion: data.responsable_validacion,
            respuesta: data.respuesta,
            validacion: data.validacion,
            ajuste: data.ajuste,
            area_responsable: data.area_responsable,
            inconsistencia: data.categoria_inconsistencia,
            fecha_pago: data.fecha_pago ? new Date(data.fecha_pago) : null,
          });

          // Activar o desactivar modo edición según estado
          if (data.estado === 'GESTIONADA') {
            setModoEdicion(false);
          } else if (data.estado === 'EN GESTIÓN') {
            setModoEdicion(true);
          } else if (data.estado === 'CREADA' && user?.esNomina) {
            setModoEdicion(false); // editable solo al dar click en Gestionar
          }
        })
        .catch((err) => console.error('❌ Error al cargar novedad:', err));
    }
  }, [id, user?.esNomina]);

  if (!novedad) {
    return <p className="text-center">Cargando novedad...</p>;
  }

  getMensajePorEstado(estadoNovedad, user?.esNomina ?? false, true);
  const iconoEstado = getIconoPorEstado(estadoNovedad, user?.esNomina);
  const mensajeTexto = getMensajePorEstado(
    estadoNovedad,
    user?.esNomina ?? false,
    true,
  );

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

  const gestionarNovedad = async () => {
    try {
      await axios.put(
        `http://localhost:3000/novedad/${novedad?.id_novedad}/cambiar-estado`,
        { nuevoEstadoId: 2 }, // ID 2 = EN GESTIÓN
        { withCredentials: true },
      );
      setEstadoNovedad('EN GESTIÓN');
      setNovedad((prev) => (prev ? { ...prev, estado: 'EN GESTIÓN' } : prev));
      setModoEdicion(true); // 🔓 Activa edición
    } catch (error) {
      console.error('❌ Error al gestionar la novedad:', error);
      alert('No se pudo actualizar el estado de la novedad.');
    }
  };

  const enviarRespuestaNomina = async () => {
    if (!novedad) return;

    try {
      await axios.put(
        `http://localhost:3000/novedad/guardar-respuesta-individual/${novedad.id_novedad}`,
        {
          respuesta_validacion: respuestaNomina.respuesta,
          responsable_validacion: respuestaNomina.responsable_validacion,
          ajuste: respuestaNomina.ajuste ? 'Sí' : 'No',
          fecha_pago: respuestaNomina.fecha_pago
            ? respuestaNomina.fecha_pago.toISOString()
            : null,
          area_responsable: respuestaNomina.area_responsable,
          categoria_inconsistencia: respuestaNomina.inconsistencia,
        },
        { withCredentials: true },
      );

      // Volvemos a consultar la novedad para obtener su nuevo estado
      const { data } = await axios.get(
        `http://localhost:3000/novedad/${novedad.id_novedad}/individual`,
        { withCredentials: true },
      );

      setNovedad(data);
      setEstadoNovedad(data.estado);
      setModoEdicion(false);

      setRespuestaNomina({
        responsable_validacion: data.responsable_validacion || '',
        respuesta: data.respuesta || '',
        validacion: data.validacion || '',
        ajuste: data.ajuste === true || data.ajuste === 'Sí',
        area_responsable: data.area_responsable || '',
        inconsistencia: data.categoria_inconsistencia || '',
        fecha_pago:
          data.fecha_pago && data.fecha_pago !== ''
            ? new Date(data.fecha_pago)
            : null,
      });

      alert('✅ Respuesta enviada con éxito');
    } catch (err) {
      console.error('❌ Error al enviar respuesta:', err);
      alert(
        'Error al enviar la respuesta. Revisa los datos e intenta nuevamente.',
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-0 px-4 pb-2 bg-white">
      <div className="bg-white p-2 rounded-lg border border-gray-300 shadow-[2px_8px_12px_rgba(0,0,0,0.8)] hover:shadow-[4px_10px_14px_rgba(0,0,0,1)] hover:scale-105 transition-all duration-300">
        {/* Cabecera */}
        <div className="flex items-center justify-between p-2 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${getColorPorEstado(estadoNovedad)}`}
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
                Solicitud #{novedad.id_novedad} • {novedad.tienda}
                {novedad.fecha && ` / ${formatearFecha(novedad.fecha)}`}
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

        {/* Campos Específicos */}
        <div className="p-2 mt-2">
          <div className="w-full flex flex-col gap-2 text-xs">
            {/* 🔁 Campos dinámicos por tipo de novedad */}
            <CamposVistaPrevia
              tipo={novedad.tipo}
              novedad={novedad}
              formatearFecha={formatearFecha}
            />
          </div>

          {(['EN GESTIÓN', 'GESTIONADA'].includes(novedad.estado) ||
            (novedad.estado === 'CREADA' && user?.esNomina)) && (
            <>
              {/* 🧾 Línea separadora de "Respuesta de Nómina" bien centrada */}
              <div className="bg-[#4669AF] text-white text-center py-2 font-medium text-sm rounded-t-md mt-2">
                Respuesta de Nómina
              </div>

              {/* Campos NOMINA */}
              <div>
                <div className="w-full flex flex-col gap-2 text-xs">
                  {/* 🔁 Campos dinámicos por tipo de novedad */}
                  <CamposRespuestaNomina
                    respuesta={respuestaNomina.respuesta}
                    validacion={respuestaNomina.validacion}
                    ajuste={respuestaNomina.ajuste}
                    fecha_pago={respuestaNomina.fecha_pago}
                    area_responsable={respuestaNomina.area_responsable}
                    inconsistencia={respuestaNomina.inconsistencia}
                    responsable_validacion={
                      respuestaNomina.responsable_validacion
                    }
                    editable={modoEdicion}
                    setRespuestaNomina={setRespuestaNomina}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        {/* Botón visible solo para Nómina */}
        {user?.esNomina && novedad.estado !== 'GESTIONADA' && (
          <div className="flex justify-end px-4">
            {modoEdicion ? (
              <button
                className="bg-[#4669AF] hover:bg-[#375298] text-white font-semibold py-2 px-5 rounded-lg shadow transition duration-200"
                onClick={enviarRespuestaNomina}
              >
                Enviar respuesta
              </button>
            ) : (
              <button
                className="bg-[#4669AF] hover:bg-[#375298] text-white font-semibold py-2 px-5 rounded-lg shadow transition duration-200"
                onClick={gestionarNovedad}
              >
                Gestionar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormVistaPrevIndiv;
