import techniciansData from '../mocks/technicians.json';
import { v4 as uuidv4 } from 'uuid';

let technicians = techniciansData;
export const getTechnicians = () => {
  return technicians;
};
export const getTechnician = (id) => {
  return technicians.find((tec) => tec.id === id);
};
export const addTechnician = (technician) => {
  technicians.unshift({ ...technician, id: uuidv4() });
};
export const deleteTechnician = (id) => {
  technicians = technicians.filter((tec) => tec.id !== id);
};
export const modifyTechnician = (technician) => {
  technicians = technicians.map((tec) =>
    tec.id === technician.id ? technician : tec
  );
};
