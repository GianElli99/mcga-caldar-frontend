import React, { useState } from 'react';
import { BoilerList } from './BoilerList';
import styles from './BoilerScreen.module.css';
import { getBoilers, deleteBoiler } from '../../store/boilers';
import { useHistory } from 'react-router';

export const BoilerScreen = () => {
  const history = useHistory();
  const [boilers, setBoilers] = useState(getBoilers());

  const handleAddClick = () => {
    history.push('boilers/create');
  };

  const handleDeleteBoiler = (id) => {
    deleteBoiler(id);
    setBoilers(getBoilers());
  };
  const handleModifyBoiler = (id) => {
    history.push(`/boilers/update/${id}`);
  };

  return (
    <div>
      <h2>Boilers</h2>
      <button className={styles.newButton} onClick={handleAddClick}>
        New Boiler
      </button>
      <BoilerList
        boilers={boilers}
        onDelete={handleDeleteBoiler}
        onModify={handleModifyBoiler}
      />
    </div>
  );
};
