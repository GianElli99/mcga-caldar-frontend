import React, { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './TechnicianForm.module.css';
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import {
  updateTechnicianAsync,
  createTechnicianAsync,
} from '../../redux/actions/techniciansActions';
import { useDispatch } from 'react-redux';

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
  const history = useHistory();
  const dispatch = useDispatch();
  const { action, technicianId } = useParams();
  const technicianToModify = useSelector((state) =>
    state.technicians.list.find((tec) => tec.id === technicianId)
  );

  useEffect(() => {
    if (action !== 'update' && action !== 'create') {
      history.replace('/technicians');
      return;
    }

    if (action === 'update') {
      if (technicianToModify) {
        setAllValues(technicianToModify);
        setSpecializations(technicianToModify.specializations);
      } else {
        history.replace('/technicians');
      }
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
    history.push('/technicians');
  };

  const handleSubmit = (e) => {
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
    if (action === 'update') {
      dispatch(
        updateTechnicianAsync({ ...values, specializations, id: technicianId })
      );
    } else {
      dispatch(createTechnicianAsync({ ...values, specializations }));
    }
    history.push('/technicians');
  };
  return (
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
