/*
    Reducer 永远不应该更改原有 state，应该始终返回新的对象，否则，React Redux 觉察不到数据变化
*/

export default function reducer(state=[], action){
    switch (action.type) {
        case 'ADD_TODO':           
            return [ ...state, action.payload ]
        case 'INIT_TODO':
            return action.init      
        case 'DEL_TODO':
           let todos = [...state];
               todos.splice(action.index,1);
            return todos      
        default:
            return state; // 无论如何都返回一个 state
    }
}