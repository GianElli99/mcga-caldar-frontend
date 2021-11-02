import { v4 as uuidv4 } from 'uuid';
import {
  CREATE_TECHNICIAN,
  UPDATE_TECHNICIAN,
  DELETE_TECHNICIAN,
} from '../types/techniciansTypes';

export const createTechnician = (technician) => {
  technician.id = uuidv4();
  return {
    type: CREATE_TECHNICIAN,
    payload: technician,
  };
};
export const updateTechnician = (technician) => {
  return {
    type: UPDATE_TECHNICIAN,
    payload: technician,
  };
};
export const deleteTechnician = (technicianId) => {
  return {
    type: DELETE_TECHNICIAN,
    payload: technicianId,
  };
};
