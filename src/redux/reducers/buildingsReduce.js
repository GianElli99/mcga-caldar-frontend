import {
  BUILD_CREATE_BUILDING,
  BUILD_UPDATE_BUILDING,
  BUILD_DELETE_BUILDING,
  BUILD_SET_ALL_BUILDINGS,
  BUILD_SET_ERROR,
  BUILD_SET_LOADING_TRUE,
} from '../types/buildingsTypes';

const initialState = {
  list: [],
  error: '',
  isLoading: false,
};

export const buildingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUILD_CREATE_BUILDING:
      return {
        ...state,
        error: '',
        list: [...state.list, action.payload],
        isLoading: false,
      };
    case BUILD_UPDATE_BUILDING:
      return {
        ...state,
        error: '',
        list: state.list.map((build) =>
          build.id === action.payload.id ? action.payload : build
        ),
        isLoading: false,
      };
    case BUILD_DELETE_BUILDING:
      return {
        ...state,
        error: '',
        list: state.list.filter((build) => build.id !== action.payload),
        isLoading: false,
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

    default:
      return state;
  }
};
