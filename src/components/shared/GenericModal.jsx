import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import styles from './GenericModal.module.css';

export const GenericModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal open={isOpen} onClose={() => setIsOpen(!isOpen)}>
      <div className={styles.wrapper}>
        <h1>This is a modal</h1>
      </div>
    </Modal>
  );
};
