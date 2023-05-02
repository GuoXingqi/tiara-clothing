import { useSelector } from "react-redux";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/categories.selector";

import { Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from '../../components/spinner/spinner.component';

const CategoriesPreview = () => {

  const categoriesMap = useSelector(selectCategoriesMap);
  const categoriesIsLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>

      {
        categoriesIsLoading ? <Spinner /> :
          (Object.keys(categoriesMap).map((title)=>{//object.keys returns an array of keys
            const products = categoriesMap[title];
            return(
            <CategoryPreview key={title} title={title} products={products}></CategoryPreview>
            );
          }))
      }
    </Fragment>
  );
}

export default CategoriesPreview;