import { createContext } from 'react';

//Tipo Usuario
export interface User {
  correo: string;
  id_usuario: number;
  nombre: string;
  esAdmin: boolean;
  esNomina: boolean;
  esJefe: boolean;
}

//Tipo Contexto
export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

//  exportamos el contexto
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
