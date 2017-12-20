import promise from 'es6-promise'
import fetch from 'isomorphic-fetch'

promise.polyfill();

// 状态处理
function checkStatus(res){
    if (res.status >= 200 && res.status < 300) {
        return res;
    }
    var msg = ''
    switch (res.status.toString()) {
        case '0':
                msg = "您的网络有问题,请稍后再试。";
                break;
        case '302':
                msg = '临时重定向';
                break;
        case '403':
                msg = "无访问权限";
                break;
        case '404':
                msg = "请求的资源不存在";
                break;
        case '500':
        case '501':
        case '502':
        case '504':
                msg = "服务器内部错误";
                break;
        default:
                msg = "未知错误";
    }
    return Promise.reject({msg: msg});
}

// 请求成功处理
function resHandler(resData, options) {
    options.dispatch&&options.dispatch({type:"HIDE_LOADING"})
    if (resData) {
        options.success && options.success(resData);
    }else{
        options.error && options.error(resData)
    }
}

// 异常处理
function errorHandler(error,options) {
    options.dispatch&&options.dispatch({type:"HIDE_LOADING"})
    options.error && options.error(error)
}

// fetch统一处理
const fetchJson = (url,options) => {
    let {
        type,
        data,
        dispatch,
        ...others
    } = options;
    let opts = {
        ...others,
        method: type || 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'X-Requested-With':'XMLHttpRequest'
        }
    }
    opts.body =type&&type.toUpperCase()=="GET"?data : JSON.stringify(data||{})
    dispatch&&dispatch({type:"SHOW_LOADING"})

    fetch(url,opts)
        .then(checkStatus)
        .then((res) => {
                return res.json();
        })
        .then(resData => resHandler(resData, options))
        .catch(error => errorHandler(error,options))
}

export default fetchJson