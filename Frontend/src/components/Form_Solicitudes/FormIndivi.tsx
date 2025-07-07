import React from 'react';
import { useLocation } from 'react-router-dom';
import FormularioAuxTransp from './FormAuxTransp';
import FormularioDesc from './FormDescuentos';
import FormularioHorasExtra from './FormHorasExt';
import FormularioOtros from './FormOtros';
import FormularioOtroSiTemporal from './FormOtroSiTemp';
import FormularioVacaciones from './FormVacaciones';
import FormularioOtroSiDef from './FromOtrSDef';

const Individual: React.FC = () => {
  const { state } = useLocation();
  const titulo = state?.titulo || '';

  const RenderForm = () => {
    switch (titulo) {
      case 'Auxilio de transporte':
        return <FormularioAuxTransp />;
      case 'Descuento':
        return <FormularioDesc />;
      case 'Otro Si Definitivo':
        return <FormularioOtroSiDef />;
      case 'Otros':
        return <FormularioOtros />;
      case 'Vacaciones':
        return <FormularioVacaciones />;
      case 'Otro Si Temporal':
        return <FormularioOtroSiTemporal />;
      case 'Horas Extra':
        return <FormularioHorasExtra />;
    }
  };

  return <div>{RenderForm()}</div>;
};

export default Individual;
