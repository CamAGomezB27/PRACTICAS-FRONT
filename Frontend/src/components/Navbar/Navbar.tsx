import React, { useEffect, useState, useRef } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [animateClose, setAnimateClose] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Manejar clic afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setAnimateClose(true);
        setTimeout(() => {
          setMenuOpen(false);
          setAnimateClose(false);
        }, 200);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      {/* Fondo translúcido personalizado */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-[#00000022] backdrop-blur-md z-40 transition-opacity duration-300"
          onClick={() => {
            setAnimateClose(true);
            setTimeout(() => {
              setMenuOpen(false);
              setAnimateClose(false);
            }, 200);
          }}
        />
      )}

      <nav
        className="
          bg-[#4669AF]
          text-white 
          px-6
          flex 
          items-center
          justify-between
          shadow-lg
          drop-shadow-[0_4px_8px_rgba(96,165,250,0.8)] 
          hover:transform hover:translate-y-[-2px]
          hover:drop-shadow-[0_6px_12px_rgba(96,165,250,1)]
          transition-all
          relative
          z-50
        "
      >
        {/* Botón menú */}
        <button
          type="button"
          aria-label="Opciones page"
          title="Opciones"
          className="text-3xl cursor-pointer"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>

        {/* Título del panel */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold tracking-wide uppercase">
          {user?.panelTitle || 'No disponible'}
        </h1>

        {/* Info del usuario */}
        <div className="flex items-center gap-3">
          <div className="text-right text-sm hidden sm:block">
            <div className="font-bold uppercase">
              {user?.userRoleTitle || 'No disponible'}
            </div>
            <div className="text-gray-200 text-xs">
              {user?.correo || 'No Disponible'}
            </div>
          </div>
          <FaUserCircle
            className="text-4xl sm:text-5xl cursor-pointer"
            aria-label="Usuario"
            title="Usuario"
          />
        </div>
      </nav>

      {/* MENÚ flotante */}
      {menuOpen && (
        <div
          ref={menuRef}
          className={`
      absolute top-[80px] left-4 sm:left-6 w-64
      bg-transparent text-[#1e3a8a]
      rounded-xl z-50
      overflow-hidden
      transition-all duration-200
      ${animateClose ? 'animate-slideOut' : 'animate-slideIn'}
    `}
        >
          <div className="flex flex-col py-2 gap-2">
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex items-center gap-4 px-5 py-3 text-sm font-medium text-[#1e3a8a] bg-white rounded-md shadow-sm hover:bg-[#4669AF] hover:text-white transition-colors"
            >
              <HiOutlineLogout className="text-xl" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* Animaciones */}
      <style>{`
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideOut {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.2s ease-out forwards;
        }

        .animate-slideOut {
          animation: slideOut 0.2s ease-in forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;
