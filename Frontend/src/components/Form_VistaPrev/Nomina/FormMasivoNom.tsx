import axios from 'axios';
import { Download } from 'lucide-react';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import {
  FaBus,
  FaClock,
  FaFileAlt,
  FaFileSignature,
  FaList,
  FaMoneyBillAlt,
  FaUmbrellaBeach,
} from 'react-icons/fa';
import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import {
  Estado,
  getColorPorEstado,
  getIconoPorEstado,
} from '../../../utils/iconosPorEstado';
import { getMensajePorEstado } from '../../../utils/mensajesPorEstado';
import FormConfirmarDescarga from '../../Alerts/AlertConfirDes';
import TablaVistaPreviaMasivaNom from '../../Table_VistPrev/TableVPNomina';

// Tipos
interface Solicitud {
  fecha: string;
  cedula: string;
  nombre: string;
  categoria: string;
  tienda: string;
  jefe: string;
  detalle: string;
}

interface filas {
  id: number;
  numero: number;
  fecha: string;
  cedula: string;
  nombre: string;
  categoria: string;
  tienda: string;
  jefe: string;
  detalle: string;
  jornadaEmAc: string;
  jornadaOtrSiTem: string;
  fechainicio: string;
  fechafin: string;
  salarioActual: number;
  salarioOtroSiTemp: number;
  consForms: string;
  concepto: string;
  codigo: number;
  unidades: number;
  fechaNove: string;
  diasATomar: number;
  fechInicioDisfrute: string;
  fechaFinDisfrute: string;
  ResponsableValidacion: string;
  RespuestaValidacion: string;
  ajuste: string;
  Fechapago: string;
  AreaRespon: string;
  CategInconsitencia: string;
}

interface SolicitudConIdDetalle extends Solicitud {
  id_novedad: number;
  n: number;
  fecha: string;
  jornada_empleado: string;
  jornada_otro_si: string;
  fecha_inicio: string;
  fecha_fin: string;
  salario_actual: number;
  salario_otro_si: number;
  consecutivo_forms: string;
  concepto: string;
  codigo_concepto: string;
  unidades: number;
  fecha_novedad: string;
  dias_a_tomar: number;
  fecha_inicio_disfrute: string;
  fecha_fin_disfrute: string;
  responsable_validacion: string;
  respuesta_validacion: string;
  ajuste: string;
  fecha_pago: string;
  area_responsable: string;
  categoria_inconsistencia: string;
}

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

const mapSolicitudesToFilas = (solicitudes: SolicitudConIdDetalle[]): filas[] =>
  solicitudes.map((s) => ({
    id: s.id_novedad,
    numero: s.n ?? 0,
    fecha: formatearFecha(s.fecha),
    cedula: s.cedula ?? '',
    nombre: s.nombre ?? '',
    categoria: s.categoria ?? '',
    tienda: s.tienda ?? '',
    jefe: s.jefe ?? '',
    detalle: s.detalle ?? '',
    jornadaEmAc: s.jornada_empleado ?? '',
    jornadaOtrSiTem: s.jornada_otro_si ?? '',
    fechainicio: formatearFecha(s.fecha_inicio),
    fechafin: formatearFecha(s.fecha_fin),
    salarioActual: s.salario_actual ?? 0,
    salarioOtroSiTemp: s.salario_otro_si ?? 0,
    consForms: s.consecutivo_forms ?? '',
    concepto: s.concepto ?? '',
    codigo: Number(s.codigo_concepto) || 0,
    unidades: s.unidades ?? 0,
    fechaNove: formatearFecha(s.fecha_novedad),
    diasATomar: s.dias_a_tomar ?? 0,
    fechInicioDisfrute: formatearFecha(s.fecha_inicio_disfrute),
    fechaFinDisfrute: formatearFecha(s.fecha_fin_disfrute),
    ResponsableValidacion: s.responsable_validacion ?? '',
    RespuestaValidacion: s.respuesta_validacion ?? '',
    ajuste: s.ajuste ?? '',
    Fechapago: formatearFecha(s.fecha_pago),
    AreaRespon: s.area_responsable ?? '',
    CategInconsitencia: s.categoria_inconsistencia ?? '',
  }));

const iconMap: Record<string, ReactElement> = {
  FaBus: <FaBus className="text-white text-2xl" />,
  FaMoneyBillAlt: <FaMoneyBillAlt className="text-white text-2xl" />,
  FaClock: <FaClock className="text-white text-2xl" />,
  FaFileSignature: <FaFileSignature className="text-white text-2xl" />,
  FaFileAlt: <FaFileAlt className="text-white text-2xl" />,
  FaUmbrellaBeach: <FaUmbrellaBeach className="text-white text-2xl" />,
  FaList: <FaList className="text-white text-2xl" />,
};

