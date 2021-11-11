import React from 'react';
import { BoilerList } from './BoilerList';
import styles from './BoilerScreen.module.css';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';

export const BoilerScreen = () => {
  const history = useHistory();
  const {
    list: boilers,
    error,
    isLoading,
  } = useSelector((state) => state.boilers);

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
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      <p>{error}</p>
      <BoilerList boilers={boilers} onModify={handleModifyBoiler} />
    </div>
  );
};
