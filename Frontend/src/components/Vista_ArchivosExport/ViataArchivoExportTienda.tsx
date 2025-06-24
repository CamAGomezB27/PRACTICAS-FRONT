import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import TablaConsTienda from '../Consolidado_Export/TablaConsolidadoTienda';
import axios from 'axios';

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

// Tipado como el que recibe TablaConsTienda
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

// Para formatear fechas al estilo colombiano
const formatearFecha = (fecha: string | Date | null | undefined): string => {
  if (!fecha) return '';
  const dateObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
  if (isNaN(dateObj.getTime())) return '';
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

const VistaArchConsTienda = () => {
  const [datos, setDatos] = useState<filas[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<SolicitudConIdDetalle[]>(
          'http://localhost:3000/novedad/masiva/tienda',
          { withCredentials: true },
        );
        // Formatear fechas
        const datosFormateados: filas[] = response.data.map((s) => ({
          id: s.id_novedad,
          numero: s.n ?? 0,
          fechaReporte: formatearFecha(s.fecha),
          cedula: s.cedula,
          nombre: s.nombre,
          categoria: s.categoria,
          tienda: s.tienda,
          jefe: s.jefe,
          detalle: s.detalle,
          jornadaEmAc: s.jornada_empleado,
          jornadaOtrSiTem: s.jornada_otro_si,
          fechainicio: formatearFecha(s.fecha_inicio),
          fechafin: formatearFecha(s.fecha_fin),
          salarioActual: s.salario_actual,
          salarioOtroSiTemp: s.salario_otro_si,
          consForms: s.consecutivo_forms,
          concepto: s.concepto,
          codigo: Number(s.codigo_concepto),
          unidades: s.unidades,
          fechaNove: formatearFecha(s.fecha_novedad),
          fechInicioDisfrute: formatearFecha(s.fecha_inicio_disfrute),
          fechaFinDisfrute: formatearFecha(s.fecha_fin_disfrute),
          ResponsableValidacion: s.responsable_validacion,
          RespuestaValidacion: s.respuesta_validacion,
          ajuste: s.ajuste,
          Fechapago: formatearFecha(s.fecha_pago),
          AreaRespon: s.area_responsable,
          CategInconsitencia: s.categoria_inconsistencia,
        }));

        setDatos(datosFormateados);
      } catch (error) {
        console.error('❌ Error al cargar el consolidado:', error);
      }
    };

    fetchData();
  }, []);

  const handleDescargar = () => {
    console.log('Descargando archivo... (pendiente implementar)');
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="bg-white p-8 rounded-lg border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Vista Previa de Archivo Consolidado
            </h2>
            <p className="text-gray-600">
              Archivo consolidado de Histórico de solicitudes de tu tienda
            </p>
          </div>
          <button
            onClick={handleDescargar}
            className="bg-[#4669AF] hover:bg-[#3a5a9b] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-md"
          >
            <Download className="w-4 h-4" />
            Descargar
          </button>
        </div>

        <div className="border border-gray-200 rounded-lg shadow-sm">
          <div className="max-h-[250px] overflow-auto scrollbar-thin scrollbar-thumb-[#4669AF] scrollbar-track-gray-200">
            <TablaConsTienda datos={datos} />
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Total de registros: {datos.length}</p>
          <p>
            Use el scroll horizontal y vertical para navegar por todos los datos
          </p>
        </div>
      </div>
    </div>
  );
};

export default VistaArchConsTienda;
