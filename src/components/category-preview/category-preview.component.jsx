import ProductCard from '../product-card/product-card.component';
import Spinner from '../spinner/spinner.component';

import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading } from '../../store/categories/categories.selector';

import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles';

const CategoryPreview = ({ title, products })=>{

  const categoriesIsLoading = useSelector(selectCategoriesIsLoading);

  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      {
        categoriesIsLoading ? <Spinner /> :
          <Preview>
            {
              products
                .filter((_, idx) => idx < 4 )
                .map( ( product ) => (
                  <ProductCard key={product.id} product={product} />
                ))
            }
          </Preview>
      }
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview;