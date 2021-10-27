import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './BuildingForm.module.css';
import { useHistory, useParams } from 'react-router';
import {
  addBuilding,
  modifyBuilding,
  getBuilding,
} from '../../store/buildings';

const initialState = {
  direction: '',
  city: '',
  name: '',
  postalCode: '',
  isParticular: false,
  constructionCompanyId: '',
};

export const BuildingForm = () => {
  const [values, handleInputChange, , setAllValues] = useForm(initialState);
  const [isParticular, setParticular] = useState(false);
  const history = useHistory();
  const { action, buildingId } = useParams();

  useEffect(() => {
    if (action !== 'update' && action !== 'create') {
      history.replace('/buildings');
      return;
    }

    if (action === 'update') {
      const buildingToModify = getBuilding(buildingId);
      if (buildingToModify) {
        setAllValues(buildingToModify);
        setParticular(buildingToModify.isParticular);
      } else {
        history.replace('/buildings');
      }
    }
    return () => {};
  }, []);

  const handleCancel = () => {
    history.push('/buildings');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      values.direction.length === 0 ||
      values.city.length === 0 ||
      values.name.length === 0 ||
      values.postalCode.length === 0
    ) {
      return;
    }
    if (
      values.isParticular === true &&
      values.constructionCompanyId.length === 0
    ) {
      return;
    }

    if (action === 'update') {
      modifyBuilding({ ...values, isParticular, id: buildingId });
    } else {
      addBuilding({ ...values, isParticular });
    }
    history.push('/buildings');
  };

  return (
    <form action="">
      <input
        type="text"
        name="direction"
        id="direction"
        placeholder="Direction"
        value={values.direction}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <input
        type="text"
        name="city"
        id="city"
        placeholder="City"
        value={values.city}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        value={values.name}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <input
        type="text"
        name="postalCode"
        id="postalCode"
        placeholder="Postal Code"
        value={values.postalCode}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <div className={styles.specializationsContainter}>
        <label>
          Is Particular?
          <input
            type="checkbox"
            name="isParticular"
            id="isParticular"
            value="isParticular"
            checked={isParticular}
            onChange={(e) => {
              setParticular(e.currentTarget.checked);
            }}
          />
        </label>
      </div>
      <input
        type="text"
        name="constructionCompanyId"
        id="constructionCompanyId"
        placeholder="Construction Company ID"
        disabled={!isParticular}
        value={values.constructionCompanyId}
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
