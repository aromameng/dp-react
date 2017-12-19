import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class Comment extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var { item , index,handleDelTodo }=this.props;
        return <div className='item'>            
                <h6 className='name'><span>{item.id}、</span>{item.userName}</h6>
                <p className='body'>{item.orderCount}</p>
                <span className='del' onClick={()=>{handleDelTodo(index)}}>删除</span>
            </div> 
    }
}

export default Comment;