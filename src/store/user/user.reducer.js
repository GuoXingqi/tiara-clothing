import { USER_ACTION_TYPES } from "./user.types";

const USER_INITIAL_STATE = {
  currentUser: null,
}

//userReducer is a FUNCTION, new way of updateing userReducer (state management)
export const userReducer = (state = USER_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      return state;//return state if not found types in this component reducer
  }
}