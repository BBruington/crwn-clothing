import {compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer( persistConfig, rootReducer);


//could import loggerMiddleware instead if wanted
//but keeping it just for reference even though it's
//not used
const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(
    Boolean
);

const composeEnhancer = 
(process.env.NODE_ENV !== 'production' && 
window && 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
    persistedReducer, 
    undefined, 
    composedEnhancers);

export const persistor = persistStore(store);
