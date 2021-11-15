import React from 'react';
import { GenericModal } from '../shared/GenericModal';
import PropTypes from 'prop-types';

export const ConfirmDelete = ({ technician }) => {
  return (
    <GenericModal>
      <div>
        <h2>You are about to delete a Technician</h2>
        <p>{`This will delete ${technician.name} ${technician.surname} permanently`}</p>
        <p>Are you sure?</p>

        <button>Cancel</button>
        <button>Delete</button>
      </div>
    </GenericModal>
  );
};

ConfirmDelete.propTypes = {
  technician: PropTypes.object.isRequired,
};
