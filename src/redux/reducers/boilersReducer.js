import {
  BOIL_CREATE_BOILER,
  BOIL_UPDATE_BOILER,
  BOIL_DELETE_BOILER,
  BOIL_SET_ALL_BOILERS,
  BOIL_SET_ERROR,
  BOIL_SET_LOADING_TRUE,
} from '../types/boilersTypes';

const initialState = {
  list: [],
  error: '',
  isLoading: false,
};

export const boilersReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOIL_CREATE_BOILER:
      return {
        ...state,
        error: '',
        list: [...state.list, action.payload],
        isLoading: false,
      };
    case BOIL_UPDATE_BOILER:
      return {
        ...state,
        error: '',
        list: state.list.map((boil) =>
          boil.id === action.payload.id ? action.payload : boil
        ),
        isLoading: false,
      };
    case BOIL_DELETE_BOILER:
      return {
        ...state,
        error: '',
        list: state.list.filter((boil) => boil.id !== action.payload),
        isLoading: false,
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

    default:
      return state;
  }
};
