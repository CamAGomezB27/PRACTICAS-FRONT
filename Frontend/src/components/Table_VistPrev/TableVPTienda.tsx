interface filas {
  id: number;
  numero: number;
  fecha: string;
  cedula: string;
  nombre: string;
  categoria: string;
  tienda: string;
  jefe: string;
  detalle: string;
  jornadaEmAc: string;
  jornadaOtrSiTem: string;
  fechainicio: string;
  fechafin: string;
  salarioActual: number;
  salarioOtroSiTemp: number;
  consForms: string;
  concepto: string;
  codigo: number;
  unidades: number;
  fechaNove: string;
  diasATomar: number;
  fechInicioDisfrute: string;
  fechaFinDisfrute: string;
  ResponsableValidacion: string;
  RespuestaValidacion: string;
  ajuste: string;
  Fechapago: string;
}

const TablaVistaPreviaMasiva = ({ datos }: { datos: filas[] }) => {
  const columnas = [
    'ID',
    'N',
    'FECHA',
    'CÉDULA',
    'NOMBRE',
    'CATEGORÍA',
    'TIENDA',
    'JEFE',
    'DETALLE',
    'JORNADA EMPLEADO',
    'JORNADA OTRO SÍ TEMPORAL',
    'FECHA INICIO',
    'FECHA FIN',
    'SALARIO ACTUAL',
    'SALARIO OTRO SÍ TEMPORAL',
    'CONSECUTIVO FORMS',
    'CONCEPTO',
    'CON_CODIGO',
    'UNIDADES',
    'FECHA NOVEDAD',
    'DIAS A TOMAR',
    'FECHA INICIO DISFRUTE',
    'FECHA FIN DISFRUTE',
    'RESPONSABLE VALIDACIÓN',
    'RESPUESTA VALIDACIÓN',
    'AJUSTE',
    'FECHA DE PAGO',
  ];

  return (
    <div className="w-full">
      <div className="w-full rounded-b-md border border-gray-300">
        <table className="min-w-full table-fixed border-collapse text-sm bg-white">
          <thead className="bg-[#4669AF] text-white sticky top-0 z-10">
            <tr>
              {columnas.map((col, i) => (
                <th
                  key={i}
                  className="border-r border-gray-300 px-3 py-3 font-semibold text-xs text-left min-w-[160px] bg-[#4669AF]"
                >
                  <div className="whitespace-normal break-words leading-tight">
                    {col}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {datos.map((fila, rowIndex) => (
              <tr
                key={fila.id}
                className={`hover:bg-gray-50 ${
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                {[
                  fila.id,
                  fila.numero,
                  fila.fecha,
                  fila.cedula,
                  fila.nombre,
                  fila.categoria,
                  fila.tienda,
                  fila.jefe,
                  fila.detalle,
                  fila.jornadaEmAc,
                  fila.jornadaOtrSiTem,
                  fila.fechainicio,
                  fila.fechafin,
                  typeof fila.salarioActual === 'number'
                    ? fila.salarioActual.toLocaleString('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                      })
                    : fila.salarioActual,
                  typeof fila.salarioOtroSiTemp === 'number'
                    ? fila.salarioOtroSiTemp.toLocaleString('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                      })
                    : fila.salarioOtroSiTemp,
                  fila.consForms,
                  fila.concepto,
                  fila.codigo,
                  fila.unidades,
                  fila.fechaNove,
                  fila.diasATomar,
                  fila.fechInicioDisfrute,
                  fila.fechaFinDisfrute,
                  fila.ResponsableValidacion,
                  fila.RespuestaValidacion,
                  fila.ajuste,
                  fila.Fechapago,
                ].map((valor, idx) => (
                  <td
                    key={idx}
                    className="border-r border-b border-gray-200 px-3 py-2 text-xs min-w-[160px] text-black"
                  >
                    <div className="truncate" title={String(valor)}>
                      {valor}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaVistaPreviaMasiva;
