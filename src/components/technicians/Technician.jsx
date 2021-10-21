import React from 'react';
import PropTypes from 'prop-types';
import { FaTimes as DeleteIcon } from 'react-icons/fa';
import { MdEdit as EditIcon } from 'react-icons/md';

export const Technician = ({ technician, onDelete, onModify }) => {
  const { id, name, surname, phone, specializations } = technician;
  return (
    <div>
      <div>
        <span>Full name</span>
        <span>{name + ' ' + surname}</span>
      </div>
      <div>
        <span>Phone</span>
        <span>{phone}</span>
      </div>
      <div>
        <span>Specializations</span>
        <span>{specializations.toString()}</span>
      </div>
      <EditIcon
        style={{
          height: '2rem',
          width: '2rem',
          cursor: 'pointer',
        }}
        onClick={() => onModify(id)}
      />
      <DeleteIcon
        style={{
          height: '2rem',
          width: '2rem',
          cursor: 'pointer',
          color: '#FF0000',
        }}
        onClick={() => onDelete(id)}
      />
    </div>
  );
};

Technician.propTypes = {
  technician: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onModify: PropTypes.func.isRequired,
};
