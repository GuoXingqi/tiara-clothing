import { combineReducers } from "redux";//combine into root reducer

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/categories.reducer";
import { cartReducer } from "./cart/cart.reducer";

//@param are a object of all component reducers
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
