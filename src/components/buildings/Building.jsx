import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './Building.module.css';
import { useDispatch } from 'react-redux';
import { deleteBuildingsAsync } from '../../redux/actions/buildingsAction';

export const Building = ({ building, onModify }) => {
  const { id, direction, city, postalCode } = building;
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <span className={styles.title}>Direction</span>
        <span className={styles.content}>{direction}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>City</span>
        <span className={styles.content}>{city}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Postal Code</span>
        <span className={styles.content}>{postalCode.toString()}</span>
      </div>
      <div className={styles.actions}>
        <EditIcon className={styles.editIcon} onClick={() => onModify(id)} />
        <DeleteIcon
          className={styles.deleteIcon}
          onClick={() => dispatch(deleteBuildingsAsync(id))}
        />
      </div>
    </div>
  );
};

Building.propTypes = {
  building: PropTypes.object.isRequired,
  onModify: PropTypes.func.isRequired,
};
