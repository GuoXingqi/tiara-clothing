import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {

  const categoriesMap = useSelector(selectCategoriesMap);

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