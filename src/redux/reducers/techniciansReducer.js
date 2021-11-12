import {
  TECH_CREATE_TECHNICIAN,
  TECH_UPDATE_TECHNICIAN,
  TECH_DELETE_TECHNICIAN,
  TECH_SET_ALL_TECHNICIANS,
  TECH_SET_ERROR,
  TECH_SET_LOADING_TRUE,
} from '../types/techniciansTypes';

const initialState = {
  list: [],
  error: '',
  isLoading: false,
};

export const techniciansReducer = (state = initialState, action) => {
  switch (action.type) {
    case TECH_CREATE_TECHNICIAN:
      return {
        ...state,
        error: '',
        list: [...state.list, action.payload],
        isLoading: false,
      };
    case TECH_UPDATE_TECHNICIAN:
      return {
        ...state,
        error: '',
        list: state.list.map((tec) =>
          tec.id === action.payload.id ? action.payload : tec
        ),
        isLoading: false,
      };
    case TECH_DELETE_TECHNICIAN:
      return {
        ...state,
        error: '',
        list: state.list.filter((tec) => tec.id !== action.payload),
        isLoading: false,
      };
    case TECH_SET_ALL_TECHNICIANS:
      return { ...state, list: action.payload, error: '', isLoading: false };
    case TECH_SET_ERROR:
      return {
        ...state,
        error: action.payload || 'An error ocurred',
        isLoading: false,
      };
    case TECH_SET_LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};
