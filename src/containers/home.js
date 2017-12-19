import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import './page.scss';
import Header from '../components/common/Header'
import img from '../assets/imgs/01.png'

import store from '../stores/store'

class Home extends Component {  
    componentWillMount() {
        
    }
    render() {   
        return ( 
            <div>  
                <Header title={'首页'}></Header>
                <div className="c-content view-home">
                    <ul className="home-menu">
                        <img className='logo' src={img} />
                        <div className='pic'></div>
                        <li><Link to={'/list'}>留言</Link></li>
                        <li><Link to={'/news'}>新闻列表</Link></li>
                    </ul>
                </div>            
            </div>               
        )
    }
}

module.exports = Home;