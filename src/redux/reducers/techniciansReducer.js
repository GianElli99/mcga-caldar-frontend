import {
  CREATE_TECHNICIAN,
  UPDATE_TECHNICIAN,
  DELETE_TECHNICIAN,
} from '../types/techniciansTypes';

const initialState = {
  list: [
    {
      id: '614b72a5714d318447f1149b',
      name: 'Gian',
      surname: 'Elli',
      specializations: ['A', 'B'],
      phone: '347165814',
      dni: '4456999',
      address: 'Lisandro de la Torre 778',
    },
    {
      id: '614b72a5714d318447f1149c',
      name: 'Gian',
      surname: 'Elli',
      specializations: ['A', 'B'],
      phone: '347165814',
      dni: '4456999',
      address: 'Lisandro de la Torre 778',
    },
  ],
};

export const techniciansReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TECHNICIAN:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case UPDATE_TECHNICIAN:
      return {
        ...state,
        list: state.list.map((tec) =>
          tec.id === action.payload.id ? action.payload : tec
        ),
      };
    case DELETE_TECHNICIAN:
      return {
        ...state,
        list: state.list.map((tec) => tec.id !== action.payload.id),
      };

    default:
      return state;
  }
};
