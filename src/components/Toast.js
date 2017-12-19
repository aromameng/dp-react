import React from 'react';
import ReactDOM from 'react-dom';

import store from '../stores/store'
import action from '../actions/action'

import './components.scss';


class Toast extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        const {timer}=this.props;
        setTimeout(()=>{
            // 1s后移除组件
            store.dispatch(action.actionToast({
                bool: false
            }))
        },timer)       
    }

    render(){
        const {text} = this.props;
        return (
            <div className='cp-toast'>
                <div className='content'>
                    <span className='txt'>{text}</span>
                </div>
            </div>
        )
    }
}

export default Toast;