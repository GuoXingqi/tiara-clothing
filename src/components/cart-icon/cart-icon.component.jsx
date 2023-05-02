import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles.jsx';

import { useSelector, useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action.js';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';

const CartIcon = () => {

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const dispatch = useDispatch();
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen)); //update inverse value

  return (
    <CartIconContainer onClick={ toggleIsCartOpen }>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;