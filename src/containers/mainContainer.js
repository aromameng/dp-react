'use strict';
import React, { Component,PropTypes } from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';

class app extends React.Component {
    constructor() {
        super();      
    }
    componentWillMount() {       
        
    }
    render() {
        return <div className='view-wrapper'>
                    <div className='view-main'>
                        {this.props.children} 
                    </div>                                             
            </div>
    }
}
module.exports = app;
