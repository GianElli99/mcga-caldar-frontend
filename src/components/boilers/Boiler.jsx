import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';
import styles from './Boiler.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDeleteAction,
  setUpdateAction,
} from '../../redux/actions/boilersActions';

export const Boiler = ({ boiler }) => {
  const { type, isInstalled, maintenanceTimeMinutes, buildingId } = boiler;
  const dispatch = useDispatch();

  const building = useSelector((state) =>
    state.buildings.list.find((x) => x.id === buildingId)
  );
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
        <span className={styles.title}>Building</span>
        <span className={styles.content}>{building ? building.name : ' '}</span>
      </div>
      <div className={styles.column}>
        <span className={styles.title}>Maintenance</span>
        <span className={styles.content}>
          {maintenanceTimeMinutes + ' Min'}
        </span>
      </div>
      <div className={styles.actions}>
        <EditIcon
          className={styles.editIcon}
          onClick={() => dispatch(setUpdateAction(boiler))}
        />
        <DeleteIcon
          className={styles.deleteIcon}
          onClick={() => dispatch(setDeleteAction(boiler))}
        />
      </div>
    </div>
  );
};

Boiler.propTypes = {
  boiler: PropTypes.object.isRequired,
};
