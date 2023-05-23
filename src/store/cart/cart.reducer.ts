import { CartItem } from "./cart.types";
import { setIsCartOpen, setCartItems } from "./cart.action";
import { AnyAction } from 'redux';

export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
}

const CART_INITIAL_STATE: CartState = {
  isCartOpen: false, //default value
  cartItems: [],
}

//DO NOT WRITE BUSINESS LOGIC IN REDUCER FUNCTION
export const cartReducer = (
  state: CartState = CART_INITIAL_STATE, 
  action: AnyAction, // predicate action as anyaction => <...props, T>
  ): CartState => {

  if(setIsCartOpen.match(action)){
    return { ...state, isCartOpen: action.payload,}
  }

  if(setCartItems.match(action)){
    return {...state, cartItems: action.payload, }
  }

  return state;
}