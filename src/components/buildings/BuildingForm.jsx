import React from 'react';
import styles from './BuildingForm.module.css';
import { useSelector } from 'react-redux';
import {
  updateBuildingAsync,
  createBuildingAsync,
  unsetAction,
} from '../../redux/actions/buildingsAction';
import { useDispatch } from 'react-redux';
import Button from '@mui/lab/LoadingButton';
import { GenericModal } from '../shared/GenericModal';
import { UPDATE } from '../../redux/types/modalTypes';
import { Form, Field } from 'react-final-form';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TextInput } from '../shared/TextInput';
import { ErrorContainer } from '../shared/ErrorContainer';

const initialState = {
  direction: '',
  city: '',
  name: '',
  postalCode: '',
  constructionCompanyId: '',
};

export const BuildingForm = () => {
  const { actionInProgress, selectedBuilding, isLoading, error } = useSelector(
    (state) => state.buildings
  );
  const dispatch = useDispatch();
  let action =
    actionInProgress.charAt(0) + actionInProgress.toLowerCase().slice(1);

  const handleCancel = () => {
    dispatch(unsetAction());
  };
  const handleFormSubmit = (building) => {
    if (actionInProgress === UPDATE) {
      building.id = selectedBuilding.id;
      dispatch(updateBuildingAsync(building));
    } else {
      dispatch(createBuildingAsync(building));
    }
  };
  const required = (value) => (value ? undefined : 'Required');

  return (
    <GenericModal>
      <>
        <h2>{action} Building</h2>
        {error && <ErrorContainer message={error} />}
        <Form
          onSubmit={handleFormSubmit}
          initialValues={selectedBuilding || initialState}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="direction" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Direction" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="city" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="City" />
                  )}
                </Field>
              </div>

              <div>
                <Field name="name" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Name" />
                  )}
                </Field>
              </div>
              <div>
                <Field name="postalCode" validate={required}>
                  {({ input, meta }) => (
                    <TextInput input={input} meta={meta} name="Postal Code" />
                  )}
                </Field>
              </div>
              <div className={styles.buildingsContainter}>
                <Field name="isParticular" type="checkbox">
                  {({ input }) => (
                    <FormControlLabel
                      control={<Checkbox {...input} />}
                      label="Is particular?"
                    />
                  )}
                </Field>
              </div>
              <div>
                <Field name="constructionCompanyId">
                  {({ input, meta }) => (
                    <TextInput
                      input={input}
                      meta={meta}
                      name="Construction Company ID"
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
