/*
 * @Author: meng 
 * @Date: 2017-12-15 19:38:54 
 */

import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import Header from 'components/common/Header'
import Footer from 'components/common/Footer'
import Category from 'components/Category'
import HomeRecommend from 'components/HomeRecommend'
import HomeLike from 'components/HomeLike'
import LoadMore from 'components/common/LoadMore'
import Loading from 'components/common/Loading'

import { connect } from 'react-redux'
require('es6-promise').polyfill();
require('isomorphic-fetch');

import store from 'stores/store'
import action from 'actions/action'
import {getRecommendList,getLikeList} from 'actions/home'
import api from 'api/index'

import '../page.scss'

import { Button } from 'antd-mobile';

class Home extends Component {  
    componentWillMount() {
        
    }

    componentDidMount(){
        let page = Number(this.props.likeList.info.page)
        this.props.getRecommendList();
        this.props.getLikeList(page);
    }

    handleLoadMore() {
        let page = Number(this.props.likeList.info.page) + 1,
            isLastPage = this.props.likeList.info.isLastPage;
        if(isLastPage) return this.props.setListLoading(false);
        this.props.getLikeList(page);
    }

    render() {   
        let userName=this.props.userInfo && this.props.userInfo.name;
        let lists= this.props.recommendList;
        let likeList = this.props.likeList.data;
        return ( 
            <div className='view-home'>  
                <Header title={'首页'}></Header>
                <div className="c-content">
                    <Category></Category>                
                    {
                        lists.length 
                        ? <HomeRecommend lists={lists} title={'天天立减'}></HomeRecommend> 
                        : <div className="cp-loading">加载中</div>
                    }
                    {
                        likeList.length 
                        ? <HomeLike lists={likeList} title={'猜你喜欢'}></HomeLike>
                        : <div className="cp-loading">加载中</div>
                    }
                    <LoadMore loadMore={this.handleLoadMore.bind(this)} isLoadingMore={this.props.isLoading}></LoadMore>                  
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
        userInfo:state.global.get('userInfo'),
        recommendList:state.home.get('recommendList'),
        likeList:state.home.get('likeList'),
        isLoading:state.global.get('isLoading')
    }
}

// 定义mapDispatchToProps
function mapDispatchToProps(dispatch) {
    return {
        setUserInfo: (list) => dispatch(action.setUserInfo(list)),
        getRecommendList:() => dispatch(getRecommendList()),
        getLikeList:(page)=> dispatch(getLikeList(page)),
        setListLoading:(flag) => dispatch(action.setListLoading(flag))
    }
}

module.exports= connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)