import { es } from 'date-fns/locale';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const inputStyle =
  'w-full bg-gray-100 border border-gray-300 rounded px-[6px] py-[2px] h-[26px] text-[10px] text-black leading-tight truncate';

const labelStyle = 'block text-gray-600 text-[10px] font-medium mb-[2px]';

interface Props {
  respuesta: string;
  validacion: string;
  ajuste: boolean;
  area_responsable: string;
  inconsistencia: string;
  fecha_pago: Date | null;
  responsable_validacion: string;
  editable?: boolean;
  setRespuestaNomina?: React.Dispatch<
    React.SetStateAction<{
      respuesta: string;
      validacion: string;
      ajuste: boolean;
      area_responsable: string;
      inconsistencia: string;
      fecha_pago: Date | null;
      responsable_validacion: string;
    }>
  >;
}

const CamposRespuestaNomina: React.FC<Props> = ({
  responsable_validacion,
  respuesta,
  validacion,
  ajuste,
  area_responsable,
  inconsistencia,
  fecha_pago,
  editable = false,
  setRespuestaNomina,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2">
      {/* RESPONSABLE VALIDACION */}
      <div className="col-span-3">
        <label className={labelStyle}>Responsable de Validación *</label>
        <input
          value={responsable_validacion}
          disabled={!editable}
          onChange={(e) =>
            setRespuestaNomina?.((prev) => ({
              ...prev,
              responsable_validacion: e.target.value,
            }))
          }
          className={inputStyle}
          title="responsable_validacion"
        />
      </div>

      {/* Respuesta */}
      <div className="col-span-3">
        <label className={labelStyle}>Respuesta*</label>
        <input
          value={respuesta}
          disabled={!editable}
          onChange={(e) =>
            setRespuestaNomina?.((prev) => ({
              ...prev,
              respuesta: e.target.value,
            }))
          }
          className={inputStyle}
          title="respuesta"
        />
      </div>

      {/* Resultado Validación */}
      <div className="col-span-3">
        <label className={labelStyle}>Resultado de Validación*</label>
        <input
          value={validacion}
          disabled={!editable}
          onChange={(e) =>
            setRespuestaNomina?.((prev) => ({
              ...prev,
              validacion: e.target.value,
            }))
          }
          className={inputStyle}
          title="resultado"
        />
      </div>

      {/* Ajuste */}
      <div className="col-span-1">
        <label className={labelStyle}>Ajuste*</label>
        <div className="flex items-center gap-4 h-[30px] pl-1">
          <label className="flex items-center gap-1 text-xs text-gray-700">
            <input
              type="radio"
              disabled={!editable}
              checked={ajuste}
              onChange={() =>
                setRespuestaNomina?.((prev) => ({ ...prev, ajuste: true }))
              }
            />
            Sí
          </label>
          <label className="flex items-center gap-1 text-xs text-gray-700">
            <input
              type="radio"
              disabled={!editable}
              checked={!ajuste}
              onChange={() =>
                setRespuestaNomina?.((prev) => ({ ...prev, ajuste: false }))
              }
            />
            No
          </label>
        </div>
      </div>

      {/* Fecha de Ajuste */}
      <div className="col-span-2">
        <label className={labelStyle}>Fecha de Ajuste/Pago *</label>
        <DatePicker
          selected={fecha_pago}
          onChange={(date) =>
            setRespuestaNomina?.((prev) => ({
              ...prev,
              fecha_pago: date,
            }))
          }
          locale={es}
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecciona una fecha"
          disabled={!editable}
          className={inputStyle}
          popperClassName="text-sm scale-90"
          popperPlacement="right-start"
        />
      </div>

      {/* Área Responsable */}
      <div className="col-span-3">
        <label className={labelStyle}>Área Responsable *</label>
        <input
          value={area_responsable}
          disabled={!editable}
          onChange={(e) =>
            setRespuestaNomina?.((prev) => ({
              ...prev,
              area_responsable: e.target.value,
            }))
          }
          className={inputStyle}
          title="area_responsable"
        />
      </div>

      {/* Inconsistencia */}
      <div className="col-span-3">
        <label className={labelStyle}>Inconsistencia / Aclaración</label>
        <input
          value={inconsistencia}
          disabled={!editable}
          onChange={(e) =>
            setRespuestaNomina?.((prev) => ({
              ...prev,
              inconsistencia: e.target.value,
            }))
          }
          className={inputStyle}
          title="inconsistencia"
        />
      </div>
    </div>
  );
};

export default CamposRespuestaNomina;
