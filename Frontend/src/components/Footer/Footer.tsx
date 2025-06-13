import React from 'react';
import logo from '../../assets/logos/Logo_home.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#4669AF] text-white py-1 px-6 shadow-lg border-t-4 border-[#3a5a92] fixed bottom-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Sección izquierda */}
        <div className="flex items-center gap-3 order-2 sm:order-1">
          <span className="text-sm font-medium opacity-90 hover:opacity-100 transition-opacity">
            © {new Date().getFullYear()} Sodimac Colombia
          </span>
        </div>

        {/* Logo (centrado en móviles) */}
        <div className="order-1 sm:order-2">
          <img
            src={logo}
            alt="Logo Homecenter"
            className="h-10 w-auto hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Sección derecha */}
        <div className="hidden sm:block order-3 text-sm font-medium opacity-90 hover:opacity-100 transition-opacity">
          Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
};

export default Footer;
