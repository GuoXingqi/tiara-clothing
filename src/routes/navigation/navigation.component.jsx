import { Fragment, useContext } from 'react';//a component object
import { Outlet, Link } from 'react-router-dom';//Link, beheave like anchor tags
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';//input svg as a component
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

import './navigation.styles.scss';

const Navigation = () => {
  //hook down CurrentUser
  const { currentUser } = useContext(UserContext);

  //hook down CartContext
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
  }

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo'/>
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
          ) : (
            <Link className='nav-link' to='/auth'>SIGN IN</Link> 
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />} 
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;