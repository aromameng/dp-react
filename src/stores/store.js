import {
    createStore,combineReducers,applyMiddleware
} from 'redux'

import thunk from 'redux-thunk';

import articleReducers from '../reducers/articleReducers'
import global from '../reducers/commonReducers'
import home from '../reducers/homeReducers'

const rootReducer = combineReducers({
    todos:articleReducers,// 键名就是该 reducer 对应管理的 state
    global:global,
    home:home
  })

var store = createStore(rootReducer,applyMiddleware(thunk));

export default store;