import React from 'react';
import { TechnicianList } from './TechnicianList';
import styles from './TechnicianScreen.module.css';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { DELETE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';

export const TechnicianScreen = () => {
  const history = useHistory();
  const {
    list: technicians,
    error,
    isLoading,
    actionInProgress,
    selectedTechnician,
  } = useSelector((state) => state.technicians);

  const handleAddClick = () => {
    history.push('technicians/create');
  };

  const handleModifyTechnician = (id) => {
    history.push(`/technicians/update/${id}`);
  };

  return (
    <div>
      <h2>Technicians</h2>
      <button className={styles.newButton} onClick={handleAddClick}>
        New Technician
      </button>
      {actionInProgress === DELETE && (
        <ConfirmDelete technician={selectedTechnician} />
      )}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <p>{error}</p>
      <TechnicianList
        technicians={technicians}
        onModify={handleModifyTechnician}
      />
    </div>
  );
};
