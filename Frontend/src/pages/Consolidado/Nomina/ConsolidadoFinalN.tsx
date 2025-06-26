import React from 'react';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';

const ExportConstNom: React.FC = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow py-6">
        <div className="flex flex-col lg:flex-row h-full">
          {/* FILTROS */}
          <div className="lg:w-1/4 px-4 lg:pl-10 lg:pr-0 translate-y-7"></div>
          {/* TABLA */}
          <div className="lg:w-3/4 px-4 lg:pl-0 lg:pr-10"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExportConstNom;
