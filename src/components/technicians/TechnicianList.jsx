import React from 'react';
import PropTypes from 'prop-types';
import { Technician } from './Technician';

export const TechnicianList = ({ technicians, onModify }) => {
  return technicians.map((technician) => (
    <Technician
      key={technician.id}
      technician={technician}
      onModify={onModify}
    />
  ));
};

TechnicianList.propTypes = {
  technicians: PropTypes.array.isRequired,
  onModify: PropTypes.func.isRequired,
};
