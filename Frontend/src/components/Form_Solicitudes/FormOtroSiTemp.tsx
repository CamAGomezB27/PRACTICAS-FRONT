import axios from 'axios';
import { es } from 'date-fns/locale';
import React, { forwardRef, useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';

registerLocale('es', es);

const FormularioOtroSiTemporal: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const titulo = location.state?.titulo || 'No disponible';

  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [fechaNovedad, setFechaNovedad] = useState<Date | null>(null);
  const [jornadaActual, setJornadaActual] = useState('');
  const [nuevaJornada, setNuevaJornada] = useState('');
  const [rangoFechas, setRangoFechas] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [salarioActual, setSalarioActual] = useState('');
  const [nuevoSalario, setNuevoSalario] = useState('');
  const [consecutivo, setConsecutivo] = useState('');
  const [detalle, setDetalle] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const [inicio, fin] = rangoFechas;
    const isValid =
      /^\d{6,}$/.test(cedula) &&
      /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'.-]+$/.test(nombre) &&
      fechaNovedad !== null &&
      jornadaActual.trim().length > 0 &&
      nuevaJornada.trim().length > 0 &&
      inicio !== null &&
      fin !== null &&
      /^\d+(\.\d{1,2})?$/.test(salarioActual) &&
      /^\d+(\.\d{1,2})?$/.test(nuevoSalario) &&
      consecutivo.trim().length > 0 &&
      detalle.trim().length > 0 &&
      detalle.length <= 250;

    setIsFormValid(isValid);
  }, [
    cedula,
    nombre,
    fechaNovedad,
    jornadaActual,
    nuevaJornada,
    rangoFechas,
    salarioActual,
    nuevoSalario,
    consecutivo,
    detalle,
  ]);

  const CustomRangeInput = forwardRef<
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

  const handleSubmit = async () => {
    const [fecha_inicio, fecha_fin] = rangoFechas;

    const payload = {
      cedula: Number(cedula),
      nombre,
      titulo,
      detalle,
      fecha_novedad: fechaNovedad?.toISOString(),
      jornada_actual: jornadaActual,
      nueva_jornada: nuevaJornada,
      fecha_inicio: fecha_inicio?.toISOString(),
      fecha_fin: fecha_fin?.toISOString(),
      salario_actual: parseFloat(salarioActual),
      nuevo_salario: parseFloat(nuevoSalario),
      consecutivo,
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
          `✅ ${response.data.message || 'Novedad registrada correctamente'}`,
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
      {/* Campos individuales (igual que antes)... */}

      {/* CÉDULA */}
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
          onChange={(e) =>
            /^\d*$/.test(e.target.value) && setCedula(e.target.value)
          }
        />
      </div>

      {/* NOMBRE */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Nombres Completos <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Camilo Andrés Gómez Bernal"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={nombre}
          onChange={(e) =>
            /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'.-]*$/.test(e.target.value) &&
            setNombre(e.target.value)
          }
        />
      </div>

      {/* FECHA DE LA NOVEDAD */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Fecha de la Novedad <span className="text-red-500">*</span>
        </label>
        <DatePicker
          selected={fechaNovedad}
          onChange={(date) => setFechaNovedad(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Seleccione la fecha"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          locale="es"
          popperPlacement="right-start"
          popperClassName="text-sm scale-90"
        />
      </div>

      {/* JORNADAS */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Jornada Actual <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Tiempo completo"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={jornadaActual}
          onChange={(e) => setJornadaActual(e.target.value)}
        />
      </div>
      <div>
        <label className="text-black font-medium mb-1 block">
          Nueva Jornada <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: Medio tiempo"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={nuevaJornada}
          onChange={(e) => setNuevaJornada(e.target.value)}
        />
      </div>

      {/* RANGO DE FECHAS */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Fecha Inicio y Fecha Fin <span className="text-red-500">*</span>
        </label>
        <DatePicker
          selectsRange
          startDate={rangoFechas[0]}
          endDate={rangoFechas[1]}
          onChange={(dates) =>
            setRangoFechas(dates as [Date | null, Date | null])
          }
          dateFormat="dd/MM/yyyy"
          locale="es"
          placeholderText="Selecciona un rango"
          customInput={<CustomRangeInput rangoFechas={rangoFechas} />}
          popperClassName="text-sm scale-90"
          popperPlacement="right-start"
        />
      </div>

      {/* SALARIOS */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Salario Actual <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          inputMode="decimal"
          placeholder="Ej: 1200000"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={salarioActual}
          onChange={(e) =>
            /^\d*\.?\d{0,2}$/.test(e.target.value) &&
            setSalarioActual(e.target.value)
          }
        />
      </div>
      <div>
        <label className="text-black font-medium mb-1 block">
          Nuevo Salario <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          inputMode="decimal"
          placeholder="Ej: 1350000"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={nuevoSalario}
          onChange={(e) =>
            /^\d*\.?\d{0,2}$/.test(e.target.value) &&
            setNuevoSalario(e.target.value)
          }
        />
      </div>

      {/* CONSECUTIVO */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Consecutivo del Formulario <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: OT-2025-001"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={consecutivo}
          onChange={(e) => setConsecutivo(e.target.value)}
        />
      </div>

      {/* DETALLE Y BOTONES */}
      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-[1fr_140px] gap-4 items-start">
        <div>
          <label className="text-black block font-medium mb-1">
            Escribe el detalle de la novedad{' '}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Describe detalladamente el motivo del Otro Sí temporal..."
            className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
            rows={2}
            maxLength={250}
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
          />
          <div className="text-sm text-right text-gray-500">
            {detalle.length}/250
          </div>
        </div>

        <div className="flex flex-col gap-2 py-4 items-end">
          <button
            className={`w-full px-4 py-2 rounded-lg text-white ${isFormValid ? 'bg-[#4669AF] hover:opacity-90' : 'bg-gray-400 cursor-not-allowed'}`}
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

export default FormularioOtroSiTemporal;
