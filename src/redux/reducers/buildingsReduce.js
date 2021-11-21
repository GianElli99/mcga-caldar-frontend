import {
  BUILD_CREATE_BUILDING,
  BUILD_UPDATE_BUILDING,
  BUILD_DELETE_BUILDING,
  BUILD_SET_ALL_BUILDINGS,
  BUILD_SET_ERROR,
  BUILD_SET_LOADING_TRUE,
  BUILD_SET_CREATE_ACTION,
  BUILD_SET_UPDATE_ACTION,
  BUILD_SET_DELETE_ACTION,
  BUILD_UNSET_ACTION,
} from '../types/buildingsTypes';
import { UPDATE, DELETE, CREATE, NONE } from '../types/modalTypes';

const initialState = {
  list: [],
  error: '',
  isLoading: false,
  actionInProgress: NONE,
  selectedBuilding: null,
};

export const buildingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUILD_CREATE_BUILDING:
      return {
        ...state,
        error: '',
        list: [...state.list, action.payload],
        isLoading: false,
        actionInProgress: NONE,
        selectedBuilding: null,
      };
    case BUILD_UPDATE_BUILDING:
      return {
        ...state,
        error: '',
        list: state.list.map((build) =>
          build.id === action.payload.id ? action.payload : build
        ),
        isLoading: false,
        actionInProgress: NONE,
        selectedBuilding: null,
      };
    case BUILD_DELETE_BUILDING:
      return {
        ...state,
        error: '',
        list: state.list.filter((build) => build.id !== action.payload),
        isLoading: false,
        actionInProgress: NONE,
        selectedBuilding: null,
      };
    case BUILD_SET_ALL_BUILDINGS:
      return { ...state, list: action.payload, error: '', isLoading: false };
    case BUILD_SET_ERROR:
      return {
        ...state,
        error: action.payload || 'An error ocurred',
        isLoading: false,
      };
    case BUILD_SET_LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };

    case BUILD_SET_CREATE_ACTION:
      return {
        ...state,
        actionInProgress: CREATE,
      };
    case BUILD_SET_UPDATE_ACTION:
      return {
        ...state,
        actionInProgress: UPDATE,
        selectedBuilding: { ...action.payload },
      };
    case BUILD_SET_DELETE_ACTION:
      return {
        ...state,
        actionInProgress: DELETE,
        selectedBuilding: { ...action.payload },
      };
    case BUILD_UNSET_ACTION:
      return {
        ...state,
        actionInProgress: NONE,
        selectedBuilding: null,
        error: '',
      };

    default:
      return state;
  }
};
