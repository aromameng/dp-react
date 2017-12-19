/*
    Reducer 永远不应该更改原有 state，应该始终返回新的对象，否则，React Redux 觉察不到数据变化
*/
import {List, Map} from 'immutable';

let initState = Map({
    recommendList: [],
    likeList:{
        info:{
            page:1
        },
        data:[]
    }
});

export default function reducer(state=initState, action){
    switch (action.type) {
        case 'GET_RECOMMEND_LIST':           
            return state.set("recommendList",action.list)
        case 'GET_LIKE_LIST':           
            return state.set("likeList",{
                info:action.payload.info,
                data:(state.get('likeList')).data.concat(action.payload.data)
            })
        default:
            return state; // 无论如何都返回一个 state
    }
}