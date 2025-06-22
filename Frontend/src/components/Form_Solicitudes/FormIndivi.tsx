import React from 'react';
import { useLocation } from 'react-router-dom';
import FormularioAuxTransp from './FormAuxTransp';
import FormularioOtroSiDef from './FromOtrSDef';
import FormularioVacaciones from './FormVacaciones';
import FormularioOtroSiTemporal from './FormOtroSiTemp';
import FormularioHorasExtra from './FormHorasExt';
import FormularioOtros from './FormOtros';

const Individual: React.FC = () => {
  const { state } = useLocation();
  const titulo = state?.titulo || '';

  const RenderForm = () => {
    switch (titulo) {
      case 'Auxilio de transporte':
        return <FormularioAuxTransp />;
      case 'Otro Si Definitivo':
        return <FormularioOtroSiDef />;
      case 'Vacaciones':
        return <FormularioVacaciones />;
      case 'Otro Si Temporal':
        return <FormularioOtroSiTemporal />;
      case 'Horas Extra':
        return <FormularioHorasExtra />;
      case 'Otros':
        return <FormularioOtros />;
    }
  };

  return <div>{RenderForm()}</div>;
};

export default Individual;
