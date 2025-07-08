// src/utils/iconosPorEstado.tsx
import { ReactNode } from 'react';
import {
  FiCheckCircle,
  FiRefreshCw,
  FiTool,
  FiUploadCloud,
} from 'react-icons/fi';
import { HiOutlineDocumentCheck } from 'react-icons/hi2';

export type Estado =
  | 'CREADA'
  | 'GESTIONADA'
  | 'EN GESTIÓN'
  | 'RECHAZADA'
  | 'PENDIENTE';

// Ícono visual (ReactNode)
export const getIconoPorEstado = (
  estado: Estado,
  esNomina?: boolean,
): ReactNode => {
  if (esNomina) {
    switch (estado) {
      case 'CREADA':
      case 'PENDIENTE':
        return <FiUploadCloud className="text-xl text-blue-600" />;
      case 'EN GESTIÓN':
        return <FiTool className="text-xl text-yellow-600" />;
      case 'GESTIONADA':
        return <FiCheckCircle className="text-xl text-green-600" />;
      default:
        return null;
    }
  } else {
    switch (estado) {
      case 'CREADA':
      case 'PENDIENTE':
        return <FiUploadCloud className="text-xl text-blue-600" />;
      case 'EN GESTIÓN':
        return (
          <FiRefreshCw className="text-xl text-yellow-600 animate-spin-slow" />
        );
      case 'GESTIONADA':
        return <HiOutlineDocumentCheck className="text-xl text-green-600" />;
      default:
        return null;
    }
  }
};

// Nombre del ícono
export const getIconNamePorEstado = (
  estado: Estado,
  esNomina?: boolean,
): string => {
  if (esNomina) {
    switch (estado) {
      case 'CREADA':
      case 'PENDIENTE':
        return 'upload';
      case 'EN GESTIÓN':
        return 'tool';
      case 'GESTIONADA':
        return 'check';
      default:
        return '';
    }
  } else {
    switch (estado) {
      case 'CREADA':
      case 'PENDIENTE':
        return 'upload';
      case 'EN GESTIÓN':
        return 'refresh';
      case 'GESTIONADA':
        return 'document';
      default:
        return '';
    }
  }
};

// Color de fondo para etiquetas visuales
export const getColorPorEstado = (estado: Estado): string => {
  switch (estado) {
    case 'CREADA':
    case 'PENDIENTE':
      return 'bg-blue-500';
    case 'GESTIONADA':
      return 'bg-green-500';
    case 'EN GESTIÓN':
      return 'bg-yellow-600';
    case 'RECHAZADA':
      return 'bg-red-500';
    default:
      return 'bg-gray-400';
  }
};
