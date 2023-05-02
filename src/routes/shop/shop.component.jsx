import { Route, Routes } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/categories.action";

import './shop.styles.scss';

const Shop = () => {

  const dispatch = useDispatch();
  //i think category needs to be here
  useEffect(()=>{
    const getCategoriesMap = async () => {//wrap async function in a new local defi
      const categoriesArray = await getCategoriesAndDocuments();
      dispatch(setCategories(categoriesArray));//setCategoriesMap(categoryMap) prepare the action to be dispatched
    }

    getCategoriesMap();
  },[dispatch])

  // path=":$variable_name"
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}

export default Shop;