import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './BoilerForm.module.css';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import {
  updateBoilerAsync,
  createBoilerAsync,
} from '../../redux/actions/boilersActions';
import { useDispatch } from 'react-redux';
import Button from '@mui/lab/LoadingButton';

const initialState = {
  type: '',
  maintenanceTimeMinutes: '',
  buildingId: '',
};
const isLoading = useSelector((state) => state.boilers.isLoading);

export const BoilerForm = () => {
  const [values, handleInputChange, , setAllValues] = useForm(initialState);
  const [isInstalled, setIsInstalled] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { action, boilerId } = useParams();
  const boilerToModify = useSelector((state) =>
    state.boilers.list.find((boil) => boil.id === boilerId)
  );

  const buildings = useSelector((state) => state.buildings.list);
  useEffect(() => {
    if (action !== 'update' && action !== 'create') {
      history.replace('/boilers');
      return;
    }

    if (action === 'update') {
      if (boilerToModify) {
        setAllValues(boilerToModify);
        setIsInstalled(boilerToModify.isInstalled);
      } else {
        history.replace('/boilers');
      }
    }
    return () => {};
  }, []);

  const handleCancel = () => {
    history.push('/boilers');
  };

  const handleSubmit = async (e) => {
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
      await dispatch(
        updateBoilerAsync({ ...values, isInstalled, id: boilerId })
      );
    } else {
      await dispatch(createBoilerAsync({ ...values, isInstalled }));
    }

    history.push('/boilers');
  };

  const handleIsInstalledToggle = (isInstalled) => {
    if (isInstalled === false) {
      setAllValues({ ...values, buildingId: '' });
    }
    setIsInstalled(isInstalled);
  };

  return (
    <form action="">
      <span>Boiler type</span>
      <div className={styles.typesBoilers}>
        <label htmlFor="typeA">
          A
          <input
            type="radio"
            name="type"
            id="typeA"
            value="A"
            checked={values.type === 'A'}
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
        <label htmlFor="typeC">
          C
          <input
            type="radio"
            name="type"
            id="typeC"
            value="C"
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="typeD">
          D
          <input
            type="radio"
            name="type"
            id="typeD"
            value="D"
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className={styles.containerInstalled}>
        <span>Is installed?</span>
        <input
          type="checkbox"
          name="isInstalled"
          id="isInstalled"
          checked={isInstalled}
          onChange={(e) => {
            handleIsInstalledToggle(e.currentTarget.checked);
          }}
        />
      </div>
      <div className={styles.containerBuilding}>
        <label htmlFor="buildingId">Building</label>
        <select
          onChange={handleInputChange}
          value={values.buildingId}
          disabled={!isInstalled}
          name="buildingId"
          id="buildingId"
        >
          <option value="" disabled hidden></option>

          {buildings.map((x) => {
            return (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            );
          })}
        </select>
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
      <div className={styles.actionsContainer}>
        <Button
          color="primary"
          variant="contained"
          disableRipple
          type="submit"
          loading={isLoading}
          onClick={handleSubmit}
        >
          {action.toUpperCase()}
        </Button>
        <Button variant="outlined" type="button" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
