import axios from 'axios';
import { Download } from 'lucide-react';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TablePrevMasiva from '../../Table_VistPrev/TableVPTienda';

// Tipos de datos
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
  fechaReporte: string;
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

  // Corrige para zona horaria UTC y formato exacto
  return date.toLocaleDateString('es-CO', {
    timeZone: 'UTC',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

// Mapeo
const mapSolicitudesToFilas = (solicitudes: SolicitudConIdDetalle[]): filas[] =>
  solicitudes.map((s) => ({
    id: s.id_novedad,
    numero: s.n ?? 0,
    fechaReporte: formatearFecha(s.fecha),
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
    fechInicioDisfrute: formatearFecha(s.fecha_inicio_disfrute),
    fechaFinDisfrute: formatearFecha(s.fecha_fin_disfrute),
    ResponsableValidacion: s.responsable_validacion ?? '',
    RespuestaValidacion: s.respuesta_validacion ?? '',
    ajuste: s.ajuste ?? '',
    Fechapago: formatearFecha(s.fecha_pago),
    AreaRespon: s.area_responsable ?? '',
    CategInconsitencia: s.categoria_inconsistencia ?? '',
  }));

// Mapeo del nombre al componente del ícono
const iconMap: Record<string, ReactElement> = {
  FaBus: <FaBus className="text-white text-2xl" />,
  FaMoneyBillAlt: <FaMoneyBillAlt className="text-white text-2xl" />,
  FaClock: <FaClock className="text-white text-2xl" />,
  FaFileSignature: <FaFileSignature className="text-white text-2xl" />,
  FaFileAlt: <FaFileAlt className="text-white text-2xl" />,
  FaUmbrellaBeach: <FaUmbrellaBeach className="text-white text-2xl" />,
  FaList: <FaList className="text-white text-2xl" />,
};

// Componente principal
const FormVistaPrevMasivaNom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { id_novedad, descripcion, tipo, estado, tienda, fecha, cantidad } =
    location.state || {};

  const [solicitudes, setSolicitudes] = useState<SolicitudConIdDetalle[]>([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/novedad/${id}/masiva`,
          { withCredentials: true },
        );
        setSolicitudes(response.data);
      } catch (error) {
        console.error('❌ Error al cargar datos de novedad masiva:', error);
      }
    };

    if (id) fetchDatos();
  }, [id]);

  if (!location.state) {
    return (
      <div className="text-center text-red-600 p-4">
        ⚠️ No se encontró información de la solicitud. Por favor, vuelve al
        panel principal.
      </div>
    );
  }

  const handleDescargar = async () => {
    if (!solicitudes.length) {
      alert('No hay datos válidos para exportar.');
      return;
    }

    try {
      console.log(
        '🔵 Enviando al backend:',
        solicitudes.map((d) => ({ id: d.id_novedad })),
      );

      const response = await axios.post(
        'http://localhost:3000/archivo-adjunto/exportar-consolidado',
        solicitudes.map((d) => ({ id: d.id_novedad })), // Enviar solo los IDs
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
      const filename =
        match?.[1] ?? `Archivo_Para_respuesta_${id_novedad}.xlsx`;

      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('❌ Error al descargar el archivo:', error);
      alert('Ocurrió un error al descargar el consolidado.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-[2px_8px_12px_rgba(0,0,0,0.8)] hover:shadow-[4px_10px_14px_rgba(0,0,0,1)] hover:scale-[1.02] transition-all duration-300">
        {/* Encabezado */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 bg-[#4669AF] rounded-full flex items-center justify-center">
              {iconMap[location.state?.iconName] ?? (
                <FaList className="text-white text-sm" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {tipo ?? 'Tipo de novedad'}
              </h1>
              <p className="text-sm text-gray-600">
                {descripcion ?? 'Descripción no disponible'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                Solicitud #{id_novedad} • {tienda}{' '}
                {fecha &&
                  `/ ${new Date(fecha).toLocaleDateString('es-CO', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}`}
              </p>
            </div>
            <span className="bg-[#4669AF] text-white text-xs font-semibold px-3 py-1 rounded-full">
              {estado ?? 'Sin estado'}
            </span>
          </div>
        </div>

        {/* INFORMACIÓN */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-700">
            <span className="font-medium">
              Total solicitudes en esta novedad:
            </span>{' '}
            {cantidad} Solicitudes
          </p>
        </div>

        {/* Tabla + Botones */}
        <div className="flex flex-row gap-6 pt-4">
          {/* Tabla */}
          <div className="w-[85%] flex flex-col">
            <div className="bg-[#4669AF] text-white text-center py-2 font-medium text-sm rounded-t-md">
              Vista Previa del Documento
            </div>
            <div className="border border-gray-200 rounded-lg shadow-sm flex-1">
              <div className="max-h-[400px] overflow-auto">
                <TablePrevMasiva datos={mapSolicitudesToFilas(solicitudes)} />
              </div>
            </div>
          </div>

          {/* BOTONES */}
          <div className="w-[15%] flex flex-col justify-between items-center h-full py-4 gap-28">
            {/* Botón Descargar (arriba) */}
            <button
              onClick={handleDescargar}
              className="bg-yellow-300 hover:bg-yellow-400 text-black px-4 py-2 text-sm font-semibold rounded-lg shadow-md w-full flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Descargar
            </button>

            {/* Botones Gestionar y Cancelar (abajo, juntos) */}
            <div className="flex flex-col w-full gap-2">
              <button className="bg-[#4669AF] hover:bg-[#3a5a9b] text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-md w-full">
                Gestionar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-md w-full"
                onClick={() => navigate('/dashboard-nomina')}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormVistaPrevMasivaNom;
