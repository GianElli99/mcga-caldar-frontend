import React from 'react';
import { TechnicianList } from './TechnicianList';
import technicians from '../../mocks/technicians.json';

export const TechnicianScreen = () => {
  return <TechnicianList technicians={technicians} />;
};
