import React from 'react';
import Modal from '@mui/material/Modal';
import styles from './GenericModal.module.css';
import PropTypes from 'prop-types';

export const GenericModal = ({ children }) => {
  return (
    <Modal open={true}>
      <div className={styles.wrapper}>{children}</div>
    </Modal>
  );
};

GenericModal.propTypes = {
  children: PropTypes.object,
};
