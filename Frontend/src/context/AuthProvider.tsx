import { ReactNode, useEffect, useState } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';
import axios from 'axios';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/profile', {
          withCredentials: true, //Cookies
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('No hay sesión activa o el token expiró.', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const logout = async () => {
    try {
      //Se indica al back logout
      await axios.post('http://localhost:3000/auth/logout', null, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('error al cerrar sesión:', error);
    } finally {
      setUser(null); //Limpiar usuario
    }
  };

  if (loading) return <div>Cargando Sesión...</div>;

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
