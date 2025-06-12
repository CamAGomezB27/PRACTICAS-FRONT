import { ReactNode, useEffect, useState } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';
import SplashScreen from '../components/Loading/SplashScreen';
import axios from 'axios';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [loading, setLoading] = useState(true);
  const [splashVisible, setSplashVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/profile', {
          withCredentials: true,
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

  useEffect(() => {
    if (!loading) {
      const hasShownSplash = sessionStorage.getItem('splashShown');
      const isLoginPage =
        window.location.pathname === '/login' ||
        window.location.pathname === '/';

      // Mostrar splash si:
      // 1. No se ha mostrado antes en esta sesión, O
      // 2. Estamos en la página de login, O
      // 3. Venimos de un logout
      if (!hasShownSplash || isLoginPage || isLoggingOut) {
        setSplashVisible(true);

        // Solo marcar como mostrado si NO estamos en login
        if (!isLoginPage) {
          sessionStorage.setItem('splashShown', 'true');
        }

        const timeout = setTimeout(() => {
          setSplashVisible(false);
          // Limpiar el estado de logout después del splash
          if (isLoggingOut) {
            setIsLoggingOut(false);
          }
        }, 4500);

        return () => clearTimeout(timeout);
      }
    }
  }, [loading, isLoggingOut]);

  const logout = async () => {
    try {
      // Activar el estado de logout ANTES de hacer la petición
      setIsLoggingOut(true);

      await axios.post('http://localhost:3000/auth/logout', null, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('error al cerrar sesión:', error);
    } finally {
      setUser(null);
      // Limpiar el flag del splash al hacer logout para que aparezca en el próximo login
      sessionStorage.removeItem('splashShown');
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}

      {splashVisible && (
        <SplashScreen visible={splashVisible} onFinish={() => {}} />
      )}
    </AuthContext.Provider>
  );
};
