import React, { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './BoilerForm.module.css';
import { useHistory, useParams } from 'react-router';
import { addBoiler, modifyBoiler, getBoiler } from '../../store/boilers';

const initialState = {
  type: '',
  isIstalled: '',
  maintenanceTimeMinutes: '',
  buildingId: '',
};

export const BoilerForm = () => {
  const [values, handleInputChange, , setAllValues] = useForm(initialState);
  const history = useHistory();
  const { action, boilerId } = useParams();

  useEffect(() => {
    if (action !== 'update' && action !== 'create') {
      history.replace('/boilers');
      return;
    }

    if (action === 'update') {
      const boilerToModify = getBoiler(boilerId);
      if (boilerToModify) {
        setAllValues(boilerToModify);
      } else {
        history.replace('/boilers');
      }
    }
    return () => {};
  }, []);

  const handleCancel = () => {
    history.push('/boilers');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      values.type.length === 0 ||
      values.isIstalled.length === 0 ||
      values.maintenanceTimeMinutes.length === 0 ||
      values.buildingId.length === 0
    ) {
      return;
    }
    if (action === 'update') {
      modifyBoiler({ ...values, id: boilerId });
    } else {
      addBoiler({ ...values });
    }
    history.push('/boilers');
  };
  return (
    <form action="">
      <input
        type="text"
        name="type"
        id="type"
        placeholder="Boiler type"
        value={values.type}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <div>
        <span>Is installed?</span>
        <input
          type="checkbox"
          name="isInstalled"
          id="isInstalled"
          onChange={handleInputChange}
        />
      </div>
      <input
        type="text"
        name="maintenanceTimeMinutes"
        id="maintenanceTimeMinutes"
        placeholder="Maintenance mime minutes"
        value={values.maintenanceTimeMinutes}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <input
        type="text"
        name="buildingId"
        id="buildingId"
        placeholder="buildingId"
        value={values.buildingId}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <div className={styles.actionsContainer}>
        <button
          className={styles.btnAccept}
          type="submit"
          onClick={handleSubmit}
        >
          {action.toUpperCase()}
        </button>
        <button
          className={styles.btnCancel}
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
