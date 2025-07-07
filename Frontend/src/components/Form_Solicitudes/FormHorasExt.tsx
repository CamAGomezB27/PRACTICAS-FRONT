import axios from 'axios';
import { es } from 'date-fns/locale';
import React, { forwardRef, useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';

registerLocale('es', es);

const FormularioHorasExtra: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const titulo = location.state?.titulo || 'No disponible';

  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [fechaNovedad, setFechaNovedad] = useState<Date | null>(null);
  const [tipoJornada, setTipoJornada] = useState('');
  const [codigo, setCodigo] = useState('');
  const [unidad, setUnidad] = useState('');
  const [detalle, setDetalle] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      /^\d{6,}$/.test(cedula) &&
      /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'.-]+$/.test(nombre) &&
      tipoJornada.trim() !== '' &&
      codigo.trim() !== '' &&
      unidad.trim() !== '' &&
      detalle.trim().length > 0 &&
      detalle.trim().length <= 250 &&
      fechaNovedad !== null;

    setIsFormValid(isValid);
  }, [cedula, nombre, fechaNovedad, tipoJornada, codigo, unidad, detalle]);

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

  const handleSubmit = async () => {
    const payload = {
      cedula: Number(cedula),
      nombre,
      titulo,
      fecha_novedad: fechaNovedad?.toISOString(),
      tipo_jornada: tipoJornada,
      codigo,
      unidad,
      detalle,
    };

    try {
      console.log('📤 Enviando payload:', payload);

      const response = await axios.post(
        'http://localhost:3000/archivo-adjunto/formulario-novedad',
        payload,
      );

      console.log('✅ Respuesta del backend:', response.data);

      if (response.data?.valido) {
        alert(
          `✅ ${response.data.message || 'Horas extra registradas correctamente'}`,
        );
        navigate('/dashboard-jefe');
      } else {
        alert(
          `⚠️ Ocurrió un problema: ${response.data.message || 'No se pudo crear la novedad'}`,
        );
      }
    } catch (error: unknown) {
      console.error('❌ Error al enviar el formulario:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(
            `❌ Error del servidor: ${error.response.data?.message || 'Algo salió mal'}`,
          );
        } else if (error.request) {
          alert('❌ No se pudo conectar con el servidor. Intenta más tarde.');
        } else {
          alert(`❌ Error inesperado de Axios: ${error.message}`);
        }
      } else {
        alert('❌ Error desconocido al enviar el formulario.');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

      {/* Fecha de Novedad */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Fecha de la Novedad <span className="text-red-500">*</span>
        </label>
        <DatePicker
          selected={fechaNovedad}
          onChange={(date) => setFechaNovedad(date)}
          locale="es"
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecciona una fecha"
          customInput={<CustomInput />}
          popperClassName="text-sm scale-90"
          popperPlacement="right-start"
        />
      </div>

      {/* Tipo de jornada */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Tipo de Jornada <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Diurna, Nocturna..."
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={tipoJornada}
          onChange={(e) => setTipoJornada(e.target.value)}
        />
      </div>

      {/* Concepto Código */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Concepto Código <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: 0321"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
      </div>

      {/* Unidad */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Unidad <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Horas"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={unidad}
          onChange={(e) => setUnidad(e.target.value)}
        />
      </div>

      {/* Detalle + Botones */}
      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-[1fr_140px] gap-4 items-start">
        {/* Detalle */}
        <div>
          <label className="text-black font-medium mb-1 block">
            Detalle de la novedad <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Describe detalladamente el motivo de las horas extra..."
            className="w-full border rounded px-3 py-1.5 bg-white border-gray-600 text-black text-sm"
            rows={4}
            maxLength={250}
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
          />
          <div className="text-sm text-right text-gray-500">
            {detalle.length}/250
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-2 py-6 items-end">
          <button
            className={`w-full px-4 py-2 rounded-lg text-white ${
              isFormValid
                ? 'bg-[#4669AF] hover:opacity-90'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isFormValid}
            onClick={handleSubmit}
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

export default FormularioHorasExtra;
