import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

//helper function - return new array of cartItems with update item/item.quantity
const addCartItem = (cartItems, productToAdd) => {
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

//helper function - return new array of cartItems with update item/item.quantity
//remove all quantities of a item in cart
const removeCartItems = (cartIems, productToRemove) => {
  return cartIems.filter((cartIem) => cartIem.id !== productToRemove.id);
}

//helper function - return new array of cartItems with update item/item.quantity
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

//as the actual value object by calling react.createContext method
export const CartContext = createContext({
  isCartOpen: false, //default value
  SetIsCartOpen: ()=>{},
  cartItems: [],
  setCartItems: () => {},
  subtractItemToCart: () => {},
  removeItemToCart: () => {},
  cartCount: 0,
  cartTotalPrice: 0,
})

export const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const INITIAL_STATE = {
  isCartOpen: false, //default value
  cartItems: [],
  cartCount: 0,
  cartTotalPrice: 0,
}

//DO NOT WRITE BUSINESS LOGIC IN REDUCER FUNCTION
export const cartReducer = (state, action) => {
  const { type, payload} = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`)
  } 
}

//a component that provides the actual data by wrapping <App>
export const CartContextProvider = ({ children }) => {

  //call useReducer instead of useState;
  const [ state , dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, cartTotalPrice} = state;


  const SetIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  }


  //generate new cartCount and new cartTotalPrice to prepare payload for SET_CART_ITEMS
  //calculation (helper function) and state management seperate!
  const upateCartItemsReducer = (newCartItems) => {

    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    const newCartTotalPrice = newCartItems.reduce((totalPrice, cartItem) => 
      (totalPrice + cartItem.price * cartItem.quantity), 0)

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,
      {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotalPrice: newCartTotalPrice,
      }
    ));
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    upateCartItemsReducer(newCartItems);
  }

  const subtractItemToCart = (productToSubstract) => {
    const newCartItems =subtractCartItem(cartItems, productToSubstract);
    upateCartItemsReducer(newCartItems);
  }

  const removeItemToCart = (productToRemove) => {
    const newCartItems = removeCartItems(cartItems, productToRemove);
    upateCartItemsReducer(newCartItems);
  }

  const value = {
    isCartOpen, 
    SetIsCartOpen,
    cartItems,
    addItemToCart,
    subtractItemToCart,
    removeItemToCart,
    cartCount,
    cartTotalPrice,
  };

  return (<CartContext.Provider value={value}>{ children }</CartContext.Provider>);
}