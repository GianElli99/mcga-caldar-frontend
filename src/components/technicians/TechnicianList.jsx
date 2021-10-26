import React from 'react';
import PropTypes from 'prop-types';
import { Technician } from './Technician';

export const TechnicianList = ({ technicians, onDelete, onModify }) => {
  return technicians.map((technician) => (
    <Technician
      key={technician.id}
      technician={technician}
      onDelete={onDelete}
      onModify={onModify}
    />
  ));
};

TechnicianList.propTypes = {
  technicians: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onModify: PropTypes.func.isRequired,
};
