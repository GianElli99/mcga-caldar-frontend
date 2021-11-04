import {
  CREATE_BOILER,
  UPDATE_BOILER,
  DELETE_BOILER,
} from '../types/boilersTypes';

const initialState = {
  list: [
    {
      id: '614b72a5714d318447f4563b',
      type: 'A',
      isInstalled: true,
      maintenanceTimeMinutes: '180',
      buildingId: '23432423556578',
    },
    {
      id: '614b72a5714d318447f5556a',
      type: 'A',
      isInstalled: true,
      maintenanceTimeMinutes: '180',
      buildingId: '23432423556564',
    },
    {
      id: '614b72a5714d318447f4111c',
      type: 'A',
      isInstalled: false,
      maintenanceTimeMinutes: '180',
      buildingId: '',
    },
  ],
};

export const boilersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOILER:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case UPDATE_BOILER:
      return {
        ...state,
        list: state.list.map((boil) =>
          boil.id === action.payload.id ? action.payload : boil
        ),
      };
    case DELETE_BOILER:
      return {
        ...state,
        list: state.list.filter((boil) => boil.id !== action.payload),
      };

    default:
      return state;
  }
};
