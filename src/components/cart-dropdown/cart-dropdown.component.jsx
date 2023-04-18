import Button from '../button/button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  //const cartItems = null;
  
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items' />
      <Button>Go TO CHECKOUT</Button>
    </div>
  );
}

export default CartDropdown