import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './Technician.module.css';
import { useDispatch } from 'react-redux';
import {
  setDeleteAction,
  setUpdateAction,
} from '../../redux/actions/techniciansActions';

export const Technician = ({ technician }) => {
  const { name, surname, phone, specializations } = technician;

  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <span className={styles.title}>Full name</span>
        <span className={styles.content}>{name + ' ' + surname}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Phone</span>
        <span className={styles.content}>{phone}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Specializations</span>
        <span className={styles.content}>{specializations.toString()}</span>
      </div>
      <div className={styles.actions}>
        <EditIcon
          className={styles.editIcon}
          onClick={() => dispatch(setUpdateAction(technician))}
        />
        <DeleteIcon
          className={styles.deleteIcon}
          onClick={() => dispatch(setDeleteAction(technician))}
        />
      </div>
    </div>
  );
};

Technician.propTypes = {
  technician: PropTypes.object.isRequired,
};
