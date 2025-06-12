import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';

registerLocale('es', es);

const Individual: React.FC = () => {
  const navigate = useNavigate();

  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [detalle, setDetalle] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      /^\d{6,}$/.test(cedula) &&
      /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'.-]+$/.test(nombre) &&
      fecha.trim() !== '' &&
      detalle.trim().length > 0 &&
      detalle.trim().length <= 250;

    setIsFormValid(isValid);
  }, [cedula, nombre, fecha, detalle]);

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* CÉDULA */}
      <div>
        <label className="text-black block font-medium mb-1">
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

      {/* NOMBRES */}
      <div>
        <label className="text-black block font-medium mb-1">
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

      {/* FECHA */}
      <div>
        <label className="text-black block font-medium mb-1">
          Año y Mes de la Novedad <span className="text-red-500">*</span>
        </label>
        <DatePicker
          selected={fecha ? new Date(fecha + '-01') : null}
          onChange={(date: Date | null) => {
            if (date) {
              const formatted = date.toISOString().slice(0, 7);
              setFecha(formatted);
            }
          }}
          dateFormat="yyyy-MM"
          showMonthYearPicker
          locale="es"
          placeholderText="Seleccionar Año y Mes"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
        />
      </div>

      {/* Espacio vacío para mantener el grid */}
      <div></div>

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
        <div className="flex flex-col gap-2 py-10 items-end">
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

export default Individual;
