import React from 'react';
import { BoilerList } from './BoilerList';
import styles from './BoilerScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { CREATE, DELETE, UPDATE } from '../../redux/types/modalTypes';
import { ConfirmDelete } from './ConfirmDelete';
import { BoilerForm } from './BoilerForm';
import { setCreateAction } from '../../redux/actions/boilersActions';

export const BoilerScreen = () => {
  const dispatch = useDispatch();
  const {
    list: boilers,
    error,
    isLoading,
    actionInProgress,
    selectedBoiler,
  } = useSelector((state) => state.boilers);

  const handleAddClick = () => {
    dispatch(setCreateAction());
  };

  return (
    <div>
      <h2>Boilers</h2>
      <button className={styles.newButton} onClick={handleAddClick}>
        New Boiler
      </button>
      {(actionInProgress === UPDATE || actionInProgress === CREATE) && (
        <BoilerForm />
      )}
      {actionInProgress === DELETE && <ConfirmDelete boiler={selectedBoiler} />}
      {isLoading && (
        <div className={styles.loadingBar}>
          <LinearProgress />
        </div>
      )}
      {error && <p>{error}</p>}
      <BoilerList technicians={boilers} />
    </div>
  );
};
