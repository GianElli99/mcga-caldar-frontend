import React from 'react';
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
import { Form, Field } from 'react-final-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TextInput } from '../shared/TextInput';

const initialState = {
  name: '',
  surname: '',
  phone: '',
  dni: '',
  address: '',
  specializations: [],
};

export const TechnicianForm = () => {
  const { actionInProgress, selectedTechnician, isLoading } = useSelector(
    (state) => state.technicians
  );
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(unsetAction());
  };
  const handleFormSubmit = (technician) => {
    if (!technician.specializations) {
      technician.specializations = [];
    }
    if (actionInProgress === UPDATE) {
      technician.id = selectedTechnician.id;
      dispatch(updateTechnicianAsync(technician));
    } else {
      dispatch(createTechnicianAsync(technician));
    }
  };
  const required = (value) => (value ? undefined : 'Required');
  return (
    <GenericModal>
      <>
        <h2>Create Technician</h2>
        <Form
          onSubmit={handleFormSubmit}
          initialValues={selectedTechnician || initialState}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="name" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Name" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="surname" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Surname" />
                  )}
                </Field>
              </div>

              <div>
                <Field name="phone" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Phone" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="dni" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="DNI" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="address" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Address" />
                  )}
                </Field>
              </div>
              <span>Specializations</span>
              <div className={styles.specializationsContainter}>
                <Field name="specializations" value="A" type="checkbox">
                  {({ input }) => (
                    <FormControlLabel
                      control={<Checkbox {...input} />}
                      label="A"
                    />
                  )}
                </Field>
                <Field name="specializations" value="B" type="checkbox">
                  {({ input }) => (
                    <FormControlLabel
                      control={<Checkbox {...input} />}
                      label="B"
                    />
                  )}
                </Field>
                <Field name="specializations" value="C" type="checkbox">
                  {({ input }) => (
                    <FormControlLabel
                      control={<Checkbox {...input} />}
                      label="C"
                    />
                  )}
                </Field>
                <Field name="specializations" value="D" type="checkbox">
                  {({ input }) => (
                    <FormControlLabel
                      control={<Checkbox {...input} />}
                      label="D"
                    />
                  )}
                </Field>
              </div>
              <div className={styles.actionsContainer}>
                <Button
                  disabled={submitting}
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
          )}
        </Form>
      </>
    </GenericModal>
  );
};
