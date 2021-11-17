import React from 'react';
import PropTypes from 'prop-types';
import { Boiler } from './Boiler';

export const BoilerList = ({ boilers }) => {
  return boilers.map((boiler) => <Boiler key={boiler.id} boiler={boiler} />);
};

BoilerList.propTypes = {
  boilers: PropTypes.array.isRequired,
};
