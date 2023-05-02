import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

import { useDispatch } from 'react-redux';//-no-auto-complete in CS code for this?
import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';


const App = () => {

  //hood down currentUser from redux
  const dispatch = useDispatch();//return function never changes
  useEffect(()=>{ // run callback once only when the component mounts

    const unsubscribe = onAuthStateChangedListener( (user) => {//user type is expected and passed as expected in firebase doc.
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));//dispatch action to update userReducer
    });

    return unsubscribe;//return statement runs when this component unmonts
  }, [dispatch]);

  return(
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;