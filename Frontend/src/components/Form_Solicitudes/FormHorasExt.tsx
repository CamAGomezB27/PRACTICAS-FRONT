import axios from 'axios';
import { es } from 'date-fns/locale';
import React, { forwardRef, useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiClock } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo_home from '../../assets/logos/Logo_home.png';
import { useAuth } from '../../context/useAuth';
import ErroresArchivoAlert from '../Alerts/ErroresArchivoAlert';
import ExitoArchivoAlert from '../Alerts/ExitoArchivoAlert';

registerLocale('es', es);

const FormularioHorasExtra: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const titulo = location.state?.titulo || 'No disponible';

  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [fechaNovedad, setFechaNovedad] = useState<Date | null>(null);
  const [concepto, setConcepto] = useState('');
  const [codigo, setCodigo] = useState('');
  const [unidad, setUnidad] = useState('');
  const [detalle, setDetalle] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const [erroresArchivo, setErroresArchivo] = useState<string[] | null>(null);
  const [archivoSubido, setArchivoSubido] = useState<{
    tituloNovedad: string;
    idCaso: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isValid =
      /^\d{6,}$/.test(cedula) &&
      /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'.-]+$/.test(nombre) &&
      concepto.trim() !== '' &&
      codigo.trim() !== '' &&
      unidad.trim() !== '' &&
      detalle.trim().length > 0 &&
      detalle.trim().length <= 250 &&
      fechaNovedad !== null;

    setIsFormValid(isValid);
  }, [cedula, nombre, fechaNovedad, concepto, codigo, unidad, detalle]);

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
    setIsLoading(true);
    setErroresArchivo(null);
    setArchivoSubido(null);

    const payload = {
      cedula: Number(cedula),
      nombre,
      titulo,
      fecha_novedad: fechaNovedad?.toISOString(),
      concepto,
      codigo,
      unidad,
      detalle,
      categoria: titulo, // 👈 que no quede "-"
      tienda: user?.nombreTienda ?? '',
      jefe: user?.nombre ?? '',
      fecha: new Date(new Date().setHours(5, 0, 0, 0)).toISOString(), // 👈 igual que masivos
    };

    try {
      console.log('📤 Enviando payload:', payload);
      const response = await axios.post(
        'http://localhost:3000/archivo-adjunto/formulario-novedad',
        payload,
      );
      console.log('✅ Respuesta del backend:', response.data);

      if (response.data?.valido) {
        setArchivoSubido({
          tituloNovedad: titulo,
          idCaso: response.data.novedadId || 0,
        });
      } else {
        const errores = response.data.errores || [
          response.data.message || 'No se pudo crear la novedad',
        ];
        setErroresArchivo(errores);
      }
    } catch (error: unknown) {
      console.error('❌ Error al enviar el formulario:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.errores) {
          setErroresArchivo(error.response.data.errores);
        } else {
          setErroresArchivo([
            error.response?.data?.message || 'Algo salió mal en el servidor',
          ]);
        }
      } else {
        setErroresArchivo(['Error desconocido al enviar el formulario.']);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const conceptosHorasExtra: { [descripcion: string]: string } = {
    'Domingo Sin Compensatorio Diurno': '75',
    'Domingo Sin Compensatorio Nocturno': '110',
    'Dominical Con Compensatorio Diurno': '66',
    'Dominical Con Compensatorio Nocturno': '78',
    'Festivo Sin Compensatorio Diurno': '75',
    'Hora extra Diurna': '55',
    'Recargo Nocturno 35%': '45',
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

      {/* Tipo de jornada (Concepto) */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Concepto <span className="text-red-500">*</span>
        </label>
        <select
          title="Concepto"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={concepto}
          onChange={(e) => {
            const seleccion = e.target.value;
            setConcepto(seleccion);
            setCodigo(conceptosHorasExtra[seleccion] || '');
          }}
        >
          <option value="">Selecciona una opción</option>
          {Object.entries(conceptosHorasExtra).map(([desc, cod]) => (
            <option key={cod} value={desc}>
              {desc}
            </option>
          ))}
        </select>
      </div>

      {/* Concepto Código */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Concepto Código <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Código"
          className="w-full border rounded px-3 py-2 bg-gray-100 border-gray-400 text-black"
          value={codigo}
          readOnly
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

      {erroresArchivo && (
        <ErroresArchivoAlert
          errores={erroresArchivo}
          onClose={() => setErroresArchivo(null)}
        />
      )}

      {archivoSubido && (
        <ExitoArchivoAlert
          nombreArchivo="Formulario individual"
          tituloNovedad={archivoSubido.tituloNovedad}
          idCaso={archivoSubido.idCaso}
          onClose={() => {
            setArchivoSubido(null);
            navigate('/dashboard-jefe');
          }}
        />
      )}

      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-90 flex flex-col items-center justify-center transition-opacity duration-300">
          <img
            src={Logo_home}
            alt="Validando archivo"
            className="h-20 w-auto animate-bounce mb-4"
          />
          <p className="text-xl text-[#4669AF] font-semibold text-center flex items-center justify-center gap-2">
            Validando formulario
            <br />
            <FiClock className="animate-spin-slow text-2xl" />
          </p>
        </div>
      )}
    </div>
  );
};

export default FormularioHorasExtra;
