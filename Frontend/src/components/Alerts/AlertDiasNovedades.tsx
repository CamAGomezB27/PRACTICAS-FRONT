import Holidays from 'date-holidays';
import { useEffect, useState } from 'react';
import { FiAlertTriangle, FiClock, FiInfo } from 'react-icons/fi';

const hd = new Holidays('CO');

const isBusinessDay = (date: Date) => {
  const day = date.getDay();
  return day >= 1 && day <= 5 && !hd.isHoliday(date);
};

const getPenultimateBusinessDay = (
  year: number,
  month: number,
): Date | null => {
  const days: Date[] = [];
  const lastDay = new Date(year, month + 1, 0);

  for (let d = lastDay.getDate(); d >= 1; d--) {
    const date = new Date(year, month, d);
    if (isBusinessDay(date)) days.push(date);
    if (days.length === 2) return days[1];
  }

  return null;
};

const getNextBusinessDays = (startDate: Date, count: number): Date[] => {
  const result: Date[] = [];
  const date = new Date(startDate);

  while (result.length < count) {
    date.setDate(date.getDate() + 1);
    if (isBusinessDay(date)) result.push(new Date(date));
  }

  return result;
};

const formatDate = (date: Date) =>
  date.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

interface AlertDiasNovedadesProps {
  mostrarSoloCorto?: boolean;
}

const AlertDiasNovedades: React.FC<AlertDiasNovedadesProps> = ({
  mostrarSoloCorto = false,
}) => {
  const [estado, setEstado] = useState<
    'antes20' | 'despues20' | 'postnomina' | null
  >(null);
  const [mensajeVisible, setMensajeVisible] = useState('');
  const [mensajeCorto, setMensajeCorto] = useState('');
  const [mensajeLargo, setMensajeLargo] = useState('');
  const [transicionando, setTransicionando] = useState(false);

  useEffect(() => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = hoy.getMonth();
    const dia = hoy.getDate();

    const penultimoHab = getPenultimateBusinessDay(año, mes - 1);
    if (!penultimoHab) return;

    const diasPost = getNextBusinessDays(penultimoHab, 5);
    const inicioPost = diasPost[0];
    const finPost = diasPost[diasPost.length - 1];
    const fechaStr = formatDate(finPost);

    if (hoy >= inicioPost && hoy <= finPost) {
      setEstado('postnomina');
      const largo = `Las novedades cargadas hasta el ${fechaStr} serán analízadas y procesadas para la primera postnomina.`;
      const corto = `Tienes hasta el ${fechaStr}.`;
      setMensajeLargo(largo);
      setMensajeCorto(corto);
      setMensajeVisible(mostrarSoloCorto ? corto : largo);
    } else if (hoy > finPost && dia <= 20) {
      const mesStr = hoy.toLocaleString('es-CO', { month: 'long' });
      const largo = `Las novedades cargadas hasta el 20 de ${mesStr} serán analízadas y procesadas para el pago de la nómina del mes actual.`;
      const corto = `Hasta el 20 de ${mesStr}.`;
      setEstado('antes20');
      setMensajeLargo(largo);
      setMensajeCorto(corto);
      setMensajeVisible(mostrarSoloCorto ? corto : largo);
    } else if (hoy > finPost && dia > 20) {
      const mesStr = hoy.toLocaleString('es-CO', { month: 'long' });
      const largo = `Las novedades cargadas después del 20 de ${mesStr} serán analízadas y procesadas para la primera postnomina del proximo mes`;
      const corto = `Después del 20 de ${mesStr}.`;
      setEstado('despues20');
      setMensajeLargo(largo);
      setMensajeCorto(corto);
      setMensajeVisible(mostrarSoloCorto ? corto : largo);
    }

    if (!mostrarSoloCorto) {
      const timeout = setTimeout(() => {
        setTransicionando(true);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [mostrarSoloCorto]);

  useEffect(() => {
    if (!transicionando || mostrarSoloCorto) return;

    let i = mensajeLargo.length;
    const corteSinPunto = mensajeCorto.endsWith('.')
      ? mensajeCorto.length - 1
      : mensajeCorto.length;

    const puntoFinal = mensajeCorto.endsWith('.') ? '.' : '';

    const interval = setInterval(() => {
      if (i <= corteSinPunto) {
        clearInterval(interval);
        setTransicionando(false);
        setMensajeVisible(mensajeCorto); // Se asegura de mostrar completo con punto
        return;
      }
      i--;
      setMensajeVisible(mensajeLargo.slice(0, i) + puntoFinal);
    }, 40);

    return () => clearInterval(interval);
  }, [transicionando, mensajeLargo, mensajeCorto, mostrarSoloCorto]);

  const estilos = {
    antes20: {
      bg: 'bg-[#4669AF]',
      icon: (
        <FiInfo
          className={`${
            mostrarSoloCorto ? 'text-2xl' : 'text-3xl'
          } text-[#4669AF]`}
        />
      ),
      shadow: 'shadow-[2px_4px_8px_rgba(70,105,175,0.8)]',
    },
    despues20: {
      bg: 'bg-yellow-500',
      icon: (
        <FiAlertTriangle
          className={`${
            mostrarSoloCorto ? 'text-2xl' : 'text-3xl'
          } text-yellow-700`}
        />
      ),
      shadow: 'shadow-[2px_4px_8px_rgba(234,179,8,0.8)]',
    },
    postnomina: {
      bg: 'bg-red-500',
      icon: (
        <FiClock
          className={`${
            mostrarSoloCorto ? 'text-2xl' : 'text-3xl'
          } text-red-700`}
        />
      ),
      shadow: 'shadow-[2px_4px_8px_rgba(239,68,68,0.8)]',
    },
  };

  if (!estado) return null;

  return (
    <div
      className={`transition-all duration-[1500ms] ease-in-out w-full ${
        mostrarSoloCorto
          ? 'max-w-xs p-2 gap-2'
          : 'max-w-md md:max-w-lg p-2 gap-4'
      } ${estilos[estado].bg} border-white rounded-3xl ${estilos[estado].shadow} flex items-center`}
    >
      <div className="bg-white p-2 rounded-full shadow-md">
        {estilos[estado].icon}
      </div>
      <p className="text-white font-semibold leading-snug text-sm md:text-base transition-all duration-700 ease-in-out whitespace-pre-wrap">
        {mensajeVisible}
      </p>
    </div>
  );
};

export default AlertDiasNovedades;
