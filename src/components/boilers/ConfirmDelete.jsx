import React from 'react';
import { GenericModal } from '../shared/GenericModal';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  deleteBoilerAsync,
  unsetAction,
} from '../../redux/actions/boilersActions';

export const ConfirmDelete = ({ boiler }) => {
  const dispatch = useDispatch();

  return (
    <GenericModal>
      <>
        <h2>You are about to delete a Boiler</h2>
        <p>{`This will delete Boiler type: ${boiler.type} permanently`}</p>
        <p>Are you sure?</p>

        <button onClick={() => dispatch(unsetAction())}>Cancel</button>
        <button onClick={() => dispatch(deleteBoilerAsync(boiler.id))}>
          Delete
        </button>
      </>
    </GenericModal>
  );
};

ConfirmDelete.propTypes = {
  boiler: PropTypes.object.isRequired,
};
