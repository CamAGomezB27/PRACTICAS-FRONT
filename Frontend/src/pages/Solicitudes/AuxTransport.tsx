import React from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

const SoliAuxTrans: React.FC = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar
        panelTitle="Solicitud para Auxilio de Transporte"
        userRoleTitle="Jefe Tienda"
      />
      <main className="flex-grow px-8 pt-8 pb-4">
        <div className="flex justify-between mb-6"></div>
      </main>
      <Footer />
    </div>
  );
};

export default SoliAuxTrans;
