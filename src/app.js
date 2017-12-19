'use strict';
import 'core-js';
//css
import 'styles/reset.scss';
import 'styles/common.scss';

//vendors
import 'vendors/inobounce';

import React from "react";
import { render } from "react-dom";
import { Router, useRouterHistory,hashHistory } from 'react-router';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import "babel-polyfill";

import rootRouter from './router/router'; //导入路由

import store from './stores/store';

import 'antd-mobile/dist/antd-mobile.css';

import FastClick from "fastclick";

// 引入fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

//判断是不是iPhone
let ua = navigator.userAgent.toLowerCase();
window.isIphone = false;
window.isAndroid = false;

//iPhone
if (/iphone|ipad|ipod/.test(ua)) {
    window.isIphone = true;
}
//Android
if (/android/.test(ua)) {
    window.isAndroid = true;
}

window.SCFPHISTORY = useRouterHistory(createHashHistory)({ queryKey: false });

render(
        <Provider store={store}>
	    <Router history = { hashHistory } routes = { rootRouter } /></Provider>
, document.getElementById('view'));