import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;//just a slice of state

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.isCartOpen
);//cartSlice = selectCartReducr;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cartItems
);

export const selectCartCount = createSelector(
  //since this data is based on cartItems, so we formulate this data in selector only
  [selectCartItems],//!!! - based on cartItems is more precise
  (cartItems) => cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  )
);

export const selectCartTotalPrice = createSelector(
  //since this data is based on cartItems, so we formulate this data in selector only
  [selectCartItems],//!!! - based on cartItems is more precise
  (cartItems) => cartItems.reduce((totalPrice, cartItem) => 
    (totalPrice + cartItem.price * cartItem.quantity), 0)
);