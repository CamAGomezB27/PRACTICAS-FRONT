import React from 'react';

const inputStyle =
  'w-full bg-gray-100 border border-gray-300 rounded px-2 py-1 h-[30px] text-xs text-black leading-tight truncate';
const labelStyle = 'block text-gray-600 text-[11px] font-medium mb-0.5';

interface Props {
  respuesta: string;
  validacion: string;
  ajuste: boolean;
  fecha_ajuste: string;
  area_responsable: string;
  inconsistencia: string;
  fecha_pago: string;
}

const CamposRespuestaNomina: React.FC<Props> = ({
  respuesta,
  validacion,
  ajuste,
  fecha_ajuste,
  area_responsable,
  inconsistencia,
  fecha_pago,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2">
      {/* Respuesta */}
      <div className="col-span-3">
        <label className={labelStyle}>Respuesta*</label>
        <input
          value={respuesta}
          disabled
          className={inputStyle}
          title="respuesta"
        />
      </div>

      {/* Resultado Validación */}
      <div className="col-span-3">
        <label className={labelStyle}>Resultado de Validación*</label>
        <input
          value={validacion}
          disabled
          className={inputStyle}
          title="resultado"
        />
      </div>

      {/* Ajuste */}
      <div className="col-span-1">
        <label className={labelStyle}>Ajuste*</label>
        <div className="flex items-center gap-4 h-[30px] pl-1">
          <label className="flex items-center gap-1 text-xs text-gray-700">
            <div
              className={`w-4 h-4 rounded-full border border-gray-400 ${ajuste ? 'bg-gray-600' : 'bg-white'}`}
            ></div>
            Sí
          </label>
          <label className="flex items-center gap-1 text-xs text-gray-700">
            <div
              className={`w-4 h-4 rounded-full border border-gray-400 ${!ajuste ? 'bg-gray-600' : 'bg-white'}`}
            ></div>
            No
          </label>
        </div>
      </div>

      {/* Fecha de Ajuste */}
      <div className="col-span-2">
        <label className={labelStyle}>Fecha de Ajuste/Pago *</label>
        <input
          value={fecha_ajuste}
          disabled
          className={inputStyle}
          title="fecha_ajuste"
        />
      </div>

      {/* Área Responsable */}
      <div className="col-span-3">
        <label className={labelStyle}>Área Responsable *</label>
        <input
          value={area_responsable}
          disabled
          className={inputStyle}
          title="area_responsable"
        />
      </div>

      {/* Inconsistencia */}
      <div className="col-span-3">
        <label className={labelStyle}>Inconsistencia / Aclaración</label>
        <input
          value={inconsistencia}
          disabled
          className={inputStyle}
          title="inconsistencia"
        />
      </div>

      {/* Fecha de Ajuste/Pago (segunda vez) */}
      <div className="col-span-3">
        <label className={labelStyle}>Fecha de Ajuste/Pago *</label>
        <input
          value={fecha_pago}
          disabled
          className={inputStyle}
          title="fecha_pago"
        />
      </div>
    </div>
  );
};

export default CamposRespuestaNomina;
