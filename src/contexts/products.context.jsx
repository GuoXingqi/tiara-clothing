import { createContext, useState } from "react";

import PRODUCTS from '../shop-data.json';

//as the actual value object you want to access
export const ProductsContext = createContext({
  products: [],
})

//a component that provides the actual data by wrapping <App>
export const ProductsProvider = ({ children }) => {
  const [products] = useState(PRODUCTS);//passing default value of products // setProducts
  const value = { products };

  //useEffect is not nessary here to set default value for Context.

  return (<ProductsContext.Provider value={value}>{ children }</ProductsContext.Provider>);
}