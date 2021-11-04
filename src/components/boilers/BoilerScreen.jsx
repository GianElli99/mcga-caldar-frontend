import React from 'react';
import { BoilerList } from './BoilerList';
import styles from './BoilerScreen.module.css';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

export const BoilerScreen = () => {
  const history = useHistory();
  const boilers = useSelector((state) => state.boilers.list);

  const handleAddClick = () => {
    history.push('boilers/create');
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
      <BoilerList boilers={boilers} onModify={handleModifyBoiler} />
    </div>
  );
};
