/*
 * @Author: meng 
 * @Date: 2017-12-15 19:38:54 
 */

import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { connect } from 'react-redux'
require('es6-promise').polyfill();
require('isomorphic-fetch');

import Header from 'components/common/Header'
import Footer from 'components/common/Footer'
import Loading from 'components/common/Loading'
import ReactSwipe from 'react-swipe'

import store from 'stores/store'
import action from 'actions/action'
import api from 'api'

import { Button, List, Stepper } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import '../page.scss'

class Buy extends Component {  
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            num:1,
            
        };
    }
    componentWillMount() {
        
    }

    componentDidMount(){
        
    }

    handleNum(index){
        this.setState({
            num:index
        })
    }

    render() {   
        let num = this.state.num,
            price = '¥'+ (15.8*num).toFixed(2);

        return ( 
            <div className='view-pro-buy'>  
                <Header title={'提交订单'} showBack={'true'}></Header>
                <div className="c-content">          
                    <div className='pro-title'>東町日式料理東町日式料理单人餐<span className='num'>x{num}</span></div>         
                    <List className="price-list">
                        <Item extra={<Stepper style={{ width: '100%', minWidth: '100px' }} showNumber min='1' onChange={this.handleNum.bind(this)} size="small" defaultValue={num} />}><span className='price'>数量</span></Item>
                        <Item extra={price} align="top">小计</Item>
                    </List>      
                    <div className='mtop10'></div>           
                    <List>
                        <Item arrow="horizontal">现金券/抵用券/优惠码</Item>
                    </List>                    
                    <Footer></Footer> 
                    <Loading></Loading>
                </div>                       
            </div>               
        )
    }
}

// 定义mapStateToProps
function mapStateToProps(state) {
    return {
        userInfo:state.global.get('userInfo')
    }
}

// 定义mapDispatchToProps
function mapDispatchToProps(dispatch) {
    return {
        setUserInfo: (list) => dispatch(action.setUserInfo(list))
    }
}

module.exports= connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)