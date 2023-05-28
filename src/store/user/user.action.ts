import { createAction,  withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
import { UserData } from "../../utils/firebase/firebase.utils";


// export type UserData = { // userd for user reducer as well
//   displayName: string;
//   email: string;
//   createAt: Date;
// }

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData> 

// actioncreator = withWatch( typed actioncreator)
export const setCurrentUser = withMatcher((user:UserData):SetCurrentUser => 
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));


  
//saga user action types... check user session etc