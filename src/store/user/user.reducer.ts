import { UserData } from "../../utils/firebase/firebase.utils";
import { AnyAction } from "redux";
import { setCurrentUser } from "./user.action";

export type UserState = {
  readonly currentUser: UserData|null,
}

const USER_INITIAL_STATE:UserState = {
  currentUser: null,
}

//userReducer is a FUNCTION, new way of updateing userReducer (state management)
export const userReducer = (
  state:UserState = USER_INITIAL_STATE, 
  action: AnyAction) => {

  if(setCurrentUser.match(action)){
    return {...state, currentUser: action.payload}
  }

  //redux-saga .....

  return state;



  // const { type, payload } = action;
  // switch (type) {
  //   case USER_ACTION_TYPES.SET_CURRENT_USER:
  //     return {...state,currentUser: payload}
  //   default:
  //     return state;

}