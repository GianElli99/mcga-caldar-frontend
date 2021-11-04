import { combineReducers } from 'redux';
import { techniciansReducer } from './techniciansReducer';
import { boilersReducer } from './boilersReducer';
import { buildingsReducer } from './buildingsReduce';

export const rootReducer = combineReducers({
  technicians: techniciansReducer,
  boilers: boilersReducer,
  buildings: buildingsReducer,
});

// export const rootReducer = combineReducers({
//   technicians: techniciansReducer,
// });
