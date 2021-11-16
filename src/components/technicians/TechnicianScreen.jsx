import React from 'react';
import { TechnicianList } from './TechnicianList';
import styles from './TechnicianScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CREATE, DELETE, UPDATE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { TechnicianForm } from './TechnicianForm';
import { setCreateAction } from '../../redux/actions/techniciansActions';

export const TechnicianScreen = () => {
  const dispatch = useDispatch();
  const {
    list: technicians,
    isLoading,
    actionInProgress,
    selectedTechnician,
  } = useSelector((state) => state.technicians);

  const handleAddClick = () => {
    dispatch(setCreateAction());
  };

  return (
    <div>
      <h2>Technicians</h2>
      <button className={styles.newButton} onClick={handleAddClick}>
        New Technician
      </button>
      {(actionInProgress === UPDATE || actionInProgress === CREATE) && (
        <TechnicianForm />
      )}
      {actionInProgress === DELETE && (
        <ConfirmDelete technician={selectedTechnician} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <TechnicianList technicians={technicians} />
    </div>
  );
};
