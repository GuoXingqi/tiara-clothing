import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";


//as the actual value object you want to access
export const CategoriesContext = createContext({
  categoriesMap: {},
})

//a component that provides the actual data by wrapping <App>
export const CategoriesProvider = ({ children }) => {
  const [ categoriesMap, setCategoriesMap ] = useState({});
  
  useEffect(()=>{
    const getCategoriesMap = async () => {//wrap async function in a new local defi
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    }

    getCategoriesMap();
  },[])

  const value = { categoriesMap };

  return (<CategoriesContext.Provider value={value}>{ children }</CategoriesContext.Provider>);
}