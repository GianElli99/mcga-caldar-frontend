import { v4 as uuidv4 } from 'uuid';
import {
  CREATE_BOILER,
  UPDATE_BOILER,
  DELETE_BOILER,
} from '../types/boilersTypes';

export const createBoiler = (boiler) => {
  boiler.id = uuidv4();
  return {
    type: CREATE_BOILER,
    payload: boiler,
  };
};
export const updateBoiler = (boiler) => {
  return {
    type: UPDATE_BOILER,
    payload: boiler,
  };
};
export const deleteBoiler = (boilerId) => {
  return {
    type: DELETE_BOILER,
    payload: boilerId,
  };
};
