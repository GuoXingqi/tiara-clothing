import './category-item.style.scss';

const CategoryItem = ( {category} ) => {//use {} if props is a array

  const {title, imageUrl} = category;//destructing

  return(
    <div className="category-container">
      <div className="background-image" style={{
        backgroundImage: `url(${imageUrl})`
      }}></div>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>

  );
}

export default CategoryItem;