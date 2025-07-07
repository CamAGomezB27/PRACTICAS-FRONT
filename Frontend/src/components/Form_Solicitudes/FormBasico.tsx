import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo_home from '../../assets/logos/Logo_home.png';
import { useAuth } from '../../context/useAuth';
import ErroresArchivoAlert from '../Alerts/ErroresArchivoAlert';
import ExitoArchivoAlert from '../Alerts/ExitoArchivoAlert';

const FormularioBasico: React.FC = () => {
  const { user } = useAuth();
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [detalle, setDetalle] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const titulo = location.state?.titulo || 'No disponible';

  const [isFormValid, setIsFormValid] = useState(false);

  const [erroresArchivo, setErroresArchivo] = useState<string[] | null>(null);
  const [archivoSubido, setArchivoSubido] = useState<{
    nombreArchivo: string;
    tituloNovedad: string;
    idCaso: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isValid =
      /^\d{6,}$/.test(cedula) &&
      /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s'.-]+$/.test(nombre) &&
      detalle.trim().length > 0 &&
      detalle.trim().length <= 250;

    setIsFormValid(isValid);
  }, [cedula, nombre, detalle]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setErroresArchivo(null);
      setArchivoSubido(null);

      const payload = {
        cedula: Number(cedula),
        nombre,
        detalle,
        titulo,
        categoria: titulo, // 👈 obligatorio para que no quede como '-'
        tienda: user?.nombreTienda ?? '',
        jefe: user?.nombre ?? '',
        fecha: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          5,
          0,
          0,
          0,
        ).toISOString(), // 👈 igual que los masivos
      };

      console.log('📤 Enviando payload:', payload);

      const response = await axios.post(
        'http://localhost:3000/archivo-adjunto/formulario-novedad',
        payload,
      );

      console.log('✅ Respuesta del backend:', response.data);

      if (response.data?.valido) {
        setArchivoSubido({
          nombreArchivo: 'Formulario Individual',
          tituloNovedad: titulo,
          idCaso: response.data.novedadId,
        });

        // Podés esperar unos segundos o navegar directo
        setTimeout(() => navigate('/dashboard-jefe'), 2500);
      } else {
        setErroresArchivo(
          response.data.errores || [
            response.data.message || 'No se pudo crear la novedad',
          ],
        );
      }
    } catch (error: unknown) {
      console.error('❌ Error al enviar el formulario:', error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('📥 Error Response Data:', error.response.data);
          setErroresArchivo([
            error.response.data?.message || 'Error del servidor inesperado',
          ]);
        } else if (error.request) {
          setErroresArchivo(['No se pudo conectar con el servidor.']);
        } else {
          setErroresArchivo([`Error inesperado de Axios: ${error.message}`]);
        }
      } else {
        setErroresArchivo(['Error desconocido al enviar el formulario.']);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            onClick={handleSubmit} // <- nuevo
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
          onClose={() => setArchivoSubido(null)}
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

export default FormularioBasico;
