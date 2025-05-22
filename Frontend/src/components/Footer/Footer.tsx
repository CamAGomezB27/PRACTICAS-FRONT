import React from 'react';
import logo from '../../assets/logos/Logo_home.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#4669AF] text-white py-4 px-6 shadow-inner flex items-center justify-between text-sm mt-auto">
      <div className="flex items-center gap-3">
        <span>@ {new Date().getFullYear()} Sodimac Colombia </span>
      </div>
      <img src={logo} alt="Logo Homecenter" className="h-10 w-auto" />
      <div className="hidden sm:block">Todos los derechos reservados.</div>
    </footer>
  );
};

export default Footer;
