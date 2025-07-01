interface filas {
  id: number;
  numero: number;
  fechaReporte: string;
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
  fechInicioDisfrute: string;
  fechaFinDisfrute: string;
  ResponsableValidacion: string;
  RespuestaValidacion: string;
  ajuste: string;
  Fechapago: string;
  AreaRespon: string;
  CategInconsitencia: string;
}

const TablaRespMasiv = ({ datos }: { datos: filas[] }) => {
  const columnas = [
    'ID',
    'N',
    'FECHA',
    'CEDULA',
    'NOMBRE',
    'CATEGORIA',
    'TIENDA',
    'JEFE',
    'DETALLE',
    'JORNADA EMPLEADO',
    'JORNADA OTRO SI TEMPORAL',
    'FECHA INICIO',
    'FECHA FIN',
    'SALARIO ACTUAL',
    'SALARIO OTRO SI TEMPORAL',
    'CONSECUTIVO FORMS',
    'CONCEPTO',
    'CON_CODIGO',
    'UNIDADES',
    'FECHA NOVEDAD',
    'FECHA INICIO DISFRUTE',
    'FECHA FIN DISFRUTE',
    'RESPONSABLE VALIDACIÓN',
    'RESPUESTA VALIDACIÓN',
    'AJUSTE',
    'FECHA DE PAGO',
    'ÁREA RESPONSABLE',
    'CATEGORIA INCONSISTENCIA',
  ];

  return (
    <div className="w-full">
      <table className="min-w-full table-fixed border-collapse text-sm bg-white">
        <thead className="bg-[#4669AF] text-white sticky top-0 z-10">
          <tr>
            {columnas.map((col, i) => (
              <th
                key={i}
                className="border-r border-gray-300 px-3 py-3 font-semibold text-xs text-left w-[160px] min-w-[160px] sticky top-0 bg-[#4669AF]"
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
              key={`fila-${rowIndex}`}
              className={`hover:bg-gray-50 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              {[
                fila.id,
                fila.numero,
                fila.fechaReporte,
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
                typeof fila.salarioActual === 'number' &&
                !isNaN(fila.salarioActual)
                  ? fila.salarioActual.toLocaleString('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                    })
                  : '',
                typeof fila.salarioOtroSiTemp === 'number' &&
                !isNaN(fila.salarioOtroSiTemp)
                  ? fila.salarioOtroSiTemp.toLocaleString('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                    })
                  : '',
                fila.consForms,
                fila.concepto,
                isNaN(fila.codigo) ? '' : fila.codigo,
                isNaN(fila.unidades) ? '' : fila.unidades,
                fila.fechaNove,
                fila.fechInicioDisfrute,
                fila.fechaFinDisfrute,
                fila.ResponsableValidacion,
                fila.RespuestaValidacion,
                fila.ajuste,
                fila.Fechapago,
                fila.AreaRespon,
                fila.CategInconsitencia,
              ].map((valor: string | number, idx: number) => (
                <td
                  key={idx}
                  className="border-r border-b border-gray-200 px-3 py-2 text-xs w-[160px] min-w-[160px] text-black"
                >
                  <div className="truncate" title={String(valor)}>
                    {typeof valor === 'number' && isNaN(valor) ? '' : valor}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaRespMasiv;
