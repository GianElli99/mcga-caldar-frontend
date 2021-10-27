import React, { useState } from 'react';
import { BuildingList } from './BuildingList';
import styles from './BuildingScreen.module.css';
import { getBuildings, deleteBuilding } from '../../store/buildings';
import { useHistory } from 'react-router';

export const BuildingScreen = () => {
  const history = useHistory();
  const [buildings, setBuildings] = useState(getBuildings());

  const handleAddClick = () => {
    history.push('buildings/create');
  };

  const handleDeleteBuilding = (id) => {
    deleteBuilding(id);
    setBuildings(getBuildings());
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
      <BuildingList
        buildings={buildings}
        onDelete={handleDeleteBuilding}
        onModify={handleModifyBuilding}
      />
    </div>
  );
};
