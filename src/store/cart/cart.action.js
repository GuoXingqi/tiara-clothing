import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (isCartOpen) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);//payload is not needed;

//1 helper functions
//2 action ceators

const addCartItem = (cartItems, productToAdd) => {
  //return new array of cartItems with update item/item.quantity
  //find if cartitems contains productToAdd
  const existingCartItem = cartItems.find((cartItem) => 
    cartItem.id === productToAdd.id
  );
    
  if (existingCartItem) {
    //if found, return a new array objec with incremented addCartItem.quantity
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? 
      ({...cartItem, quantity: cartItem.quantity + 1})
      :(cartItem)
    ); 
  } else {
    //retrun new aray new cart item if not found
    return [...cartItems, {...productToAdd, quantity: 1}];
  }
}


const removeCartItems = (cartIems, productToRemove) => {
  //remove all quantities of a item in cart
  return cartIems.filter((cartIem) => cartIem.id !== productToRemove.id);
}


const subtractCartItem = (cartItems, productToSubstract) => {
  //if the product.quantity > 1, substract quantity it by 1
  const existingCartItem = cartItems.find((cartItem) => 
    cartItem.id === productToSubstract.id
  );
    
  if (existingCartItem.quantity > 1) {
    //if found, return a new array objec with decrement addCartItem.quantity
    return cartItems.map((cartItem) =>
      cartItem.id === productToSubstract.id ? 
      ({...cartItem, quantity: cartItem.quantity - 1})
      :(cartItem)
    ); 
  } else {
    //if the product.quantity = 1, remove it
    return removeCartItems(cartItems, productToSubstract)
  }
}


//action creators
export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const subtractItemToCart = (cartItems, productToSubstract) => {
  const newCartItems =subtractCartItem(cartItems, productToSubstract);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemToCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItems(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}