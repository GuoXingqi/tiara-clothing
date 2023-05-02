import { CheckoutItemContainer } from './checkout-item.styles';

import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, subtractItemToCart, removeItemToCart } from '../../store/cart/cart.action';

const CheckoutItem = ( {cartItem} ) => {
  const { name, imageUrl, price, quantity } = cartItem;

  //handler functions
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const removeItemHandler = () => dispatch(subtractItemToCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const clearItemHandler = () => dispatch(removeItemToCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addItemHandler}>&#10095;</div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem;