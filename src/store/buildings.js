import buildingsData from '../mocks/buildings.json';
import { v4 as uuidv4 } from 'uuid';

let buildings = buildingsData;
export const getBuildings = () => {
  return buildings;
};
export const getBuilding = (id) => {
  return buildings.find((build) => build.id === id);
};
export const addBuilding = (building) => {
  buildings.unshift({ ...building, id: uuidv4() });
};
export const deleteBuilding = (id) => {
  buildings = buildings.filter((build) => build.id !== id);
};
export const modifyBuilding = (building) => {
  buildings = buildings.map((build) =>
    build.id === building.id ? building : build
  );
};
