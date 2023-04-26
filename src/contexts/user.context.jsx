import { createContext, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";
import { 
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//as the actual value object you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: ()=>null,
})

//to avoid human-type SET_CURRENT_USER error.
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

//userReducer is a FUNCTION, new way of updateing userContext (state management)
export const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
}

const INITIAL_STATE = {
  currentUser: null,
}

//a component that provides the actual data by wrapping the who app with useState functionalities
export const UserProvider = ({ children }) => {
  //const [currentUser, setCurrentUser] = useState(null);//refactoring useState to useReducer
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);//takes 2 arguments, 1) Reducer 2) initial state
  //declare from reducer state
  const { currentUser } = state;
  const setCurrentUser = (user) => {//user auth object
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  }

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