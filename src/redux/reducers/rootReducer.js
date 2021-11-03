import { combineReducers } from 'redux';
import { techniciansReducer } from './techniciansReducer';
import { boilersReducer } from './boilersReducer';

export const rootReducer = combineReducers({
  technicians: techniciansReducer,
  boilers: boilersReducer,
});
