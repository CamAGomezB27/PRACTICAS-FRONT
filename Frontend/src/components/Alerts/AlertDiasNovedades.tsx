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
  const [mostrarContenedor, setMostrarContenedor] = useState(false);
  const [estado, setEstado] = useState<
    'antes20' | 'despues20' | 'postnomina' | null
  >(null);
  const [fase, setFase] = useState<
    'espera' | 'escribiendoLargo' | 'largo' | 'borrando' | 'escribiendo'
  >('espera');

  const [mensajeVisible, setMensajeVisible] = useState('');
  const [mensajeCorto, setMensajeCorto] = useState('');
  const [mensajeLargo, setMensajeLargo] = useState('');
  const [transicionando, setTransicionando] = useState(false);

  // Mostrar de una si es mensaje corto
  useEffect(() => {
    if (mostrarSoloCorto) {
      setMostrarContenedor(true);
      return;
    }

    const timerContenedor = setTimeout(() => {
      setMostrarContenedor(true);
    }, 2000);

    return () => clearTimeout(timerContenedor);
  }, [mostrarSoloCorto]);

  // Inicialización si mostrarSoloCorto es true (modo instantáneo)
  useEffect(() => {
    if (!mostrarSoloCorto) return;

    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = hoy.getMonth();
    const dia = hoy.getDate();

    hoy.setHours(0, 0, 0, 0);
    const penultimoHab = getPenultimateBusinessDay(año, mes - 1);
    if (!penultimoHab) return;

    penultimoHab.setHours(0, 0, 0, 0);
    const diasPost = getNextBusinessDays(penultimoHab, 5);
    const inicioPost = diasPost[0];
    const finPost = diasPost[diasPost.length - 1];
    const fechaStr = formatDate(finPost);

    inicioPost.setHours(0, 0, 0, 0);
    finPost.setHours(0, 0, 0, 0);

    let corto = '';

    if (hoy >= inicioPost && hoy <= finPost) {
      setEstado('postnomina');
      corto = `Novedades hasta el ${fechaStr}, primera postnómina.`;
    } else if (hoy > finPost && dia <= 20) {
      const mesStr = hoy.toLocaleString('es-CO', { month: 'long' });
      setEstado('antes20');
      corto = `Hasta el 20 de ${mesStr} serán tenidas en cuenta para la nómina.`;
    } else if (hoy > finPost && dia > 20) {
      const mesStr = hoy.toLocaleString('es-CO', { month: 'long' });
      setEstado('despues20');
      corto = `Después del 20 de ${mesStr}.`;
    }

    setMensajeCorto(corto);
    setMensajeVisible(corto);
  }, [mostrarSoloCorto]);

  // Animación completa (solo si NO es mostrarSoloCorto)
  useEffect(() => {
    if (!mostrarContenedor || mostrarSoloCorto) return;

    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = hoy.getMonth();
    const dia = hoy.getDate();

    hoy.setHours(0, 0, 0, 0);
    const penultimoHab = getPenultimateBusinessDay(año, mes - 1);
    if (!penultimoHab) return;

    penultimoHab.setHours(0, 0, 0, 0);
    const diasPost = getNextBusinessDays(penultimoHab, 5);
    const inicioPost = diasPost[0];
    const finPost = diasPost[diasPost.length - 1];
    const fechaStr = formatDate(finPost);

    inicioPost.setHours(0, 0, 0, 0);
    finPost.setHours(0, 0, 0, 0);

    let largo = '';
    let corto = '';

    if (hoy >= inicioPost && hoy <= finPost) {
      setEstado('postnomina');
      largo = `Las novedades cargadas hasta el ${fechaStr} serán analízadas y procesadas para la primera postnomina.`;
      corto = `Novedades hasta el ${fechaStr}, primera postnómina.`;
    } else if (hoy > finPost && dia <= 20) {
      const mesStr = hoy.toLocaleString('es-CO', { month: 'long' });
      setEstado('antes20');
      largo = `Las novedades cargadas hasta el 20 de ${mesStr} serán analízadas y procesadas para el pago de la nómina del mes actual.`;
      corto = `Hasta el 20 de ${mesStr} serán tenidas en cuenta para la nómina.`;
    } else if (hoy > finPost && dia > 20) {
      const mesStr = hoy.toLocaleString('es-CO', { month: 'long' });
      setEstado('despues20');
      largo = `Las novedades cargadas después del 20 de ${mesStr} serán analízadas y procesadas para la primera postnomina del proximo mes`;
      corto = `Después del 20 de ${mesStr}.`;
    }

    setMensajeLargo(largo);
    setMensajeCorto(corto);

    let escribirLargo: NodeJS.Timeout;
    let timeoutCambio: NodeJS.Timeout;

    const timerEscritura = setTimeout(() => {
      setFase('escribiendoLargo');
      let i = 0;
      escribirLargo = setInterval(() => {
        if (i >= largo.length) {
          clearInterval(escribirLargo);
          setFase('largo');
          timeoutCambio = setTimeout(() => {
            setTransicionando(true);
          }, 8000);
          return;
        }
        setMensajeVisible(largo.slice(0, i + 1));
        i++;
      }, 25);
    }, 1000);

    return () => {
      clearTimeout(timerEscritura);
      clearInterval(escribirLargo);
      clearTimeout(timeoutCambio);
    };
  }, [mostrarContenedor, mostrarSoloCorto]);

  // Transición largo -> corto (solo si NO es mostrarSoloCorto)
  useEffect(() => {
    if (!transicionando || mostrarSoloCorto) return;

    let i = mensajeLargo.length;

    const interval = setInterval(() => {
      if (i <= 0) {
        clearInterval(interval);
        setFase('escribiendo');
        let j = 0;
        const final = mensajeCorto.endsWith('.')
          ? mensajeCorto
          : mensajeCorto + '.';

        const escribir = setInterval(() => {
          if (j >= final.length) {
            clearInterval(escribir);
            setTransicionando(false);
            return;
          }
          setMensajeVisible(final.slice(0, j + 1));
          j++;
        }, 35);
        return;
      }
      i--;
      setMensajeVisible(mensajeLargo.slice(0, i));
      setFase('borrando');
    }, 30);

    return () => clearInterval(interval);
  }, [transicionando, mensajeLargo, mensajeCorto, mostrarSoloCorto]);

  const estilos = {
    antes20: {
      bg: 'bg-[#4669AF]',
      icon: (
        <FiInfo
          className={`${mostrarSoloCorto ? 'text-2xl' : 'text-3xl'} text-[#4669AF]`}
        />
      ),
      shadow: 'shadow-[2px_4px_8px_rgba(70,105,175,0.8)]',
    },
    despues20: {
      bg: 'bg-yellow-500',
      icon: (
        <FiAlertTriangle
          className={`${mostrarSoloCorto ? 'text-2xl' : 'text-3xl'} text-yellow-700`}
        />
      ),
      shadow: 'shadow-[2px_4px_8px_rgba(234,179,8,0.8)]',
    },
    postnomina: {
      bg: 'bg-red-500',
      icon: (
        <FiClock
          className={`${mostrarSoloCorto ? 'text-2xl' : 'text-3xl'} text-red-700`}
        />
      ),
      shadow: 'shadow-[2px_4px_8px_rgba(239,68,68,0.8)]',
    },
  };

  if (!estado || !mostrarContenedor) return null;

  return (
    <div
      className={`transition-all duration-1000 ease-in-out w-full ${
        mostrarSoloCorto || fase === 'escribiendo'
          ? 'max-w-lg p-1.5 scale-95 gap-2'
          : 'max-w-md md:max-w-lg p-2 gap-4'
      } ${estilos[estado].bg} border-white rounded-3xl ${estilos[estado].shadow} flex items-center
         opacity-0 scale-95 animate-fadeIn`}
    >
      <div className="bg-white p-2 rounded-full shadow-md">
        {estilos[estado].icon}
      </div>
      <p
        className={`text-white font-semibold leading-snug transition-all duration-700 ease-in-out whitespace-pre-wrap ${
          mostrarSoloCorto || fase === 'escribiendo'
            ? 'text-xs md:text-sm'
            : 'text-sm md:text-base'
        }`}
      >
        {mensajeVisible}
      </p>
    </div>
  );
};

export default AlertDiasNovedades;