const FormVistaPrevMasivaNom = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const location = useLocation();

  const { user } = useAuth(); // o puede que ya lo tengas

  const [mostrarModalConfirmar, setMostrarModalConfirmar] = useState(false);

  const [descargadoYa, setDescargadoYa] = useState(false);

  const [archivoCargado, setArchivoCargado] = useState(false);

  useEffect(() => {
    if (id) {
      const descargado = sessionStorage.getItem(`descargado_${id}`) === 'true';
      console.log('📦 descargado del sessionStorage:', descargado);
      setDescargadoYa(descargado);
    }
  }, [id]);

  const [mensajeInfo, setMensajeInfo] = useState<{
    tipo: 'warning' | 'success';
    texto: string;
  } | null>(null);

  const {
    id_novedad,
    tipo,
    estado,
    tienda,
    fecha,
    cantidad,
    iconName,
    modoGestionInicial,
  } = location.state || {};

  const estadoInicial: Estado = modoGestionInicial
    ? 'EN GESTIÓN'
    : (estado ?? 'PENDIENTE');
  const [estadoLocal, setEstadoLocal] = useState<Estado>(estadoInicial);
  const mensajeTexto = getMensajePorEstado(
    estadoLocal,
    user?.esNomina ?? false,
  );
  const [modoGestion, setModoGestion] = useState<boolean>(
    estado === 'EN GESTIÓN' || !!modoGestionInicial,
  );
  const [solicitudes, setSolicitudes] = useState<SolicitudConIdDetalle[]>([]);

  const fetchDatos = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/novedad/${id}/masiva`,
        { withCredentials: true },
      );
      setSolicitudes(response.data);
    } catch (error) {
      console.error('❌ Error al cargar datos de novedad masiva:', error);
    }
  }, [id]);
  useEffect(() => {
    if (id) fetchDatos();
  }, [id, fetchDatos]);

  const handleDescargar = async () => {
    const filasParaEnviar = mapSolicitudesToFilas(solicitudes);
    try {
      const response = await axios.post(
        'http://localhost:3000/archivo-adjunto/exportar-archivo-respuesta',
        filasParaEnviar,
        {
          responseType: 'blob',
          withCredentials: true,
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const contentDisposition = response.headers['content-disposition'];
      const match = contentDisposition?.match(/filename="(.+)"/);
      const filename = match?.[1] ?? 'VistaPrevia.xlsx';
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      // ✅ Marcar como descargado SIEMPRE que se descargue
      sessionStorage.setItem(`descargado_${id}`, 'true');
      setDescargadoYa(true);
      console.log('✅ descargadoYa actualizado (handleDescargar):', true);
    } catch (error) {
      console.error('❌ Error al descargar el archivo:', error);
      alert('Error al exportar la tabla');
    }
  };

  const handleCargarArchivo = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post(
        'http://localhost:3000/archivo-adjunto/cargar-respuesta-masiva',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        },
      );

      alert(
        `✅ Archivo procesado correctamente.\nActualizados: ${res.data.actualizados}`,
      );

      await fetchDatos();
      setArchivoCargado(true);
    } catch (error) {
      console.error('❌ Error al procesar el archivo:', error);
      alert('Ocurrió un error al cargar el archivo de respuestas.');
    }
  };

  const handleGestionar = () => {
    const descargado = sessionStorage.getItem(`descargado_${id}`) === 'true';

    if (!descargado && !descargadoYa) {
      setMostrarModalConfirmar(true);
      return;
    }

    gestionarAhora();
  };

  const gestionarAhora = async () => {
    try {
      await axios.put(
        `http://localhost:3000/novedad/${id}/cambiar-estado`,
        { nuevoEstadoId: 2 },
        { withCredentials: true },
      );
      setEstadoLocal('EN GESTIÓN');
      setModoGestion(true);
    } catch (error) {
      console.error('❌ Error al gestionar la novedad:', error);
      alert('No se pudo actualizar el estado de la novedad.');
    }
  };

  const guardarNovedad = async () => {
    try {
      await axios.put(
        `http://localhost:3000/novedad/${id}/cambiar-estado`,
        { nuevoEstadoId: 3 }, // Asumiendo que 3 es GESTIONADA
        { withCredentials: true },
      );
      setEstadoLocal('GESTIONADA');
      setModoGestion(true);
      setMensajeInfo({
        tipo: 'success',
        texto: '✅ La novedad fue gestionada exitosamente.',
      });
    } catch (error) {
      console.error('❌ Error al guardar la novedad:', error);
      alert('No se pudo actualizar el estado de la novedad.');
    }
  };

  useEffect(() => {
    if (mensajeInfo) {
      const timer = setTimeout(() => setMensajeInfo(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [mensajeInfo]);

  if (!location.state) {
    return (
      <div className="text-center text-red-600 p-4">
        ⚠️ No se encontró información de la solicitud. Por favor, vuelve al
        panel principal.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white">
      {mensajeInfo && (
        <div className="flex justify-center mb-4">
          <div
            className={`flex items-center gap-3 max-w-md px-4 py-3 rounded-lg shadow text-sm font-semibold border transition-all duration-300 ${
              mensajeInfo.tipo === 'success'
                ? 'bg-green-100 text-green-800 border-green-400'
                : 'bg-yellow-100 text-yellow-800 border-yellow-400'
            }`}
          >
            {mensajeInfo.tipo === 'success' ? (
              <FiCheckCircle className="text-green-600 text-lg" />
            ) : (
              <FiAlertTriangle className="text-yellow-600 text-lg" />
            )}
            <span>{mensajeInfo.texto}</span>
          </div>
        </div>
      )}

      <div className="bg-white p-2 rounded-lg border border-gray-300 shadow-[2px_8px_12px_rgba(0,0,0,0.8)] hover:shadow-[4px_10px_14px_rgba(0,0,0,1)] hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${getColorPorEstado(estadoLocal)}`}
            >
              {iconMap[iconName] ?? <FaList className="text-white text-sm" />}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {tipo ?? 'Tipo de novedad'}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                {getIconoPorEstado(estadoLocal, true)}
                <span className="text-xs font-semibold text-gray-500">
                  {mensajeTexto}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm font-medium text-gray-900">
              Solicitud #{id_novedad} • {tienda}
              {fecha &&
                ` / ${new Date(fecha).toLocaleDateString('es-CO', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}`}
            </p>
            <span
              className={`${getColorPorEstado(estadoLocal)} text-white text-xs font-semibold px-3 py-1 rounded-full`}
            >
              {estadoLocal}
            </span>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-700">
            <span className="font-medium">
              Total solicitudes en esta novedad:
            </span>{' '}
            {cantidad} Solicitudes
          </p>
        </div>

        <div className="flex flex-row gap-6 pt-4">
          <div
            className={`${estadoLocal === 'GESTIONADA' ? 'w-full' : 'w-[85%]'} flex flex-col`}
          >
            <div className="bg-[#4669AF] text-white text-center py-2 font-medium text-sm rounded-t-md">
              Vista Previa del Documento
            </div>
            <div className="border border-gray-200 rounded-lg shadow-sm flex-1 max-h-[400px] overflow-auto">
              <TablaVistaPreviaMasivaNom
                datos={mapSolicitudesToFilas(solicitudes)}
              />
            </div>
          </div>

          {estadoLocal !== 'GESTIONADA' && (
            <div className="w-[15%] flex flex-col justify-between items-center h-full py-4 gap-28">
              <button
                onClick={() => {
                  if (descargadoYa) {
                    document.getElementById('archivo-respuesta')?.click();
                  } else {
                    handleDescargar();
                  }
                }}
                className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-2 text-sm font-semibold rounded-lg shadow-md w-full flex items-center justify-center gap-2"
              >
                <Download size={18} />
                {descargadoYa ? 'Cargar' : 'Descargar'}
              </button>
              <input
                title="cargar"
                type="file"
                id="archivo-respuesta"
                accept=".xlsx"
                onChange={handleCargarArchivo}
                className="hidden"
              />

              {!modoGestion ? (
                <div className="flex flex-col w-full gap-2">
                  <button
                    className="bg-[#4669AF] hover:bg-[#3a5a9b] text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-md w-full"
                    onClick={handleGestionar}
                  >
                    Gestionar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-md w-full"
                    onClick={() => navigate('/dashboard-nomina')}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="flex flex-col w-full gap-2">
                  {archivoCargado ? (
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-md w-full"
                      onClick={guardarNovedad}
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      className="bg-[#4669AF] hover:bg-[#3a5a9b] text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-md w-full"
                      disabled
                    >
                      Gestionar
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-md w-full"
                    onClick={() => navigate('/dashboard-nomina')}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {mostrarModalConfirmar && (
        <FormConfirmarDescarga
          onCerrar={() => setMostrarModalConfirmar(false)}
          onConfirmar={() => {
            gestionarAhora();
            sessionStorage.setItem(`descargado_${id}`, 'true');
            setMostrarModalConfirmar(false);
          }}
          setMensajeInfo={setMensajeInfo}
        />
      )}
    </div>
  );
};

export default FormVistaPrevMasivaNom;
