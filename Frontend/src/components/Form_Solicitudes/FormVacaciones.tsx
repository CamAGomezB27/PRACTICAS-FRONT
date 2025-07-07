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

const FormularioVacaciones: React.FC = () => {
  const { user } = useAuth();
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
  const location = useLocation();
  const titulo = location.state?.titulo || 'No disponible';

  const [erroresArchivo, setErroresArchivo] = useState<string[] | null>(null);
  const [archivoSubido, setArchivoSubido] = useState<{
    nombreArchivo: string;
    tituloNovedad: string;
    idCaso: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async () => {
    setIsLoading(true);
    setErroresArchivo(null);
    setArchivoSubido(null);

    const [fecha_inicio, fecha_fin] = rangoFechas;

    const payload = {
      cedula: Number(cedula),
      nombre,
      detalle,
      titulo,
      categoria: titulo, // 👈 que no quede "-"
      tienda: user?.nombreTienda ?? '',
      jefe: user?.nombre ?? '',
      fecha: new Date(new Date().setHours(5, 0, 0, 0)).toISOString(), // 👈 igual que masivos
      fecha_inicio: fecha_inicio?.toISOString(),
      fecha_fin: fecha_fin?.toISOString(),
      dias: Number(dias),
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
          nombreArchivo: 'Formulario individual',
          tituloNovedad: titulo,
          idCaso: response.data.novedadId,
        });
        return;
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
        setErroresArchivo(['Error inesperado al enviar el formulario.']);
      }
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Días */}
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
          Fecha Inicio Disfrute y Fecha Fin Disfrute{' '}
          <span className="text-red-500">*</span>
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

      {/* Detalle + Botones */}
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-[1fr_140px] gap-4 items-start">
        <div>
          <label className="text-black block font-medium mb-1">
            Escribe el detalle de la novedad{' '}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Describe las fechas y motivo del disfrute de vacaciones…"
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

        <div className="flex flex-col gap-2 py-8 items-end">
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
          nombreArchivo={archivoSubido.nombreArchivo}
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

export default FormularioVacaciones;
