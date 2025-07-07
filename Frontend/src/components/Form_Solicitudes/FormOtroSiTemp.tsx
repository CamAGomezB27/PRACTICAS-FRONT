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

const FormularioOtroSiTemporal: React.FC = () => {
  const { user } = useAuth();
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

  const [erroresArchivo, setErroresArchivo] = useState<string[] | null>(null);
  const [archivoSubido, setArchivoSubido] = useState<{
    nombreArchivo: string;
    tituloNovedad: string;
    idCaso: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
          ? `${inicio.toLocaleDateString('es-CO')} - selecciona fecha final`
          : 'Selecciona rango de fechas';

    return (
      <input
        type="text"
        onClick={onClick}
        ref={ref}
        placeholder="Fecha de inicio - Fecha final"
        readOnly
        className="w-[280px] md:w-[250px] border rounded px-3 py-2 bg-white border-gray-600 text-black"
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
      titulo,
      detalle,
      fecha_novedad: fechaNovedad?.toISOString(),
      jornada_actual: jornadaActual,
      nueva_jornada: nuevaJornada,
      fecha_inicio: fecha_inicio?.toISOString(),
      fecha_fin: fecha_fin?.toISOString(),
      salario_actual: parseFloat(salarioActual),
      nuevo_salario: parseFloat(nuevoSalario),
      consecutivo: `OT${consecutivo.replace(/^OT/i, '')}`,
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
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

      {/* JORNADA ACTUAL */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Jornada Actual <span className="text-red-500">*</span>
        </label>
        <select
          title="JornadaAct"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={jornadaActual}
          onChange={(e) => setJornadaActual(e.target.value)}
        >
          <option value="">Selecciona una opción</option>
          <option value="JORNADA 33%">JORNADA 33%</option>
          <option value="JORNADA 50%">JORNADA 50%</option>
          <option value="JORNADA 75%">JORNADA 75%</option>
          <option value="JORNADA 100%">JORNADA 100%</option>
        </select>
      </div>

      {/* NUEVA JORNADA */}
      <div>
        <label className="text-black font-medium mb-1 block">
          Nueva Jornada <span className="text-red-500">*</span>
        </label>
        <select
          title="nuevaJor"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={nuevaJornada}
          onChange={(e) => setNuevaJornada(e.target.value)}
        >
          <option value="">Selecciona una opción</option>
          <option value="JORNADA 33%">JORNADA 33%</option>
          <option value="JORNADA 50%">JORNADA 50%</option>
          <option value="JORNADA 75%">JORNADA 75%</option>
          <option value="JORNADA 100%">JORNADA 100%</option>
        </select>
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
          placeholder="Ej: OT2025-001"
          className="w-full border rounded px-3 py-2 bg-white border-gray-600 text-black"
          value={`OT${consecutivo.replace(/^OT/i, '')}`}
          onChange={(e) => {
            const valueSinOT = e.target.value.replace(/^OT/i, '');
            setConsecutivo(valueSinOT);
          }}
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

export default FormularioOtroSiTemporal;
