import { Fragment } from 'react';//a component object
import { Outlet } from 'react-router-dom';//Link, beheave like anchor tags
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';//input svg as a component
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

//styled components to prevent style clashes
import { NavigationContainer } from './navigation.styles';//styled-component
import { LogoContainer } from './navigation.styles';
import { NavLinks } from './navigation.styles';
import { NavLink } from './navigation.styles';

const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser);//taking an selector function: (state: any) => any
  const isCartOpen = useSelector(selectIsCartOpen);

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