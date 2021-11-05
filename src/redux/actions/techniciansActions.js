import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {
  CREATE_TECHNICIAN,
  UPDATE_TECHNICIAN,
  DELETE_TECHNICIAN,
  SET_ALL_TECHNICIANS,
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
export const setAllTechnicians = (technicians) => {
  return {
    type: SET_ALL_TECHNICIANS,
    payload: technicians,
  };
};
export const readTechnicians = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost/tecnicos');
    console.log(res);
    if (res.status < 400) {
      dispatch(setAllTechnicians([]));
      return Promise.resolve(res.data);
    }
    return Promise.reject(res.data);
  } catch (error) {
    return Promise.reject();
  }
};
