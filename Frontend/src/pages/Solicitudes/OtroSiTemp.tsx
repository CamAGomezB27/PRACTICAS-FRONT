import React from 'react';
import AlertDiasNovedades from '../../components/Alerts/AlertDiasNovedades';
import Footer from '../../components/Footer/Footer';
import FormSolicitudes from '../../components/Form_Solicitudes/Form';
import Navbar from '../../components/Navbar/Navbar';

const OtroSiTemp: React.FC = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />

      {/* ALERT DIAS */}
      <div className="absolute top-20 right-2 z-50">
        <AlertDiasNovedades mostrarSoloCorto />
      </div>

      <main className="flex-grow flex items-center justify-center px-4 py-6 transform -translate-y-8">
        <FormSolicitudes />
      </main>

      <Footer />
    </div>
  );
};

export default OtroSiTemp;
