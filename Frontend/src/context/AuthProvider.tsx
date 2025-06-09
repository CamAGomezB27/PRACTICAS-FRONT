import { ReactNode, useEffect, useState } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';
import axios from 'axios';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('/auth/profile', {
          withCredentials: true, //Cookies
        });
        setUser(response.data);
      } catch (error) {
        console.error('No hay sesión activa o el token expiró.', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) return <div>Cargando Sesión...</div>;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
