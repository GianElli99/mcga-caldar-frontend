import React from 'react';
import styles from './BoilerForm.module.css';
import { useSelector } from 'react-redux';
import {
  updateBoilerAsync,
  createBoilerAsync,
  unsetAction,
} from '../../redux/actions/boilersActions';
import { useDispatch } from 'react-redux';
import Button from '@mui/lab/LoadingButton';
import { GenericModal } from '../shared/GenericModal';
import { UPDATE } from '../../redux/types/modalTypes';
import { Form, Field } from 'react-final-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Checkbox';
import Checkbox from '@mui/material/Checkbox';
import { TextInput } from '../shared/TextInput';
import { ErrorContainer } from '../shared/ErrorContainer';

const initialState = {
  type: '',
  maintenanceTimeMinutes: '',
  buildingId: '',
};

export const BoilerForm = () => {
  const { actionInProgress, selectedBoiler, isLoading, error } = useSelector(
    (state) => state.boilers
  );
  const dispatch = useDispatch();
  let action =
    actionInProgress.charAt(0) + actionInProgress.toLowerCase().slice(1);

  const handleCancel = () => {
    dispatch(unsetAction());
  };
  const handleFormSubmit = (boiler) => {
    if (actionInProgress === UPDATE) {
      boiler.id = selectedBoiler.id;
      dispatch(updateBoilerAsync(boiler));
    } else {
      dispatch(createBoilerAsync(boiler));
    }
  };

  const required = (value) => (value ? undefined : 'Required');
  return (
    <GenericModal>
      <>
        <h2>{action} Boiler</h2>
        {error && <ErrorContainer message={error} />}
        <Form
          onSubmit={handleFormSubmit}
          initialValues={selectedBoiler || initialState}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <p>Boilers type</p>
              <div className={styles.specializationsContainter}>
                <Field name="type" value="A" type="radio">
                  {({ input }) => (
                    <FormControlLabel
                      control={<Radio {...input} />}
                      label="A"
                    />
                  )}
                </Field>
                <Field name="type" value="B" type="radio">
                  {({ input }) => (
                    <FormControlLabel
                      control={<Radio {...input} />}
                      label="B"
                    />
                  )}
                </Field>
                <Field name="type" value="C" type="radio">
                  {({ input }) => (
                    <FormControlLabel
                      control={<Radio {...input} />}
                      label="C"
                    />
                  )}
                </Field>
                <Field name="type" value="D" type="radio">
                  {({ input }) => (
                    <FormControlLabel
                      control={<Radio {...input} />}
                      label="D"
                    />
                  )}
                </Field>
              </div>
              <p>Is installed?</p>
              <div className={styles.specializationsContainter}>
                <Field name="isInstalled" value="" type="checkbox">
                  {({ input }) => (
                    <FormControlLabel control={<Checkbox {...input} />} />
                  )}
                </Field>
              </div>
              <div>
                <Field name="maintenanceTimeMinutes" validate={required}>
                  {({ input, meta }) => (
                    <TextInput
                      input={input}
                      meta={meta}
                      name="maintenanceTimeMinutes"
                    />
                  )}
                </Field>
              </div>
              <p>BuildingId</p>
              <div>
                <Field name="buildingId" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="buildingId" />
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
