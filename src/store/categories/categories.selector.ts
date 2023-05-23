import { createSelector } from "reselect";//memoized selector to prevent unnecessaire react dom re-rendering
import { CategoriesState } from "./categories.reducer";
import { CategoryMap } from "./categories.types";

//get the component-reducer raw object
const selectCategoriesReducer = (state:any):CategoriesState => state.categories;//feels illeagl to use 'any' here

//1 create a re-selector to the raw reducer data itself
export const selectCategories = createSelector(//get actual categories data
  [selectCategoriesReducer], 
  (categoriesSlice) => categoriesSlice.categories
);//1st parameter is input-selector, second parameter is a callback that prduces output

export const selectCategoriesMap = createSelector(
  //2 transformating original data to the format that we use to present data to react, 
  //aka, business logic, array to mapping
  [selectCategories],
  (categories): CategoryMap => 
    categories.reduce((acc, category)=>{
      const { title, items } = category;//each data entity in array
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
