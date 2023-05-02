import { Route, Routes } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "../../store/categories/categories.action";

import './shop.styles.scss';

const Shop = () => {

  const dispatch = useDispatch();

  useEffect(()=>{//we wrapped the async part in thunk
    dispatch(fetchCategoriesAsync());//pay attention to how we call this currying funtion
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