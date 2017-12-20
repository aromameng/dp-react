import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import api from 'api/index'
require('es6-promise').polyfill();
require('isomorphic-fetch');
import Header from 'components/common/Header'
import '../page.scss'

import clonedeep from 'lodash.clonedeep'

import {Map} from 'immutable';

class News extends Component {
    constructor() {
        super();
        this.state = {
            items:{},
            defaultImg:'assets/imgs/01.png',
            data:Map({'items':{}})
        }
        this._isMounted = true;
    }
    componentWillMount() {      
        this._isMounted = true;
        // 获取
        const id=this.props.params.id;
        // 调用接口获取数据
        fetch(api.search+'?id='+ id).then((res) => {
            return res.json();
        }).then((res) => {
            // 这里是浅复制，图片信息在items获取不到，所以用一个pic单独复制图片信息
            var params={
                items: res.response[0]
            }; 
            // this.setState({
            //     data:this.state.data.set('items',res.response[0]) 
            // })
           if(this._isMounted) this.setState(params);
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
        const {items,defaultImg} = this.state;
        // const data =this.state.data.get('items');
        let content = null;        
        // 判断的两种写法。最外层必须包裹一个元素，否则会报错
        // if(items.id){
        //     content=<div><p className='name'>{items.title}</p>   
        //     <img className='pic' src={pic || defaultImg} />      
        //     <p>创建时间：{items.created_time}</p>   
        //     <p>类型：{items.type}</p></div>;
        // }else{
        //     content=<div className='no-data'>暂无相关数据</div>;
        // }
        return (
         <div className='view-newsDetail'>
            <Header title={'新闻详情'} showBack={'true'}></Header>
            <div className="c-content">
              { items.id ? (<div>
                  <p className='name'>{items.title}</p>
                  <img className='pic' src={items.image_urls.px_128x128 || defaultImg} />
                  <p>创建时间：<em className='c-gray'>{items.created_time}</em></p>
                  <p>类型：<em className='c-gray'>{items.type}</em></p>
                  <div>
                     {items.tags.map((n,i)=><span className='tag' key={i}>{n}</span>)}
                  </div>
                  </div>) : (<div className='no-data'>加载中...</div>)}           
            </div>
         </div>
        )
    }
}

module.exports = News;