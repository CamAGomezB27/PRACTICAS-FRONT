import React from 'react';
import { Download } from 'lucide-react';
import TablaConsTienda from '../Consolidado_Export/TablaConsolidadoTienda';

const VistaArchConsTienda = () => {
  const datosPrueba = [
    {
      id: 1,
      numero: 1,
      fechaReporte: '2025-06-20',
      cedula: '123456789',
      nombre: 'Juan Pérez',
      categoria: 'Auxiliar',
      tienda: 'Tienda 80',
      jefe: 'Laura Gómez',
      detalle: 'Horas extra nocturnas',
      jornadaEmAc: 'Diurna',
      jornadaOtrSiTem: 'Mixta',
      fechainicio: '2025-06-10',
      fechafin: '2025-06-15',
      salarioActual: 1200000,
      salarioOtroSiTemp: 1300000,
      consForms: 'ABC123',
      concepto: 'Horas extra',
      codigo: 201,
      unidades: 8,
      fechaNove: '2025-06-09',
      fechInicioDisfrute: '2025-06-11',
      fechaFinDisfrute: '2025-06-13',
      ResponsableValidacion: 'Jorge Luna',
      RespuestaValidacion: 'Aprobado',
      ajuste: 'Sí',
      Fechapago: '2025-06-25',
      AreaRespon: 'Nómina',
      CategInconsitencia: 'Ninguna',
    },
  ];

  const handleDescargar = () => {
    // Lógica para descargar archivo
    console.log('Descargando archivo...');
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="bg-white p-8 rounded-lg border border-gray-300 shadow-[2px_8px_12px_rgba(0,0,0,0.8)] hover:shadow-[4px_10px_14px_rgba(0,0,0,1)] hover:scale-105 transition-all duration-300">
        {/* Header con título y botón */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Vista Previa de Archivo Consolidado
            </h2>
            <p className="text-gray-600">
              Archivo consolidado de Histórico de solicitudes
            </p>
          </div>

          {/* Botón de descarga */}
          <button
            onClick={handleDescargar}
            className="bg-[#4669AF] hover:bg-[#3a5a9b] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Download className="w-4 h-4" />
            Descargar
          </button>
        </div>

        {/* Contenedor de la tabla con altura fija y scroll */}
        <div className="border border-gray-200 rounded-lg shadow-sm">
          <div className="max-h-[250px] overflow-auto scrollbar-thin scrollbar-thumb-[#4669AF] scrollbar-track-gray-200">
            <TablaConsTienda datos={datosPrueba} />
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-4 text-sm text-gray-500">
          <p>Total de registros: {datosPrueba.length}</p>
          <p>
            Use el scroll horizontal y vertical para navegar por todos los datos
          </p>
        </div>
      </div>
    </div>
  );
};

export default VistaArchConsTienda;
