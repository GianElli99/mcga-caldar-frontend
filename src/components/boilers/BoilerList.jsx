import React from 'react';
import PropTypes from 'prop-types';
import { Boiler } from './Boiler';

export const BoilerList = ({ boilers, onModify }) => {
  return boilers.map((boiler) => (
    <Boiler key={boiler.id} boiler={boiler} onModify={onModify} />
  ));
};

BoilerList.propTypes = {
  boilers: PropTypes.array.isRequired,
  onModify: PropTypes.func.isRequired,
};
