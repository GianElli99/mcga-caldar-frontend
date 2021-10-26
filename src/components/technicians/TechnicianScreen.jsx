import React, { useState } from 'react';
import { TechnicianList } from './TechnicianList';
import styles from './TechnicianScreen.module.css';
import { getTechnicians, deleteTechnician } from '../../store/technicians';
import { useHistory } from 'react-router';

export const TechnicianScreen = () => {
  const history = useHistory();
  const [technicians, setTechnicians] = useState(getTechnicians());

  const handleAddClick = () => {
    history.push('technicians/create');
  };

  const handleDeleteTechnician = (id) => {
    deleteTechnician(id);
    setTechnicians(getTechnicians());
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
        onDelete={handleDeleteTechnician}
        onModify={handleModifyTechnician}
      />
    </div>
  );
};
