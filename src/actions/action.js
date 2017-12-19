export default {
    // 增加留言
    add:(payload)=>{
        return {
            type: 'ADD_TODO',
            payload:payload
        }        
    },
    initTodo:(datas)=>{
        return {
            type: 'INIT_TODO',
            init:datas
        }     
    },
    // 删除留言
    delTodo:(index)=>{
        return {
            type: 'DEL_TODO',
            index:index
        }
    },
    // 显示隐藏toast
    actionToast:(args)=>{
        return {
            type: 'TOAST_ACTION',
            args
        }
    },
    setUserInfo:(args)=>{
        return {
            type: 'SET_USER_INFO',
            userInfo:args
        }
    },
    setListLoading:(flag)=>{
        return {
            type:'SET_LIST_LOADING',
            isLoading: flag
            
        }
    }
}
