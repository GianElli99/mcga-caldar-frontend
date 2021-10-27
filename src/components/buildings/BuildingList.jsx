import React from 'react';
import PropTypes from 'prop-types';
import { Building } from './Building';

export const BuildingList = ({ buildings, onDelete, onModify }) => {
  return buildings.map((build) => (
    <Building
      key={build.id}
      building={build}
      onDelete={onDelete}
      onModify={onModify}
    />
  ));
};

BuildingList.propTypes = {
  buildings: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onModify: PropTypes.func.isRequired,
};
