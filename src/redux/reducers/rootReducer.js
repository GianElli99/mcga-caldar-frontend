import { combineReducers } from 'redux';
import { techniciansReducer } from './techniciansReducer';
import { buildingsReducer } from './buildingsReduce';

export const rootReducer = combineReducers({
  technicians: techniciansReducer,
  buildings: buildingsReducer,
});
