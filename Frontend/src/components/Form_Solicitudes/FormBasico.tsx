import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FormularioBasico: React.FC = () => {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [detalle, setDetalle] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const titulo = location.state?.titulo || 'No disponible';

  const [isFormValid, setIsFormValid] = useState(false);

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
      const payload = {
        cedula: Number(cedula),
        nombre,
        detalle,
        titulo,
      };

      console.log('📤 Enviando payload:', payload);

      const response = await axios.post(
        'http://localhost:3000/archivo-adjunto/formulario-novedad',
        payload,
      );

      console.log('✅ Respuesta del backend:', response.data);

      if (response.data?.valido) {
        alert(`✅ ${response.data.message || 'Novedad creada correctamente'}`);
        navigate('/dashboard-jefe');
      } else {
        alert(
          `⚠️ Ocurrió un problema: ${response.data.message || 'No se pudo crear la novedad'}`,
        );
      }
    } catch (error: unknown) {
      console.error('❌ Error al enviar el formulario:', error);

      if (axios.isAxiosError(error)) {
        // Error generado por Axios
        if (error.response) {
          console.error('📥 Error Response Data:', error.response.data);
          alert(
            `❌ Error del servidor: ${error.response.data?.message || 'Algo salió mal'}`,
          );
        } else if (error.request) {
          console.error('📭 No se recibió respuesta del servidor');
          alert('❌ No se pudo conectar con el servidor. Intenta más tarde.');
        } else {
          alert(`❌ Error inesperado de Axios: ${error.message}`);
        }
      } else {
        // Otro tipo de error que no es de Axios
        alert('❌ Error desconocido al enviar el formulario.');
      }
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
    </div>
  );
};

export default FormularioBasico;
