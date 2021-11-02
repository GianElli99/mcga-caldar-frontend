import boilersData from '../mocks/boilers.json';
import { v4 as uuidv4 } from 'uuid';

let boilers = boilersData;
export const getBoilers = () => {
  return boilers;
};
export const getBoiler = (id) => {
  return boilers.find((boil) => boil.id === id);
};
export const addBoiler = (boiler) => {
  boilers.unshift({ ...boiler, id: uuidv4() });
};
export const deleteBoiler = (id) => {
  boilers = boilers.filter((boil) => boil.id !== id);
};
export const modifyBoiler = (boiler) => {
  boilers = boilers.map((boil) => (boil.id === boiler.id ? boiler : boil));
};
