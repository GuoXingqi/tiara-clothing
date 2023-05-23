import { AnyAction } from 'redux';
import { Category } from "./categories.types";
import { 
  fetchCategoriesStart, 
  fetchCategoriesSuccess, 
  fetchCategoriesFailed 
} from "./categories.action";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null | unknown;//could initialize as Error or as null
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
}

//reducer function return state accoirdingly to actions
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
  ): CategoriesState => {

  if(fetchCategoriesStart.match(action)){
    return {...state,isLoading: true,};
  }

  if(fetchCategoriesSuccess.match(action)){
    return {...state,isLoading: false, categories: action.payload,};
  }

  if(fetchCategoriesFailed.match(action)){
    return {...state,isLoading: false, error: action.payload,};//error unknown?
  }

  return state;

  // const {typem payload} = action;
  // switch(action.type){
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
  //     //update isLoading to true
  //     return {...state,isLoading: true,};
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //     //keep what we fetched-and update isLoading to false
  //     return {...state,isLoading: false,categories: action.payload,};
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
  //     //update isLoading, and keep error only
  //     return {...state,isLoading: false,error: action.payload,};
  //   default:
  //     return state;
  // }
}