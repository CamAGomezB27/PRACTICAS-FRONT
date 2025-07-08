import React from 'react';
import { Estado } from '../../utils/iconosPorEstado';

type DetalleNovedad = {
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

    default:
      return null;
  }
};

export default CamposVistaPrevia;
