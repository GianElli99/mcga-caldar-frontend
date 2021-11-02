import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './Boiler.module.css';

export const Boiler = ({ boiler, onDelete, onModify }) => {
  const { id, type, isInstalled, maintenanceTimeMinutes, buildingId } = boiler;
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <span className={styles.title}>Type</span>
        <span className={styles.content}>{type}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Is Installed?</span>
        <span className={styles.content}>{isInstalled.toString()}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Maintenance</span>
        <span className={styles.content}>
          {maintenanceTimeMinutes + ' Min'}
        </span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Building</span>
        <span className={styles.content}>{buildingId}</span>
      </div>
      <div className={styles.actions}>
        <EditIcon className={styles.editIcon} onClick={() => onModify(id)} />
        <DeleteIcon
          className={styles.deleteIcon}
          onClick={() => onDelete(id)}
        />
      </div>
    </div>
  );
};

Boiler.propTypes = {
  boiler: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onModify: PropTypes.func.isRequired,
};
