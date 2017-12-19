import { List, Map } from 'immutable'

// 初始化
let initState = Map({
    loading: false, // loding
    toastState: {
        bool: false, 
        timer:1000,
        text: null
    },
    isLoading:true
})

export default global=(state=initState, action)=>{
    switch (action.type) {
        case 'TOAST_ACTION':           
            return state.set("toastState",action.args)
        case 'SET_USER_INFO':
            return state.set("userInfo",action.userInfo)
        case 'SET_LIST_LOADING':
            return state.set("isLoading",action.isLoading)
        default:
            return state; // 无论如何都返回一个 state
    }
}