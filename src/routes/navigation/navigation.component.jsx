import { Fragment, useContext } from 'react';//a component object
import { Outlet } from 'react-router-dom';//Link, beheave like anchor tags
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';//input svg as a component
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

//styled components to prevent style clashes
import { NavigationContainer } from './navigation.styles';//styled-component
import { LogoContainer } from './navigation.styles';
import { NavLinks } from './navigation.styles';
import { NavLink } from './navigation.styles';

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
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo'/>
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink> 
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />} 
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;