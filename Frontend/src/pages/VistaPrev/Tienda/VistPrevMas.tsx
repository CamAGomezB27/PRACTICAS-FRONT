import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import FormVistaPrevMasiva from '../../../components/Form_VistaPrev/Tienda/FormMasivo';

const VistaPrevisMasivaT: React.FC = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-6 transform -translate-y-8">
        <FormVistaPrevMasiva />
      </main>
      <Footer />
    </div>
  );
};

export default VistaPrevisMasivaT;
