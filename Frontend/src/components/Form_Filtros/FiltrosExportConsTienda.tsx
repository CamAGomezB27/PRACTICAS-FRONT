import React, { useState, forwardRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';

registerLocale('es', es);

interface FiltroExportacion {
  tipo: string;
  desde: string;
  hasta: string;
}

const FiltroExportConsTienda = ({
  onApply,
}: {
  onApply: (filtros: FiltroExportacion) => void;
}) => {
  const [filtros, setFiltros] = useState<FiltroExportacion>({
    tipo: '',
    desde: '',
    hasta: '',
  });

  const [fechaDesde, setFechaDesde] = useState<Date | null>(null);
  const [fechaHasta, setFechaHasta] = useState<Date | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const limpiar = () => {
    setFiltros({ tipo: '', desde: '', hasta: '' });
    setFechaDesde(null);
    setFechaHasta(null);
  };

  const CustomInput = forwardRef<
    HTMLInputElement,
    React.ComponentProps<'input'>
  >(({ value, onClick }, ref) => (
    <input
      onClick={onClick}
      ref={ref}
      value={value}
      placeholder="Selecciona una fecha"
      readOnly
      className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
    />
  ));

  // Para el inicio del día (00:00 Bogota)
  const formatDesde = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T00:00:00-05:00`;
  };

  // Para el final del día (23:59:59.999 Bogota)
  const formatHasta = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T23:59:59.999-05:00`;
  };

  return (
    <div className="bg-white p-8 rounded-lg border border-gray-300 shadow-[2px_8px_12px_rgba(0,0,0,0.8)] hover:shadow-[4px_10px_14px_rgba(0,0,0,1)] hover:scale-105 transition-all duration-300 w-[280px]">
      {/* Header */}
      <div className="flex items-start mb-6">
        <div className="mr-3 mt-1">
          <div className="w-8 h-8 bg-[#4669AF] rounded-full flex items-center justify-center shadow">
            <Search className="w-4 h-4 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-700 leading-tight">
            Aplica tus filtros para organizar el <br />
            documento que quieres descargar
          </h2>
        </div>
      </div>

      {/* Tipo de Solicitud */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Tipo de Solicitud
        </label>
        <div className="relative group">
          <select
            title="Tipo"
            name="tipo"
            value={filtros.tipo}
            onChange={handleChange}
            className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-[#4669AF] cursor-pointer"
          >
            <option value="">Todas las solicitudes</option>
            <option value="Horas extra">Horas Extra</option>
            <option value="Otro Si Temporal">Otro Sí Temporal</option>
            <option value="Otro Si Definitivo">Otro Sí Definitivo</option>
            <option value="Vacaciones">Vacaciones</option>
            <option value="Descuento">Descuento</option>
            <option value="Auxilio de Transporte">Auxilio de Transporte</option>
            <option value="Otros">Otros</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Fecha Desde */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Fecha Desde
        </label>
        <DatePicker
          selected={fechaDesde}
          onChange={(date) => {
            setFechaDesde(date);
            setFiltros((prev) => ({
              ...prev,
              desde: date ? formatDesde(date) : '',
            }));
          }}
          locale="es"
          dateFormat="dd/MM/yyyy"
          customInput={<CustomInput />}
          placeholderText="Selecciona una fecha"
          popperClassName="text-sm scale-90"
          popperPlacement="right-start"
        />
      </div>

      {/* Fecha Hasta */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1 font-medium">
          Fecha Hasta
        </label>
        <DatePicker
          selected={fechaHasta}
          onChange={(date) => {
            setFechaHasta(date);
            setFiltros((prev) => ({
              ...prev,
              hasta: date ? formatHasta(date) : '',
            }));
          }}
          locale="es"
          dateFormat="dd/MM/yyyy"
          customInput={<CustomInput />}
          placeholderText="Selecciona una fecha"
          popperClassName="text-sm scale-90"
        />
      </div>

      {/* Botones */}
      <div className="flex gap-2">
        <button
          onClick={() => onApply(filtros)}
          className="flex-1 bg-[#4669AF] hover:bg-[#3a5a9b] text-white text-sm font-medium rounded-md h-10 transition-colors flex items-center justify-center text-center"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={limpiar}
          disabled={!filtros.tipo && !filtros.desde && !filtros.hasta}
          className={`flex-1 text-white text-sm font-medium rounded-md h-10 transition-colors flex items-center justify-center text-center ${
            filtros.tipo || filtros.desde || filtros.hasta
              ? 'bg-gray-700 hover:bg-gray-900 cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed opacity-50 text-black'
          }`}
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
};

export default FiltroExportConsTienda;
