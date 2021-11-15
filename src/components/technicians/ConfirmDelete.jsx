import React from 'react';
import { GenericModal } from '../shared/GenericModal';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  deleteTechniciansAsync,
  unsetAction,
} from '../../redux/actions/techniciansActions';

export const ConfirmDelete = ({ technician }) => {
  const dispatch = useDispatch();

  return (
    <GenericModal>
      <>
        <h2>You are about to delete a Technician</h2>
        <p>{`This will delete ${technician.name} ${technician.surname} permanently`}</p>
        <p>Are you sure?</p>

        <button onClick={() => dispatch(unsetAction())}>Cancel</button>
        <button onClick={() => dispatch(deleteTechniciansAsync(technician.id))}>
          Delete
        </button>
      </>
    </GenericModal>
  );
};

ConfirmDelete.propTypes = {
  technician: PropTypes.object.isRequired,
};
