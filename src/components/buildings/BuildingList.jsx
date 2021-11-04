import React from 'react';
import PropTypes from 'prop-types';
import { Building } from './Building';

export const BuildingList = ({ buildings, onModify }) => {
  return buildings.map((build) => (
    <Building key={build.id} building={build} onModify={onModify} />
  ));
};

BuildingList.propTypes = {
  buildings: PropTypes.array.isRequired,
  onModify: PropTypes.func.isRequired,
};
