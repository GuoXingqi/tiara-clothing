//single source of truth
import { compose, createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';//development tool

import { rootReducer } from "./root-reducer";

//middleWares enhances our redux store
const middleWares = [logger]; //middleware functions before the actually reducer operations
const composedEnhancers = compose(applyMiddleware(...middleWares));

//createStore is redux core method, we use it for practise
export const store = createStore(rootReducer, undefined, composedEnhancers);
