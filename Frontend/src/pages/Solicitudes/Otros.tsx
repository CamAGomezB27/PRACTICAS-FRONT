import React from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import FormSolicitudes from '../../components/Form_Solicitudes/Form';

const Otros: React.FC = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar panelTitle="Solicitud para Otros" userRoleTitle="Jefe Tienda" />
      <main className="flex-grow px-8 pt-8 pb-4">
        <div className="flex justify-between mb-6">
          <FormSolicitudes />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Otros;
