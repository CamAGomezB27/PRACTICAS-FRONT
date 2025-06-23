import { useState, useEffect } from 'react';
import TablePrevMasiva from '../../Table_VistPrev/TableVPTienda'; // Ajusta la ruta si cambia

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

// Función para mapear los datos
const mapSolicitudesToFilas = (solicitudes: Solicitud[]): filas[] => {
  return solicitudes.map((s, i) => ({
    id: i + 1,
    numero: i + 1,
    fechaReporte: s.fecha,
    cedula: s.cedula,
    nombre: s.nombre,
    categoria: s.categoria,
    tienda: s.tienda,
    jefe: s.jefe,
    detalle: s.detalle,
    jornadaEmAc: '',
    jornadaOtrSiTem: '',
    fechainicio: '',
    fechafin: '',
    salarioActual: 0,
    salarioOtroSiTemp: 0,
    consForms: '',
    concepto: '',
    codigo: 0,
    unidades: 0,
    fechaNove: '',
    fechInicioDisfrute: '',
    fechaFinDisfrute: '',
    ResponsableValidacion: '',
    RespuestaValidacion: '',
    ajuste: '',
    Fechapago: '',
    AreaRespon: '',
    CategInconsitencia: '',
  }));
};

const FormVistaPrevMasiva = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);

  // Cargar datos al iniciar
  useEffect(() => {
    const datosEjemplo: Solicitud[] = [
      {
        fecha: '10/Jun/2025',
        cedula: '12345678',
        nombre: 'Juan Pérez',
        categoria: 'Empleado',
        tienda: 'Barranquilla',
        jefe: 'María García',
        detalle: 'Horas extra',
      },
      {
        fecha: '10/Jun/2025',
        cedula: '87654321',
        nombre: 'Ana López',
        categoria: 'Supervisor',
        tienda: 'Barranquilla',
        jefe: 'Carlos Ruiz',
        detalle: 'Horas extra',
      },
    ];

    setSolicitudes(datosEjemplo);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white">
      <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
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
        <div className="p-4">
          <TablePrevMasiva datos={mapSolicitudesToFilas(solicitudes)} />
        </div>
      </div>
    </div>
  );
};

export default FormVistaPrevMasiva;
