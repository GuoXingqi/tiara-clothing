import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {

  const { categoriesMap } = useContext(CategoriesContext);

  return (

    <div className="shop-container">
      {Object.keys(categoriesMap).map((title)=>{//object.keys returns an array of keys
        const products = categoriesMap[title];
        return(
        <CategoryPreview key={title} title={title} products={products}></CategoryPreview>
        );
      })}
    </div>
  );
}

export default CategoriesPreview;