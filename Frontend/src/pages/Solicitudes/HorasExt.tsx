import React from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import FormSolicitudes from '../../components/Form_Solicitudes/Form';

const HorasExt: React.FC = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-6 transform -translate-y-8">
        <FormSolicitudes />
      </main>
      <Footer />
    </div>
  );
};

export default HorasExt;
