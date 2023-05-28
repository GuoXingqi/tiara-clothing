import { Middleware } from "@reduxjs/toolkit";
//import { RootState } from "../store"; // pending on saga ---- not in sue anyway

//customized logger middleware difined in currying patern - not in use
export const loggerMiddleware:Middleware<{}, any> = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  next(action);

  console.log('next state: ', store.getState());
}