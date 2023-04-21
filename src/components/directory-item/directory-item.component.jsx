import { useNavigate } from 'react-router-dom';

import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.style.jsx';

const DirectoryItem = ( {category} ) => {
  const {title, imageUrl, route} = category;//destructing

  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return(
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}

export default DirectoryItem;