import {
  BOIL_CREATE_BOILER,
  BOIL_UPDATE_BOILER,
  BOIL_DELETE_BOILER,
  BOIL_SET_ALL_BOILERS,
  BOIL_SET_ERROR,
  BOIL_SET_LOADING_TRUE,
  BOIL_SET_CREATE_ACTION,
  BOIL_SET_DELETE_ACTION,
  BOIL_SET_UPDATE_ACTION,
  BOIL_UNSET_ACTION,
} from '../types/boilersTypes';
import { UPDATE, DELETE, CREATE, NONE } from '../types/modalTypes';

const initialState = {
  list: [],
  error: '',
  isLoading: false,
  actionInProgress: NONE,
  selectedBoiler: null,
};

export const boilersReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOIL_CREATE_BOILER:
      return {
        ...state,
        error: '',
        list: [...state.list, action.payload],
        isLoading: false,
        actionInProgress: NONE,
        selectedBoiler: null,
      };
    case BOIL_UPDATE_BOILER:
      return {
        ...state,
        error: '',
        list: state.list.map((boil) =>
          boil.id === action.payload.id ? action.payload : boil
        ),
        isLoading: false,
        actionInProgress: NONE,
        selectedBoiler: null,
      };
    case BOIL_DELETE_BOILER:
      return {
        ...state,
        error: '',
        list: state.list.filter((boil) => boil.id !== action.payload),
        isLoading: false,
        actionInProgress: NONE,
        selectedBoiler: null,
      };
    case BOIL_SET_ALL_BOILERS:
      return { ...state, list: action.payload, error: '', isLoading: false };
    case BOIL_SET_ERROR:
      return {
        ...state,
        error: action.payload || 'An error ocurred',
        isLoading: false,
      };
    case BOIL_SET_LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };
    case BOIL_SET_CREATE_ACTION:
      return {
        ...state,
        actionInProgress: CREATE,
      };
    case BOIL_SET_UPDATE_ACTION:
      return {
        ...state,
        actionInProgress: UPDATE,
        selectedBoiler: { ...action.payload },
      };
    case BOIL_SET_DELETE_ACTION:
      return {
        ...state,
        actionInProgress: DELETE,
        selectedBoiler: { ...action.payload },
      };
    case BOIL_UNSET_ACTION:
      return {
        ...state,
        actionInProgress: NONE,
        selectedBoiler: null,
      };

    default:
      return state;
  }
};
