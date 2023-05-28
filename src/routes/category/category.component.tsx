import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component'; 

import { useParams } from 'react-router-dom';//access to :category defined in shop route
import { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categories.selector';

import {CategoryTitle, CategoryContainer} from './category.styles';

type CategoryRouteParams = {
  category: string;
}


const Category = () => {
  //enforce type to only string
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;//:category shop route path
  const categoriesMap = useSelector(selectCategoriesMap);
  const categoriesIsLoading = useSelector(selectCategoriesIsLoading);

   //products = categoriesMap[category]; //everytimes it re-renders, not optimal
  //more effecticent to useState and useEffect
  const [ products, setProducts ] = useState(categoriesMap[category]);//default value

  useEffect(()=>{
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category])


  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      { 
        categoriesIsLoading ? <Spinner/> :
          <CategoryContainer>
          {
            products && products.map( ( product ) => (//products is asyn, and needs safeguard
                <ProductCard key={product.id} product={product} />
              ))
          }
          </CategoryContainer>  
      }
    </Fragment>
  )

}

export default Category;