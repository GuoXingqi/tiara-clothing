//selector function, argument state = redux.state, return currentUser value from redux state
export const selectCurrentUser = (state) => state.user.currentUser;