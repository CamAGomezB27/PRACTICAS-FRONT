import { useState, useEffect } from 'react';
import TablePrevMasiva from '../../Table_VistPrev/TableVPTienda';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Tipo original
interface Solicitud {
  fecha: string;
  cedula: string;
  nombre: string;
  categoria: string;
  tienda: string;
  jefe: string;
  detalle: string;
}

// Tipo que espera la tabla
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

// Función para mapear los datos
const mapSolicitudesToFilas = (
  solicitudes: SolicitudConIdDetalle[],
): filas[] => {
  return solicitudes.map((s) => ({
    id: s.id_novedad,
    numero: s.n ?? 0,
    fechaReporte: s.fecha ?? '',
    cedula: s.cedula ?? '',
    nombre: s.nombre ?? '',
    categoria: s.categoria ?? '',
    tienda: s.tienda ?? '',
    jefe: s.jefe ?? '',
    detalle: s.detalle ?? '',
    jornadaEmAc: s.jornada_empleado ?? '',
    jornadaOtrSiTem: s.jornada_otro_si ?? '',
    fechainicio: s.fecha_inicio ?? '',
    fechafin: s.fecha_fin ?? '',
    salarioActual: s.salario_actual ?? 0,
    salarioOtroSiTemp: s.salario_otro_si ?? 0,
    consForms: s.consecutivo_forms ?? '',
    concepto: s.concepto ?? '',
    codigo: Number(s.codigo_concepto) || 0,
    unidades: s.unidades ?? 0,
    fechaNove: s.fecha_novedad ?? '',
    fechInicioDisfrute: s.fecha_inicio_disfrute ?? '',
    fechaFinDisfrute: s.fecha_fin_disfrute ?? '',
    ResponsableValidacion: s.responsable_validacion ?? '',
    RespuestaValidacion: s.respuesta_validacion ?? '',
    ajuste: s.ajuste ?? '',
    Fechapago: s.fecha_pago ?? '',
    AreaRespon: s.area_responsable ?? '',
    CategInconsitencia: s.categoria_inconsistencia ?? '',
  }));
};

const FormVistaPrevMasiva = () => {
  const { id } = useParams(); // ← id_novedad desde la URL
  const [solicitudes, setSolicitudes] = useState<SolicitudConIdDetalle[]>([]);

  // Cargar datos al iniciar
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/novedad/${id}/masiva`,
          { withCredentials: true },
        );
        console.log('🎯 Datos recibidos:', response.data);
        const datos: SolicitudConIdDetalle[] = response.data;
        setSolicitudes(datos);
      } catch (error) {
        console.error('❌ Error al cargar datos de novedad masiva:', error);
      }
    };

    if (id) fetchDatos();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white">
      <div className="bg-white p-2 rounded-lg border border-gray-300 shadow-[2px_8px_12px_rgba(0,0,0,0.8)] hover:shadow-[4px_10px_14px_rgba(0,0,0,1)] hover:scale-105 transition-all duration-300">
        {/* Encabezado */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#4669AF] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">H</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Horas Extra
              </h1>
              <p className="text-sm text-gray-600">
                Solicitud de Horas extra para varios empleados
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                Información de Solicitud - Solicitud #00025 Tienda Barranquilla
                / 10 Jun 2025
              </p>
            </div>
            {/* Burbuja de estado */}
            <span className="bg-[#4669AF] text-white text-xs font-semibold px-3 py-1 rounded-full">
              Creada
            </span>
          </div>
        </div>

        {/* Info adicional */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-700">
            <span className="font-medium">
              Total solicitudes en esta novedad:
            </span>{' '}
            {solicitudes.length} Solicitudes
          </p>
        </div>

        {/* Tabla de solicitudes */}
        <div className="bg-[#4669AF] text-white text-center py-2 font-medium text-sm rounded-t-md">
          Vista Previa del Documento
        </div>
        <div className="border border-gray-200 rounded-lg shadow-sm">
          <div className="max-h-[250px] overflow-auto ">
            <TablePrevMasiva datos={mapSolicitudesToFilas(solicitudes)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormVistaPrevMasiva;
