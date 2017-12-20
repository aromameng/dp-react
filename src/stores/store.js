import {
    createStore,combineReducers,applyMiddleware
} from 'redux'

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';

const logger = createLogger();
let store;

if(process.env.NODE_ENV=='production'){
     store = createStore(rootReducer,applyMiddleware(thunk));
}else{
     store = createStore(rootReducer,applyMiddleware(thunk,logger));
}

export default store;