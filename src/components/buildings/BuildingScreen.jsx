import React from 'react';
import { BuildingList } from './BuildingList';
import styles from './BuildingScreen.module.css';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

export const BuildingScreen = () => {
  const history = useHistory();
  const buildings = useSelector((state) => state.buildings.list);

  const handleAddClick = () => {
    history.push('buildings/create');
  };

  const handleModifyBuilding = (id) => {
    history.push(`/buildings/update/${id}`);
  };

  return (
    <div>
      <h2>Buildings</h2>
      <button className={styles.newButton} onClick={handleAddClick}>
        New Building
      </button>
      <BuildingList buildings={buildings} onModify={handleModifyBuilding} />
    </div>
  );
};
