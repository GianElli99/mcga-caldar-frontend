import React from 'react';
import PropTypes from 'prop-types';
import { Boiler } from './Boiler';

export const BoilerList = ({ boilers, onDelete, onModify }) => {
  return boilers.map((boiler) => (
    <Boiler
      key={boiler.id}
      boiler={boiler}
      onDelete={onDelete}
      onModify={onModify}
    />
  ));
};

BoilerList.propTypes = {
  boilers: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onModify: PropTypes.func.isRequired,
};
