import {
  TECH_CREATE_TECHNICIAN,
  TECH_UPDATE_TECHNICIAN,
  TECH_DELETE_TECHNICIAN,
  TECH_SET_ALL_TECHNICIANS,
  TECH_SET_ERROR,
  TECH_SET_LOADING_TRUE,
  TECH_SET_CREATE_ACTION,
  TECH_SET_UPDATE_ACTION,
  TECH_SET_DELETE_ACTION,
  TECH_UNSET_ACTION,
} from '../types/techniciansTypes';
import { UPDATE, DELETE, CREATE, NONE } from '../types/modalTypes';

const initialState = {
  list: [],
  error: '',
  isLoading: false,
  actionInProgress: NONE,
  selectedTechnician: null,
};

export const techniciansReducer = (state = initialState, action) => {
  switch (action.type) {
    case TECH_CREATE_TECHNICIAN:
      return {
        ...state,
        error: '',
        list: [...state.list, action.payload],
        isLoading: false,
        actionInProgress: NONE,
        selectedTechnician: null,
      };
    case TECH_UPDATE_TECHNICIAN:
      return {
        ...state,
        error: '',
        list: state.list.map((tec) =>
          tec.id === action.payload.id ? action.payload : tec
        ),
        isLoading: false,
        actionInProgress: NONE,
        selectedTechnician: null,
      };
    case TECH_DELETE_TECHNICIAN:
      return {
        ...state,
        error: '',
        list: state.list.filter((tec) => tec.id !== action.payload),
        isLoading: false,
        actionInProgress: NONE,
        selectedTechnician: null,
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
    case TECH_SET_CREATE_ACTION:
      return {
        ...state,
        actionInProgress: CREATE,
      };
    case TECH_SET_UPDATE_ACTION:
      return {
        ...state,
        actionInProgress: UPDATE,
        selectedTechnician: { ...action.payload },
      };
    case TECH_SET_DELETE_ACTION:
      return {
        ...state,
        actionInProgress: DELETE,
        selectedTechnician: { ...action.payload },
      };
    case TECH_UNSET_ACTION:
      return {
        ...state,
        actionInProgress: NONE,
        selectedTechnician: null,
        error: '',
      };

    default:
      return state;
  }
};
