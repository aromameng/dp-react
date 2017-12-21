/*
 * @Author: meng 
 * @Date: 2017-12-15 18:19:23 
 */

import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router'

import './style.scss'
class HomeLike extends React.Component{
    render() {
        const lists = this.props.lists
        const title = this.props.title
        
        return (
            <div className="index_for_you">
                <h2 className="index_like_title">{title}</h2>
                <div className="index_content clear-fix">
                    { lists.map((item,index) => {
                        return (
                            <Link to={'/proDetail/'+item.id} key={ index } className="index_content_item float-left">
                                <div className="pic">
                                     <img src={ item.img } alt={ item.shopName }/>
                                </div>
                                <div className="content">
                                    <div className="shop_name">{ item.shopName }</div>
                                    <div className="shop_name_sub">{item.dealGroupTitle}</div>
                                    <div className="item_price">
                                        <ins className="price">{item.dealgroupPrice}</ins>
                                        <div className="sale_desc">已售{item.sales}</div>
                                    </div>
                                </div>                            
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}

HomeLike.propTypes={
    lists:React.PropTypes.array.isRequired,
    title:React.PropTypes.string
}

export default HomeLike