import { combineReducers } from 'redux';
import { techniciansReducer } from './techniciansReducer';

export const rootReducer = combineReducers({
  technicians: techniciansReducer,
});
