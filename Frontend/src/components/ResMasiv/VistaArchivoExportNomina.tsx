import axios from 'axios';
import { Download, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AlertFiltros from '../Alerts/AlertFiltros';
import TablaRespMasiv from './TablaConsolidadoNomina';

interface FiltroParaNom {
  tienda: string;
  tipo: string;
  desde: string;
  hasta: string;
  cedula: string;
}

interface Solicitud {
  fecha: string;
  cedula: string;
  nombre: string;
  categoria: string;
  tienda: string;
  jefe: string;
  detalle: string;
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

const VistaArchRespMasiv: React.FC<{ filtros?: FiltroParaNom }> = ({
  filtros,
}) => {
  const [datos, setDatos] = useState<filas[]>([]);
  const [datosOriginales, setDatosOriginales] = useState<
    SolicitudConIdDetalle[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [descargado, setDescargado] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    setLoading(true);
    setDatos([]);
    setDatosOriginales([]);

    try {
      const params = new URLSearchParams();
      if (filtros?.tienda) params.append('tienda', filtros.tienda);
      if (filtros?.tipo) params.append('tipo', filtros.tipo);
      if (filtros?.desde) params.append('desde', filtros.desde);
      if (filtros?.hasta) params.append('hasta', filtros.hasta);
      if (filtros?.cedula !== undefined && filtros.cedula !== null) {
        params.append('cedula', filtros.cedula);
      }

      const response = await axios.get<SolicitudConIdDetalle[]>(
        'http://localhost:3000/novedad/consolidado-pendientes-nomina',
        {
          params: Object.fromEntries(params.entries()),
          withCredentials: true,
        },
      );

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
      setDatosOriginales(response.data);
      setMostrarAlerta(datosFormateados.length === 0);
    } catch (error) {
      console.error('❌ Error al cargar el consolidado:', error);
      setMostrarAlerta(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    filtros?.tienda,
    filtros?.tipo,
    filtros?.desde,
    filtros?.hasta,
    filtros?.cedula,
  ]);

  const handleDescargar = async () => {
    if (!datosOriginales.length) {
      alert('No hay datos válidos para exportar.');
      return;
    }

    try {
      const payload = datosOriginales.map((d) => ({
        id: d.id_novedad,
        numero: d.n ?? 0,
        fecha: d.fecha,
        cedula: d.cedula,
        nombre: d.nombre,
        categoria: d.categoria,
        tienda: d.tienda,
        jefe: d.jefe,
        detalle: d.detalle,
        jornadaEmAc: d.jornada_empleado,
        jornadaOtrSiTem: d.jornada_otro_si,
        fechainicio: d.fecha_inicio,
        fechafin: d.fecha_fin,
        salarioActual: d.salario_actual,
        salarioOtroSiTemp: d.salario_otro_si,
        consForms: d.consecutivo_forms,
        concepto: d.concepto,
        codigo: Number(d.codigo_concepto),
        unidades: d.unidades,
        fechaNove: d.fecha_novedad,
        fechInicioDisfrute: d.fecha_inicio_disfrute,
        fechaFinDisfrute: d.fecha_fin_disfrute,
        ResponsableValidacion: d.responsable_validacion,
        RespuestaValidacion: d.respuesta_validacion,
        ajuste: d.ajuste,
        Fechapago: d.fecha_pago,
        AreaRespon: d.area_responsable,
        CategInconsitencia: d.categoria_inconsistencia,
      }));

      const response = await axios.post(
        'http://localhost:3000/archivo-adjunto/exportar-archivo-respuesta-masiva',
        payload,
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
      const filename = match?.[1] ?? 'Respuesta_Masiva.xlsx';
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Cambiar estado a "EN GESTIÓN"
      const ids = datosOriginales.map((d) => d.id_novedad);
      await axios.put(
        'http://localhost:3000/novedad/cambiar-estados-respuesta-masiva',
        {
          idsNovedades: ids,
          nuevoEstadoId: 2,
        },
        { withCredentials: true },
      );

      setDescargado(true);
    } catch (error) {
      console.error('❌ Error al descargar el archivo:', error);
      alert('Ocurrió un error al descargar la respuesta masiva.');
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

      // Recargar datos para ver el cambio
      setDescargado(false);
      await fetchData();
    } catch (error) {
      console.error('❌ Error al procesar el archivo:', error);
      alert('Ocurrió un error al cargar el archivo de respuestas.');
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <input
        title="Carga"
        ref={inputRef}
        type="file"
        accept=".xlsx"
        onChange={handleCargarArchivo}
        className="hidden"
      />

      <div className="bg-white p-8 rounded-lg border border-gray-300 shadow-[2px_8px_12px_rgba(0,0,0,0.8)] hover:shadow-[4px_10px_14px_rgba(0,0,0,1)] hover:scale-105 transition-all duration-300">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Vista previa de respuesta masiva
            </h2>
            <p className="text-gray-600">
              Acá podrás descargar el archivo de respuesta para solicitudes
              pendientes.
            </p>
          </div>

          {!descargado ? (
            <button
              onClick={handleDescargar}
              className="bg-[#4669AF] hover:bg-[#3a5a9b] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-md hover:scale-105"
            >
              <Download className="w-4 h-4" />
              Descargar
            </button>
          ) : (
            <button
              onClick={() => inputRef.current?.click()}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-md hover:scale-105"
            >
              <Upload className="w-4 h-4" />
              Cargar
            </button>
          )}
        </div>

        <div className="border border-gray-200 rounded-lg shadow-sm">
          {loading ? (
            <div className="p-4 text-center text-gray-600 text-sm italic">
              Cargando datos...
            </div>
          ) : datos.length > 0 ? (
            <div className="max-h-[280px] overflow-auto scrollbar-thin scrollbar-thumb-[#4669AF] scrollbar-track-gray-200">
              <TablaRespMasiv datos={datos} />
            </div>
          ) : null}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Total de registros: {datos.length}</p>
          <p>
            Usa el scroll horizontal y vertical para navegar por todos los datos
          </p>
        </div>
      </div>

      {mostrarAlerta && (
        <AlertFiltros onClose={() => setMostrarAlerta(false)} />
      )}
    </div>
  );
};

export default VistaArchRespMasiv;
