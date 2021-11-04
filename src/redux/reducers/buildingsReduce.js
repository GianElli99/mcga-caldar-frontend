import {
  CREATE_BUILDINGS,
  UPDATE_BUILDINGS,
  DELETE_BUILDINGS,
} from '../types/buildingsTypes';

const initialState = {
  list: [
    {
      id: '3',
      direction: '5637 Eagle Crest Point',
      city: 'Neklyudovo',
      name: 'Mississippi Buttercup',
      postalCode: '69076',
      isParticular: true,
      constructionCompanyId: '3',
    },
    {
      id: '4',
      direction: '9425 Warrior Pass',
      city: 'Heydərabad',
      name: 'Corkbark Fir',
      postalCode: '2',
      isParticular: true,
      constructionCompanyId: '3',
    },
  ],
};

export const buildingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BUILDINGS:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case UPDATE_BUILDINGS:
      return {
        ...state,
        list: state.list.map((build) =>
          build.id === action.payload.id ? action.payload : build
        ),
      };
    case DELETE_BUILDINGS:
      return {
        ...state,
        list: state.list.filter((build) => build.id !== action.payload),
      };

    default:
      return state;
  }
};
