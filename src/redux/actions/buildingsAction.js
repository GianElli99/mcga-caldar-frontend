import { v4 as uuidv4 } from 'uuid';
import {
  CREATE_BUILDINGS,
  UPDATE_BUILDINGS,
  DELETE_BUILDINGS,
} from '../types/buildingsTypes';

export const createBuilding = (building) => {
  building.id = uuidv4();
  return {
    type: CREATE_BUILDINGS,
    payload: building,
  };
};
export const updateBuilding = (building) => {
  return {
    type: UPDATE_BUILDINGS,
    payload: building,
  };
};
export const deleteBuilding = (buildingId) => {
  return {
    type: DELETE_BUILDINGS,
    payload: buildingId,
  };
};
