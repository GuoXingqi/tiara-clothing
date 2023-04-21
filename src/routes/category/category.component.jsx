import { useParams } from 'react-router-dom';//access to :category defined in shop route
import { useContext, useEffect, useState, Fragment } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();//:category shop route path
  const { categoriesMap } = useContext(CategoriesContext);

  const [ products, setProducts ] = useState(categoriesMap[category]);//default value

  //products = categoriesMap[category]; //everytimes it re-renders, not optimal
  //more effecticent to useState and useEffect
  useEffect(()=>{
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category])


  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className='category-container'>
      {
        products && products.map( ( product ) => (//products is asyn, and needs safeguard
            <ProductCard key={product.id} product={product} />
          ))
      }
      </div>
    </Fragment>
  )

}

export default Category;