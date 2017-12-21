/*
 * @Author: meng 
 * @Date: 2017-12-15 17:19:23 
 */

import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router'

import './style.scss'
class HomeRecommend extends React.Component{
    render() {
        const lists = this.props.lists
        const title = this.props.title
        return (
            <div className="index_super_sale">
                <h2 className="index_title">{title}</h2>
                <div className="index_content clear-fix">
                    { lists.map((item,index) => {
                        return (
                            <Link to={'/proDetail/'+item.id} key={ index } className="index_content_item float-left">
                                <div className="index_cnt">
                                     <img src={ item.img } alt={ item.title }/>
                                </div>
                                <div className="title">{ item.title }</div>
                                <div className="price">
                                    <ins className="price_current">{item.price}</ins>
                                    <del className="price_old">{item.oldPrice}</del>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}

HomeRecommend.propTypes={
    lists:React.PropTypes.array.isRequired,
    title:React.PropTypes.string
}

export default HomeRecommend