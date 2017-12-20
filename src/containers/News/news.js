import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import api from 'api/index'
require('es6-promise').polyfill();
require('isomorphic-fetch');
import Header from 'components/common/Header'
import Footer from 'components/common/Footer'
import { Link } from 'react-router'

import '../page.scss'

class News extends Component {
    constructor() {
        super();
        this.state = {
            lists:[]
        }
        this._isMounted = true;
    }
    componentWillMount() {
        this._isMounted = true
        var datas=localStorage.getItem('news');
        if(datas) return this.setState(JSON.parse(datas));       
        // 调用接口获取数据
        // fetch(api.getNewsList+'&page=1&per_page=20&content=all&mode=weekly').then((res) => {
        //     return res.json();
        // }).then((res) => {
        //     var params={
        //         lists: res.response
        //     };
        //     this.setState(params);
        //     localStorage.setItem('news',JSON.stringify(params));
        // }).catch((e) => {
        //     console.log("报错了", e);
        // }) 

        // async/await 写法
        async function myFetch(){ 
            let res = await fetch(api.getNewsList+'&page=1&per_page=20&content=all&mode=weekly');
            let result = await res.json();
            return result;
        }

        myFetch().then((res)=>{
            var params={
                lists: res.response
            };
            if(this._isMounted) this.setState(params);   
            localStorage.setItem('news',JSON.stringify(params));
        }).catch((e) => {
            console.log("报错了", e);
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount(){
        
    }
    render() {
        const {lists} = this.state;
        return (
         <div className='view-news'>
            <Header title={'新闻中心'} showBack={'true'}></Header>
            <div className="c-content">
                <ul className='news-list'>
                    {lists.map((item,index)=>{
                        return(<li key={index}>
                            <Link to={'/newsDetail/'+item.id}>
                                <h6 className='title'>{item.title}</h6>
                                <span>创建时间：<em className='c-gray'>{item.created_time}</em></span>
                                <span>类型：<em className='c-gray'>{item.type}</em></span>
                            </Link>
                            </li>)
                    })}
                </ul>            
            </div>
         </div>
        )
    }
}

module.exports = News;