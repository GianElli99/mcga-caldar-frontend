import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './TechnicianForm.module.css';
import { useSelector } from 'react-redux';
import {
  updateTechnicianAsync,
  createTechnicianAsync,
  unsetAction,
} from '../../redux/actions/techniciansActions';
import { useDispatch } from 'react-redux';
import Button from '@mui/lab/LoadingButton';
import { GenericModal } from '../shared/GenericModal';
import { UPDATE } from '../../redux/types/modalTypes';

const initialState = {
  name: '',
  surname: '',
  phone: '',
  dni: '',
  address: '',
};

export const TechnicianForm = () => {
  const [values, handleInputChange, , setAllValues] = useForm(initialState);
  const [specializations, setSpecializations] = useState([]);
  const dispatch = useDispatch();
  const { actionInProgress, selectedTechnician, isLoading } = useSelector(
    (state) => state.technicians
  );

  useEffect(() => {
    if (actionInProgress === UPDATE && selectedTechnician) {
      setAllValues(selectedTechnician);
      setSpecializations(selectedTechnician.specializations);
    }
    return () => {};
  }, []);

  const handleSpecializationChange = ({ target }) => {
    if (target.checked && specializations.indexOf(target.value) === -1) {
      setSpecializations([...specializations, target.value]);
      return;
    }
    if (!target.checked) {
      setSpecializations(specializations.filter((x) => x !== target.value));
    }
  };
  const handleCancel = () => {
    dispatch(unsetAction());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      values.name.length === 0 ||
      values.surname.length === 0 ||
      values.phone.length === 0 ||
      values.dni.length === 0 ||
      values.address.length === 0
    ) {
      return;
    }
    if (actionInProgress === UPDATE) {
      await dispatch(
        updateTechnicianAsync({
          ...values,
          specializations,
          id: selectedTechnician.id,
        })
      );
    } else {
      await dispatch(createTechnicianAsync({ ...values, specializations }));
    }
  };
  return (
    <GenericModal>
      <form action="">
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
          name="surname"
          id="surname"
          placeholder="Surname"
          value={values.surname}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="Phone number"
          value={values.phone}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <input
          type="text"
          name="dni"
          id="dni"
          placeholder="DNI"
          value={values.dni}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Address"
          value={values.address}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <span>Specializations</span>
        <div className={styles.specializationsContainter}>
          <label htmlFor="a">
            A
            <input
              type="checkbox"
              name="a"
              id="a"
              value="A"
              checked={!!specializations.find((x) => x === 'A')}
              onChange={handleSpecializationChange}
            />
          </label>
          <label>
            B
            <input
              type="checkbox"
              name="b"
              id="b"
              value="B"
              checked={!!specializations.find((x) => x === 'B')}
              onChange={handleSpecializationChange}
            />
          </label>
          <label>
            C
            <input
              type="checkbox"
              name="c"
              id="c"
              value="C"
              checked={!!specializations.find((x) => x === 'C')}
              onChange={handleSpecializationChange}
            />
          </label>
          <label>
            D
            <input
              type="checkbox"
              name="d"
              id="d"
              value="D"
              checked={!!specializations.find((x) => x === 'D')}
              onChange={handleSpecializationChange}
            />
          </label>
        </div>
        <div className={styles.actionsContainer}>
          <Button
            color="primary"
            variant="contained"
            disableRipple
            type="submit"
            loading={isLoading}
            onClick={handleSubmit}
          >
            {actionInProgress}
          </Button>
          <Button variant="outlined" type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </GenericModal>
  );
};
