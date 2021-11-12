import {
  CREATE_BOILER,
  UPDATE_BOILER,
  DELETE_BOILER,
  SET_ALL_BOILERS,
  SET_ERROR,
  SET_LOADING_TRUE,
} from '../types/boilersTypes';

const initialState = {
  list: [],
  error: '',
  isLoading: false,
};

export const boilersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOILER:
      return {
        ...state,
        error: '',
        list: [...state.list, action.payload],
        isLoading: false,
      };
    case UPDATE_BOILER:
      return {
        ...state,
        error: '',
        list: state.list.map((boil) =>
          boil.id === action.payload.id ? action.payload : boil
        ),
        isLoading: false,
      };
    case DELETE_BOILER:
      return {
        ...state,
        error: '',
        list: state.list.filter((boil) => boil.id !== action.payload),
        isLoading: false,
      };
    case SET_ALL_BOILERS:
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
