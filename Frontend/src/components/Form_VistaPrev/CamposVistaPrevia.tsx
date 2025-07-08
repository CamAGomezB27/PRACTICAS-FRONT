import React from 'react';
import { Estado } from '../../utils/iconosPorEstado';

type DetalleNovedad = {
  //sE REPITEN
  id_novedad: number;
  tipo: string;
  estado: Estado;
  tienda: string;
  fecha: string;
  cedula: string;
  nombre: string;
  detalle: string;

  //OTRO SI TEMPORAL
  jornada_actual?: string;
  nueva_jornada?: string;
  salario_actual?: number;
  nuevo_salario?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  consecutivo?: string;

  //HORAS EXTRA
  concepto?: string;
  codigo_concepto?: number;
  unidades?: number;
  fecha_novedad?: string;

  //VACAIONES
  dias?: number;
  fecha_inicio_disfrute?: string;
  fecha_fin_disfrute?: string;
};

interface Props {
  tipo: string;
  novedad: DetalleNovedad;
  formatearFecha: (fecha: string | Date | null | undefined) => string;
}

const inputStyle =
  'w-full bg-gray-100 border border-gray-300 rounded px-2 py-1 h-[30px] text-xs text-black leading-tight truncate';

const labelStyle = 'block text-gray-600 text-[11px] font-medium mb-0.5';

