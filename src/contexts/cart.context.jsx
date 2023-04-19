import { createContext, useState, useEffect } from "react";

//helper function
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

//helper funciton?
//remove all quantities of a item in cart
const removeCartItems = (cartIems, productToRemove) => {
  return cartIems.filter((cartIem) => cartIem.id !== productToRemove.id);
}

//helper function?
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
  addItemToCart: () => {},
  subtractItemToCart: () => {},
  removeItemToCart: () => {},
  cartCount: 0,
  cartTotalPrice: 0,
})

//a component that provides the actual data by wrapping <App>
export const CartContextProvider = ({ children }) => {
  const [isCartOpen, SetIsCartOpen] = useState(false);//passing default value // no show
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const subtractItemToCart = (productToSubstract) => {
    setCartItems(subtractCartItem(cartItems, productToSubstract))
  }

  const removeItemToCart = (productToRemove) => {
    setCartItems(removeCartItems(cartItems, productToRemove))
  }

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount);
  },[cartItems]);

  useEffect(() => {
    const newCartTotalPrice = cartItems.reduce((totalPrice, cartItem) => 
      (totalPrice + cartItem.price * cartItem.quantity), 0)
    setCartTotalPrice(newCartTotalPrice);
  },[cartItems]);

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