import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component'; 

import { useParams } from 'react-router-dom';//access to :category defined in shop route
import { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categories.selector';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();//:category shop route path
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
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      { 
        categoriesIsLoading ? <Spinner/> :
          <div className='category-container'>
          {
            products && products.map( ( product ) => (//products is asyn, and needs safeguard
                <ProductCard key={product.id} product={product} />
              ))
          }
          </div>  
      }
    </Fragment>
  )

}

export default Category;