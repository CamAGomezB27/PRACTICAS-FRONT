const BarraInformativaNovPendientes = ({ cantidad }: { cantidad: number }) => {
  return (
    <div className="w-full bg-[#4669AF] text-white text-center py-2 rounded-full shadow-md text-sm font-semibold mb-4">
      Hay {cantidad} Solicitudes Sin Gestionar
    </div>
  );
};

export default BarraInformativaNovPendientes;
