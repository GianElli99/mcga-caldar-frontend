import React from 'react';
import PropTypes from 'prop-types';
import { Building } from './Building';

export const BuildingList = ({ buildings }) => {
  return buildings.map((build) => <Building key={build.id} building={build} />);
};

BuildingList.propTypes = {
  buildings: PropTypes.array.isRequired,
};
