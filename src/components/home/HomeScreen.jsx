import React from 'react';
import { useSelector } from 'react-redux';
import { NONE } from '../../redux/types/modalTypes';
import { GenericModal } from '../shared/GenericModal';

export const HomeScreen = () => {
  const { actionInProgress } = useSelector((state) => state.technicians);
  return <div>{actionInProgress === NONE && <GenericModal />}</div>;
};
