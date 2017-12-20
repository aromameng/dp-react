/*
 * @Author: meng 
 * @Date: 2017-12-20 19:41:59 
 */

import React from 'react';
import { Icon } from 'antd-mobile';
import {connect} from 'react-redux';
let loadingImg = require('../../assets/imgs/loading.gif')

class Loading extends React.Component {
    render() {
        let {loading}=this.props;
        let show = loading ? 'cp-warp-loading loading-show' : 'cp-warp-loading loading-hide';
        return <div className={show}>
            <Icon type='loading' />
        </div> 
    }   
}

function mapStateToProps(state){
	return {
		loading:state.global.get("loading")
	}
}

export default connect(mapStateToProps,null)(Loading);