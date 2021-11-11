import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './BuildingForm.module.css';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import {
  updateBuildingAsync,
  createBuildingAsync,
} from '../../redux/actions/buildingsAction';
import { useDispatch } from 'react-redux';
import Button from '@mui/lab/LoadingButton';

const initialState = {
  direction: '',
  city: '',
  name: '',
  postalCode: '',
  constructionCompanyId: '',
};

export const BuildingForm = () => {
  const [values, handleInputChange, , setAllValues] = useForm(initialState);
  const [isParticular, setParticular] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { action, buildingId } = useParams();
  const buildingToModify = useSelector((state) =>
    state.buildings.list.find((build) => build.id === buildingId)
  );
  const isLoading = useSelector((state) => state.buildings.isLoading);

  useEffect(() => {
    if (action !== 'update' && action !== 'create') {
      history.replace('/buildings');
      return;
    }

    if (action === 'update') {
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

  const handleSubmit = async (e) => {
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
      await dispatch(
        updateBuildingAsync({
          ...values,
          isParticular,
          id: buildingId,
        })
      );
    } else {
      await dispatch(createBuildingAsync({ ...values, isParticular }));
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
        disabled={isParticular}
        value={values.constructionCompanyId}
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
