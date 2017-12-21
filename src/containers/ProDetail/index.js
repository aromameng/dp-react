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

import { Button, List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import '../page.scss'

class ProDetail extends Component {  
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            index: 0
        };
    }
    componentWillMount() {
        
    }

    componentDidMount(){
        
    }

    render() {   
        var options = {
            auto: 2000,
            callback: (index) => {
                this.setState({
                    index: index
                })
            }
        }
        const imgs = ['https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=e68d6822ab8b87d64f42ad1f37092860/eaf81a4c510fd9f982bb8f7a2f2dd42a2834a471.jpg',
        'https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=651c79baa3014c08063b2ea53a7b025b/359b033b5bb5c9ea99f6f7f0df39b6003af3b398.jpg',
        'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=5181fa4d71f40ad10ae4c1e3672d1151/d439b6003af33a87b2aacd6fcc5c10385243b584.jpg']
         let currIndex = this.state.index;

        return ( 
            <div>  
                <Header title={'团购详情'} showBack={'true'}></Header>
                <div className="c-content view-pro-detail">
                    <div className='swipe-wrap'>
                        <ReactSwipe swipeOptions={ options }>
                            {
                                imgs.map((item,index)=>{
                                    return (
                                        <div key={ index } className="carousel-item">
                                            <img src={item} />
                                            <div className='pro-title'>
                                                <h4>東町日式料理</h4>
                                                <p>仅售15.8元！最高价值28元的日式单人餐，提供免费WiFi。</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }                       
                        </ReactSwipe>                     
                        <span className='swipe-page'>{currIndex+1}/{imgs.length}</span>
                    </div>
                    <List className="price-list">
                        <Item><span className='price'>15.8</span><Link className='buy' to='/buy'>点击购买</Link></Item>
                        <Item className="tip">
                            <span className="tip-item">随时可退</span>
                            <span className="tip-item">过期自动退</span>
                        </Item>
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
)(ProDetail)