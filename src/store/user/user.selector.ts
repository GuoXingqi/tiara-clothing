import { UserState } from "./user.reducer";
import { createSelector } from "reselect";

//select user-reducer
export const selectUserReducer = (state:any) => state.user;

//selector function, argument state = redux.state, return currentUser value from redux state
export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser,
); //state.user.currentUser;