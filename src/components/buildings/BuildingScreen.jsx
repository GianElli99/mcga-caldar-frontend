import React from 'react';
import { BuildingList } from './BuildingList';
import styles from './BuildingScreen.module.css';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';

export const BuildingScreen = () => {
  const history = useHistory();
  const { list: buildings, error } = useSelector((state) => state.buildings);
  const isLoading = useSelector((state) => state.buildings.isLoading);

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
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <p>{error}</p>
      <BuildingList buildings={buildings} onModify={handleModifyBuilding} />
    </div>
  );
};
