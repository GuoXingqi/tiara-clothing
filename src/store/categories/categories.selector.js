import { createSelector } from "reselect";//memoized selector to prevent unnecessaire react dom re-rendering

const selectCategoriesReducer = (state) => state.categories;//get the component-reducer raw object

//1 create a re-selector to the raw reducer data itself
export const selectCategories = createSelector(//get actual categories data
  [selectCategoriesReducer], 
  (selectCategoriesReducer) => selectCategoriesReducer.categories
);//1st parameter is input-selector, second parameter is a callback that prduces output

export const selectCategoriesMap = createSelector(
  //2 transformating original data to the format that we use to present data to react, aka, business logic
  [selectCategories],
  (categories) => 
    categories.reduce((acc, category)=>{
      const { title, items } = category;//each data entity in array
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
