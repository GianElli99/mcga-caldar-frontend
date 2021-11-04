import React, { useEffect } from 'react';
import { TechnicianList } from './TechnicianList';
import styles from './TechnicianScreen.module.css';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { readTechnicians } from '../../redux/actions/techniciansActions';

export const TechnicianScreen = () => {
  const history = useHistory();
  const technicians = useSelector((state) => state.technicians.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      readTechnicians([
        {
          id: '614b72a5714d318447f1149b',
          name: 'Gian',
          surname: 'Elli',
          specializations: ['A', 'B'],
          phone: '347165814',
          dni: '4456999',
          address: 'Lisandro de la Torre 778',
        },
        {
          id: '614b72a5714d318447f1149c',
          name: 'Gian',
          surname: 'Elli',
          specializations: ['A', 'B'],
          phone: '347165814',
          dni: '4456999',
          address: 'Lisandro de la Torre 778',
        },
      ])
    );
    return () => {};
  }, []);

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
