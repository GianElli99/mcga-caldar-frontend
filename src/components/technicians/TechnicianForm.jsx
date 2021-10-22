import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from '../../hooks/useForm';

const initialState = {
  name: '',
  surname: '',
  phone: '',
  dni: '',
  address: '',
};

export const TechnicianForm = ({
  onSubmit,
  onCancel,
  mode,
  technicianToModify,
}) => {
  const [values, handleInputChange, resetValues, setAllValues] =
    useForm(initialState);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    if (mode === 'update' && technicianToModify) {
      setAllValues(technicianToModify);
      setSpecializations(technicianToModify.specializations);
    }
    return () => {};
  }, [technicianToModify]);

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
    onCancel();
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
    onSubmit({ ...values, specializations });
    resetValues();
    setSpecializations([]);
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
      />
      <input
        type="text"
        name="surname"
        id="surname"
        placeholder="Surname"
        value={values.surname}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="phone"
        id="phone"
        placeholder="Phone number"
        value={values.phone}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="dni"
        id="dni"
        placeholder="DNI"
        value={values.dni}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="address"
        id="address"
        placeholder="Address"
        value={values.address}
        onChange={handleInputChange}
      />
      <label htmlFor="a">
        <input
          type="checkbox"
          name="a"
          id="a"
          value="A"
          checked={!!specializations.find((x) => x === 'A')}
          onChange={handleSpecializationChange}
        />
        A
      </label>
      <label>
        <input
          type="checkbox"
          name="b"
          id="b"
          value="B"
          checked={!!specializations.find((x) => x === 'B')}
          onChange={handleSpecializationChange}
        />
        B
      </label>
      <label>
        <input
          type="checkbox"
          name="c"
          id="c"
          value="C"
          checked={!!specializations.find((x) => x === 'C')}
          onChange={handleSpecializationChange}
        />
        C
      </label>
      <label>
        <input
          type="checkbox"
          name="d"
          id="d"
          value="D"
          checked={!!specializations.find((x) => x === 'D')}
          onChange={handleSpecializationChange}
        />
        D
      </label>

      <button type="submit" onClick={handleSubmit}>
        {mode} Technician
      </button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

TechnicianForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  technicianToModify: PropTypes.object,
};
