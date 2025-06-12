import { useEffect, useState } from 'react';
import SplasScreen from './SplashScreen';

export default function LoadingPage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h.screen flex justify-center items-center bg-[##4669AF]">
      <SplasScreen visible={showSplash} onFinish={() => setShowSplash(false)} />
    </div>
  );
}
