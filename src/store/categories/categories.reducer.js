import { CATEGORIES_ACTION_TYPES } from "./categories.types";

const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false, //asynic => thunk
  error: null, //asynic => thunk
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch(type){
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      //update isLoading to true
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      //keep what we fetched-and update isLoading to false
      return {
        ...state,
        isLoading: false,
        categories: payload,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      //update isLoading, and keep error only
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}