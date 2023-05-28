import { CATEGORIES_ACTION_TYPES, Category } from "./categories.types";
import { createAction, ActionWithPayload, Action } from "../../utils/reducer/reducer.utils";
import { withMatcher } from "../../utils/reducer/reducer.utils";

//functino return types
export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>
export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, unknown>//error: unknown

//create a typed action(type, ?payload) => for dispatch (update state)
export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => 
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess => 
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray));

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed => 
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));//error: unknown

//thunk actions - currying
//fetch function goes to shop component - raga refectering needed