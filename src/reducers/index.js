import {
    combineReducers
} from 'redux'

import articleReducers from './articleReducers'
import global from './commonReducers'
import home from './homeReducers'

const rootReducer = combineReducers({
    todos:articleReducers,// 键名就是该 reducer 对应管理的 state
    global:global,
    home:home
  })

export default rootReducer