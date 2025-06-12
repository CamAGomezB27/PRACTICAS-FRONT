import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import LogoHome from '../../assets/logos/Logo_home.png';

type Props = {
  visible: boolean;
  onFinish: () => void;
};

export default function SplashScreen({ visible, onFinish }: Props) {
  const [shouldRender, setShouldRender] = useState(visible);
  const [startExit, setStartExit] = useState(false);
  const [exitY, setExitY] = useState(0);

  useEffect(() => {
    if (!visible) return;

    setExitY(window.innerHeight);

    const delayBeforeExit = setTimeout(() => {
      setStartExit(true);
    }, 2000); // ⏱️ visible 2 segundos

    const finishSplash = setTimeout(() => {
      setShouldRender(false);
      onFinish();
    }, 3200); // ⏱️ animación + fade

    return () => {
      clearTimeout(delayBeforeExit);
      clearTimeout(finishSplash);
    };
  }, [visible, onFinish]);

  if (!shouldRender) return null;

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={startExit ? { y: -exitY, opacity: 0.4 } : { y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1] }}
      className="fixed top-0 left-0 w-full h-screen z-50 bg-[#4669AF] flex items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-white text-4xl md:text-6xl font-bold"
        >
          Nómina - Homecenter
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="h-1 w-60 bg-white my-4 origin-center rounded-full"
        />

        <motion.img
          src={LogoHome}
          alt="Logo Homecenter"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="w-32 md:w-40 mt-2"
        />
      </motion.div>
    </motion.div>
  );
}
