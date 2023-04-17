import { createContext, useState, useEffect } from "react";

import { 
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//as the actual value object you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: ()=>null,
})

//a component that provides the actual data by wrapping the who app with useState functionalities
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(()=>{ // run callback once only when the component mounts

    const unsubscribe = onAuthStateChangedListener( (user) => {//user type is expected and passed as expected in firebase doc.
      if (user) {
        createUserDocumentFromAuth(user);//sign in google
      }
      //1, sign-up //2.sugn-in(no user) //3.setCurrentUser(null) in navigation;
      setCurrentUser(user);
      });

    return unsubscribe;//return statement runs when this component unmonts
  }, []);

  return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
}