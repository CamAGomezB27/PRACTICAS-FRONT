import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import { forwardRef } from 'react';
registerLocale('es', es);

const FormularioVacaciones: React.FC = () => {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [dias, setDias] = useState('');
  const [rangoFechas, setRangoFechas] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [detalle, setDetalle] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const [start, end] = rangoFechas;
    const isValid =
      /^\d{6,}$/.test(cedula) &&
      /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'.-]+$/.test(nombre) &&
      /^\d+$/.test(dias) &&
      start !== null &&
      end !== null &&
      detalle.trim().length > 0 &&
      detalle.trim().length <= 250;

    setIsFormValid(isValid);
  }, [cedula, nombre, dias, rangoFechas, detalle]);

  const CustomInput = forwardRef<
    HTMLInputElement,
    React.ComponentProps<'input'> & { rangoFechas: [Date | null, Date | null] }
  >(({ onClick, rangoFechas }, ref) => {
    const [inicio, fin] = rangoFechas;
    const formattedValue =
      inicio && fin
        ? `${inicio.toLocaleDateString('es-CO')} - ${fin.toLocaleDateString('es-CO')}`
        : inicio
          ? `${inicio.toLocaleDateString('es-CO')} - ...`
          : '';

    return (
      <input
        type="text"
        onClick={onClick}
        ref={ref}
        placeholder="Fecha de inicio - Fecha final"
        readOnly
        className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
        value={formattedValue}
      />
    );
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Cédula */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Cédula del Empleado <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Ej: 1000380380"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={cedula}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) setCedula(value);
          }}
        />
      </div>

      {/* Nombre */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Nombres Completos <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Camilo Andrés Gómez Bernal"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={nombre}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'.-]*$/.test(value)) {
              setNombre(value);
            }
          }}
        />
      </div>

      {/* Dias a tomar */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Número de días a tomar <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: 10"
          inputMode="numeric"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={dias}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) setDias(value);
          }}
        />
      </div>

      {/* Rango de fechas */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Fecha Inicio y Fecha Fin <span className="text-red-500">*</span>
        </label>
        <DatePicker
          selected={rangoFechas[0]}
          onChange={(fechaInicio: Date | null) => {
            if (fechaInicio && dias) {
              const fechaFinal = new Date(fechaInicio);
              fechaFinal.setDate(fechaFinal.getDate() + parseInt(dias) - 1);
              setRangoFechas([fechaInicio, fechaFinal]);
            } else {
              setRangoFechas([fechaInicio, null]);
            }
          }}
          startDate={rangoFechas[0]}
          endDate={rangoFechas[1]}
          selectsStart
          locale={es}
          disabled={!dias}
          dateFormat="dd/MM/yyyy"
          placeholderText="Fecha de inicio - Fecha final"
          customInput={<CustomInput rangoFechas={rangoFechas} />}
          popperClassName="text-sm scale-90"
          popperPlacement="right-start"
        />
      </div>
      {/* DETALLE + BOTONES (grid interna de 2 columnas) */}
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-[1fr_140px] gap-4 items-start">
        {/* DETALLE */}
        <div>
          <label className="text-black block font-medium mb-1">
            Escribe el detalle de la novedad{' '}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Escribe detalladamente la situación que amerita el auxilio de transporte…"
            className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
            rows={4}
            maxLength={250}
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
          />
          <div className="text-sm text-right text-gray-500">
            {detalle.length}/250
          </div>
        </div>

        {/* BOTONES al lado derecho */}
        <div className="flex flex-col gap-2 py-8 items-end">
          <button
            className={`w-full px-4 py-2 rounded-lg text-white ${
              isFormValid
                ? 'bg-[#4669AF] hover:opacity-90'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isFormValid}
          >
            Guardar
          </button>
          <button
            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:opacity-90"
            onClick={() => navigate('/dashboard-jefe')}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioVacaciones;
