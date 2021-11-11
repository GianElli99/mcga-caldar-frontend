import {
  CREATE_BUILDINGS,
  UPDATE_BUILDINGS,
  DELETE_BUILDINGS,
  SET_ALL_BUILDINGS,
  SET_ERROR,
  SET_LOADING_TRUE,
} from '../types/buildingsTypes';

const initialState = {
  list: [],
  error: '',
  isLoading: false,
};

export const buildingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BUILDINGS:
      return {
        ...state,
        error: '',
        list: [...state.list, action.payload],
        isLoading: false,
      };
    case UPDATE_BUILDINGS:
      return {
        ...state,
        error: '',
        list: state.list.map((build) =>
          build.id === action.payload.id ? action.payload : build
        ),
        isLoading: false,
      };
    case DELETE_BUILDINGS:
      return {
        ...state,
        error: '',
        list: state.list.filter((build) => build.id !== action.payload),
        isLoading: false,
      };
    case SET_ALL_BUILDINGS:
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
