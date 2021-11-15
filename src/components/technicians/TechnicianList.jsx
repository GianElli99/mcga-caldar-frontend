import React from 'react';
import PropTypes from 'prop-types';
import { Technician } from './Technician';

export const TechnicianList = ({ technicians }) => {
  return technicians.map((technician) => (
    <Technician key={technician.id} technician={technician} />
  ));
};

TechnicianList.propTypes = {
  technicians: PropTypes.array.isRequired,
};
