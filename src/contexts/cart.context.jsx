import { createContext, useState } from "react";

//as the actual value object by calling react.createContext method
export const CartContext = createContext({
  isCartOpen: false, //default value
  SetIsCartOpen: ()=>{},
})

//a component that provides the actual data by wrapping <App>
export const CartContextProvider = ({ children }) => {
  const [isCartOpen, SetIsCartOpen] = useState(false);//passing default value // no show
  const value = { isCartOpen, SetIsCartOpen };

  return (<CartContext.Provider value={value}>{ children }</CartContext.Provider>);
}