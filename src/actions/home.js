/*
 * @Author: meng 
 * @Date: 2017-12-18 11:15:02 
 */
/* action 本质上是一个包含 type 属性的普通对象，由 Action Creator (函数) 产生 
    改变 state 必须 dispatch 一个 action
*/

require('es6-promise').polyfill();
require('isomorphic-fetch');
import api from 'api/index'

export const home = {
    saveRecommendList:(list)=>{
        return {
            type: 'GET_RECOMMEND_LIST',
            list:list
        }
    },
    saveLikeList:(list,info)=>{
        return {
            type: 'GET_LIKE_LIST',
            payload:{
                data:list,
                info:info
            }
        }
    }
}

// 推荐
export const getRecommendList = ()=>{
    return async dispatch =>{
        let res = await fetch(api.getRecommendList);
        let result = await res.json();
        dispatch(home.saveRecommendList(result.data))
    }
}

// 喜欢
export const getLikeList = (page)=>{
    return async dispatch =>{
        let res = await fetch(api.getLikeList + '?page='+page);
        let result = await res.json();
        let lists = result.data;
        delete result.data;
        dispatch(home.saveLikeList(lists,result))
    }
}