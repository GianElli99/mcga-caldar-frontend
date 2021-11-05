import React from 'react';
import { TechnicianList } from './TechnicianList';
import styles from './TechnicianScreen.module.css';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

export const TechnicianScreen = () => {
  const history = useHistory();
  const technicians = useSelector((state) => state.technicians.list);

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
      <TechnicianList
        technicians={technicians}
        onModify={handleModifyTechnician}
      />
    </div>
  );
};
