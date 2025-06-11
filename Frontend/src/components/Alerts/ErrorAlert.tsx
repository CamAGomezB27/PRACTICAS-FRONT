import { useEffect, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setClosing(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (closing) {
      const timer = setTimeout(() => onClose(), 5000);
      return () => clearTimeout(timer);
    }
  }, [closing, onClose]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        closing
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 backdrop-blur-sm'
      }`}
    >
      <div
        className={`relative bg-[#4669AF] text-white px-8 py-6 rounded-3xl shadow-2xl border-4 border-white max-w-md w-full mx-4 flex items-center gap-5 transform transition-all duration-500 ${
          closing
            ? '-translate-y-20 opacity-0 scale-95'
            : 'translate-y-0 opacity-100 scale-100 animate-slideUp'
        }`}
      >
        <div className="bg-yellow-300 text-[#4669AF] p-2 rounded-full shadow-md animate-ping-slow">
          <FiAlertTriangle className="text-4xl" />
        </div>
        <p className="text-white text-lg font-extrabold drop-shadow-sm leading-snug">
          {message}
        </p>
      </div>
    </div>
  );
};

export default ErrorAlert;
