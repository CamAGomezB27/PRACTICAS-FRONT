import React from 'react';
import Footer from '../../../components/Footer/Footer';
import FormVistaPrevMasivaNom from '../../../components/Form_VistaPrev/Nomina/FormMasivoNom';
import Navbar from '../../../components/Navbar/Navbar';

const VistaPrevisMasivaNom: React.FC = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-6 transform -translate-y-8">
        <FormVistaPrevMasivaNom />
      </main>
      <Footer />
    </div>
  );
};

export default VistaPrevisMasivaNom;
