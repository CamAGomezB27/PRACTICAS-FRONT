import { createContext } from 'react';

interface User {
  correo: string;
  id_usuario: number;
  esAdmin: boolean;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// 👇 solo exportamos el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
