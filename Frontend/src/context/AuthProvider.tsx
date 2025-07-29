import axios from 'axios';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import SplashScreen from '../components/Loading/SplashScreen';
import { AuthContext, AuthContextType } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [loading, setLoading] = useState(true);
  const [splashVisible, setSplashVisible] = useState(false);

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

  // Función para mostrar splash
  const showSplash = useCallback((reason: string) => {
    console.log('Mostrando splash por:', reason);
    setSplashVisible(true);

    const timeout = setTimeout(() => {
      setSplashVisible(false);
    }, 4500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!loading) {
      const hasShownSplash = sessionStorage.getItem('splashShown');
      const isLoginPage = window.location.pathname === '/';

      // Solo mostrar splash en login si no se ha mostrado antes (refresh o primera vez)
      if (isLoginPage && !hasShownSplash) {
        showSplash('login-first-time');
      }
      // Primera visita a la app (no login)
      else if (!hasShownSplash && !isLoginPage) {
        showSplash('first-visit');
        sessionStorage.setItem('splashShown', 'true');
      }
    }
  }, [loading, showSplash]);

  const logout = async () => {
    try {
      // Mostrar splash inmediatamente al hacer logout
      showSplash('logout');

      await axios.post('http://localhost:3000/auth/logout', null, {
        withCredentials: true,
      });
    } catch (error) {
      console.error('error al cerrar sesión:', error);
    } finally {
      //  Limpiar sesión local
      setUser(null);
      sessionStorage.clear();

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
