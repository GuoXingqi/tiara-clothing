import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../categories/categories.types";


//1) helper functions
const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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


const removeCartItems = (cartIems: CartItem[], productToRemove: CategoryItem): CartItem[] => {
  //remove all quantities of a item in cart
  return cartIems.filter((cartIem) => cartIem.id !== productToRemove.id);
}


const subtractCartItem = (cartItems: CartItem[], productToSubstract: CategoryItem): CartItem[] => {
  //if the product.quantity > 1, substract quantity it by 1
  const existingCartItem = cartItems.find((cartItem) => 
    cartItem.id === productToSubstract.id
  ); //it works!!!

  if (existingCartItem && existingCartItem.quantity > 1) {
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

//2) action creators

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export const setIsCartOpen = withMatcher((isCartOpen:boolean):SetIsCartOpen => 
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen));

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setCartItems = withMatcher(
  (newCartItems:CartItem[]):SetCartItems => 
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
);

export const addItemToCart = withMatcher((cartItems: CartItem[], productToAdd:CategoryItem):SetCartItems => {
  const newCartItems = cartItems && addCartItem(cartItems, productToAdd); // !!! need to find where this was called ..(too early)
  return setCartItems(newCartItems) ;
});

export const subtractItemToCart = withMatcher((cartItems:CartItem[], productToSubstract:CartItem):SetCartItems => {
  const newCartItems = cartItems && subtractCartItem(cartItems, productToSubstract);  // !!! need to find where this was called ..(too early)
  return setCartItems(newCartItems) ;
});

export const removeItemToCart = withMatcher((cartItems:CartItem[], productToRemove:CartItem):SetCartItems => {
  const newCartItems = cartItems &&  removeCartItems(cartItems, productToRemove);  // !!! need to find where this was called ..(too early)
  return setCartItems(newCartItems) ;
});
