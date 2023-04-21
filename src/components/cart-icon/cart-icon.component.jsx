import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles.jsx';

const CartIcon = () => {
  const {isCartOpen, SetIsCartOpen, cartCount} = useContext(CartContext);

  const toggleIsCartOpen = () => SetIsCartOpen(!isCartOpen); //update inverse value

  return (
    <CartIconContainer onClick={ toggleIsCartOpen }>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;