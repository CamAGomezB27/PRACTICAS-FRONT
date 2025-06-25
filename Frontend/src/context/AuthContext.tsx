import { createContext } from 'react';

//Tipo Usuario
export interface User {
  nombre: string;
  correo: string;
  id_usuario: number;
  rol: string;
  esAdmin: boolean;
  esNomina: boolean;
  esJefe: boolean;
  panelTitle: string;
  userRoleTitle: string;
  nombreTienda: string;
}

//Tipo Contexto
export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  loading: boolean;
}

//  exportamos el contexto
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
