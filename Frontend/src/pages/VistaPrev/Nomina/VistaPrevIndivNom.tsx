import React from 'react';
import Footer from '../../../components/Footer/Footer';
import FormVistaPrevIndiv from '../../../components/Form_VistaPrev/FormIndividual';
import Navbar from '../../../components/Navbar/Navbar';

const VistPrevNom: React.FC = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-white relative">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-6 transform -translate-y-6">
        <FormVistaPrevIndiv />
      </main>

      <Footer />
    </div>
  );
};
export default VistPrevNom;
