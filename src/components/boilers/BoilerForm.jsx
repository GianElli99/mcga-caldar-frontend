import React, { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './BoilerForm.module.css';
import { useHistory, useParams } from 'react-router';
import { addBoiler, modifyBoiler, getBoiler } from '../../store/boilers';
import { getBuildings } from '../../store/buildings';

const initialState = {
  type: '',
  isIstalled: false,
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
      values.maintenanceTimeMinutes.length === 0
    ) {
      return;
    }
    if (values.isIstalled === true) {
      if (values.buildingId.length === 0) {
        return;
      }
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
      <div>
        <span>Type</span>
        <label htmlFor="typeA">
          A
          <input
            type="radio"
            name="type"
            id="typeA"
            value="A"
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="typeB">
          B
          <input
            type="radio"
            name="type"
            id="typeB"
            value="B"
            onChange={handleInputChange}
          />
        </label>
      </div>
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
      <label htmlFor="buildingId">Building</label>
      <select
        onChange={handleInputChange}
        value={values.buildingId}
        name="buildingId"
        id="buildingId"
      >
        <option value="" selected disabled hidden></option>

        {getBuildings().map((x) => {
          return (
            <option key={x.id} value={x.id}>
              {x.name}
            </option>
          );
        })}
      </select>
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
