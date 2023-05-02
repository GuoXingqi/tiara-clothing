//single source of truth
import { compose, createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';//development tool
import { rootReducer } from "./root-reducer";
import thunk from "redux-thunk"; // tranform asynic function into actio-driven flow

//redux-persist
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';//local storage in brower

//middleware enhancer - only run this under non-production environment
const middleWares = [process.env.NODE_ENV !== 'production' && logger,
  thunk, //use thunk middleware
].filter(Boolean); //filter out middleWare if statement is false

const composeEnhancer = (process.env.NODE_ENV !== 'production' && 
  window && 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose; //if redux-dev-tool exists, use extension compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

//redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
}

//mount persit on rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//used persistedReducer instead of rootReducer directly to generate sotre
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);