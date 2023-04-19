import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartContext } from '../../contexts/cart.context';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  }

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.length > 0 ? cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        )) : <div class='empty-message'>Your cart is empty</div>
        }
      </div>
      <Button onClick={goToCheckoutHandler}>Go TO CHECKOUT</Button>
    </div>
  );
}

export default CartDropdown