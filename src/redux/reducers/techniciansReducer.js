import {
  CREATE_TECHNICIAN,
  UPDATE_TECHNICIAN,
  DELETE_TECHNICIAN,
  SET_ALL_TECHNICIANS,
  SET_ERROR,
  SET_LOADING_TRUE,
} from '../types/techniciansTypes';

const initialState = {
  list: [],
  error: '',
  isLoading: false,
};

export const techniciansReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TECHNICIAN:
      return {
        ...state,
        error: '',
        list: [...state.list, action.payload],
        isLoading: false,
      };
    case UPDATE_TECHNICIAN:
      return {
        ...state,
        error: '',
        list: state.list.map((tec) =>
          tec.id === action.payload.id ? action.payload : tec
        ),
        isLoading: false,
      };
    case DELETE_TECHNICIAN:
      return {
        ...state,
        error: '',
        list: state.list.filter((tec) => tec.id !== action.payload),
        isLoading: false,
      };
    case SET_ALL_TECHNICIANS:
      return { ...state, list: action.payload, error: '', isLoading: false };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload || 'An error ocurred',
        isLoading: false,
      };
    case SET_LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};
