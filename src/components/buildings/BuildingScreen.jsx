import React from 'react';
import { BuildingList } from './BuildingList';
import styles from './BuildingScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CREATE, DELETE, UPDATE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { BuildingForm } from './BuildingForm';
import { setCreateAction } from '../../redux/actions/buildingsAction';

export const BuildingScreen = () => {
  const dispatch = useDispatch();
  const {
    list: buildings,
    isLoading,
    actionInProgress,
    selectedBuilding,
  } = useSelector((state) => state.buildings);

  const handleAddClick = () => {
    dispatch(setCreateAction());
  };

  return (
    <div>
      <h2>Buildings</h2>
      <button className={styles.newButton} onClick={handleAddClick}>
        New building
      </button>
      {(actionInProgress === UPDATE || actionInProgress === CREATE) && (
        <BuildingForm />
      )}
      {actionInProgress === DELETE && (
        <ConfirmDelete technician={selectedBuilding} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <BuildingList buildings={buildings} />
    </div>
  );
};