const CamposVistaPrevia: React.FC<Props> = ({
  tipo,
  novedad,
  formatearFecha,
}) => {
  switch (tipo.toUpperCase()) {
    case 'OTRO SI TEMPORAL':
      return (
        <div className="grid grid-cols-6 gap-2">
          {/* Cédula */}
          <div className="col-span-3">
            <label className={labelStyle}>Cédula del Empleado</label>
            <input
              title="cedula"
              value={novedad.cedula}
              disabled
              className={inputStyle}
            />
          </div>

          {/* Nombre */}
          <div className="col-span-3">
            <label className={labelStyle}>Nombres Completos</label>
            <input
              title="nombre"
              value={novedad.nombre}
              disabled
              className={inputStyle}
            />
          </div>

          {/* Campos específicos */}
          <div className="col-span-1">
            <label className={labelStyle}>Jornada Actual</label>
            <input
              title="JorAct"
              value={novedad.jornada_actual || ''}
              disabled
              className={inputStyle}
            />
          </div>
          <div className="col-span-1">
            <label className={labelStyle}>Nueva Jornada</label>
            <input
              title="NuevJor"
              value={novedad.nueva_jornada || ''}
              disabled
              className={inputStyle}
            />
          </div>
          <div className="col-span-1">
            <label className={labelStyle}>Salario Actual</label>
            <input
              title="SalAc"
              value={
                novedad.salario_actual
                  ? novedad.salario_actual.toLocaleString('es-CO')
                  : ''
              }
              disabled
              className={inputStyle}
            />
          </div>
          <div className="col-span-1">
            <label className={labelStyle}>Nuevo Salario</label>
            <input
              title="NuevSal"
              value={
                novedad.nuevo_salario
                  ? novedad.nuevo_salario.toLocaleString('es-CO')
                  : ''
              }
              disabled
              className={inputStyle}
            />
          </div>
          <div className="col-span-1">
            <label className={labelStyle}>Rango de Fechas</label>
            <input
              title="fechas"
              value={`${formatearFecha(novedad.fecha_inicio)} a ${formatearFecha(novedad.fecha_fin)}`}
              disabled
              className={inputStyle}
            />
          </div>
          <div className="col-span-1">
            <label className={labelStyle}>Consecutivo</label>
            <input
              title="Consec"
              value={novedad.consecutivo || ''}
              disabled
              className={inputStyle}
            />
          </div>

          {/* Detalle de la novedad */}
          <div className="col-span-6">
            <label className={labelStyle}>Detalle de la Novedad</label>
            <textarea
              title="detalle"
              value={novedad.detalle}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs text-black leading-tight"
              rows={2}
            />
          </div>
        </div>
      );
    case 'HORAS EXTRA':
      return (
        <div className="grid grid-cols-6 gap-2">
          {/* Cédula */}
          <div className="col-span-3">
            <label className={labelStyle}>Cédula del Empleado</label>
            <input
              title="cedula"
              value={novedad.cedula}
              disabled
              className={inputStyle}
            />
          </div>

          {/* Nombre */}
          <div className="col-span-3">
            <label className={labelStyle}>Nombres Completos</label>
            <input
              title="nombre"
              value={novedad.nombre}
              disabled
              className={inputStyle}
            />
          </div>

          {/* Concepto */}
          <div className="col-span-2">
            <label className={labelStyle}>Concepto</label>
            <input
              title="Concepto"
              value={novedad.concepto || ''}
              disabled
              className={inputStyle}
            />
          </div>

          {/* Código Concepto */}
          <div className="col-span-1">
            <label className={labelStyle}>Código Concepto</label>
            <input
              title="Cod"
              value={novedad.codigo_concepto?.toString() || ''}
              disabled
              className={inputStyle}
            />
          </div>

          {/* Unidades */}
          <div className="col-span-1">
            <label className={labelStyle}>Unidades</label>
            <input
              title="Unid"
              value={novedad.unidades?.toString() || ''}
              disabled
              className={inputStyle}
            />
          </div>

          {/* Fecha de la Novedad */}
          <div className="col-span-2">
            <label className={labelStyle}>Fecha de la Novedad</label>
            <input
              title="FechaNov"
              value={formatearFecha(novedad.fecha_novedad)}
              disabled
              className={inputStyle}
            />
          </div>
          {/* Detalle */}
          <div className="col-span-6">
            <label className={labelStyle}>Detalle de la Novedad</label>
            <textarea
              title="detalle"
              value={novedad.detalle}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs text-black leading-tight"
              rows={2}
            />
          </div>
        </div>
      );
    case 'VACACIONES':
      return (
        <div className="grid grid-cols-6 gap-2">
          {/* Cédula */}
          <div className="col-span-3">
            <label className={labelStyle}>Cédula del Empleado</label>
            <input
              title="cedula"
              value={novedad.cedula}
              disabled
              className={inputStyle}
            />
          </div>

          {/* Nombre */}
          <div className="col-span-3">
            <label className={labelStyle}>Nombres Completos</label>
            <input
              title="nombre"
              value={novedad.nombre}
              disabled
              className={inputStyle}
            />
          </div>

          {/* Rango de Fechas */}
          <div className="col-span-3">
            <label className={labelStyle}>Rango de Fechas Disfrute</label>
            <input
              title="fechas"
              value={`${formatearFecha(novedad.fecha_inicio_disfrute)} a ${formatearFecha(novedad.fecha_fin_disfrute)}`}
              disabled
              className={inputStyle}
            />
          </div>

          {/* Días a tomar */}
          <div className="col-span-3">
            <label className={labelStyle}>Número de días a tomar</label>
            <input
              title="dias"
              value={novedad.dias?.toString() || ''}
              disabled
              className={inputStyle}
            />
          </div>

          {/* Detalle */}
          <div className="col-span-6">
            <label className={labelStyle}>Detalle de la Novedad</label>
            <textarea
              title="detalle"
              value={novedad.detalle}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs text-black leading-tight"
              rows={2}
            />
          </div>
        </div>
      );
    case 'AUXILIO DE TRANSPORTE':
    case 'DESCUENTO':
    case 'OTRO SI DEFINITIVO':
    case 'OTROS':
      return (
        <div className="grid grid-cols-6 gap-2">
          {/* Cédula */}
          <div className="col-span-3">
            <label className={labelStyle}>Cédula del Empleado</label>
            <input
              title="cedula"
              value={novedad.cedula}
              disabled
              className={inputStyle}
            />
          </div>

          {/* Nombre */}
          <div className="col-span-3">
            <label className={labelStyle}>Nombres Completos</label>
            <input
              title="nombre"
              value={novedad.nombre}
              disabled
              className={inputStyle}
            />
          </div>

          {/* Detalle */}
          <div className="col-span-6">
            <label className={labelStyle}>Detalle de la Novedad</label>
            <textarea
              title="detalle"
              value={novedad.detalle}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs text-black leading-tight"
              rows={3}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default CamposVistaPrevia;
