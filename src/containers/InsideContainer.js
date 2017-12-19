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
        return <div className='inside-wrap'>                      
               {this.props.children}             
            </div>
    }
}
module.exports = app;
