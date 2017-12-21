import React from 'react';
import { Router, Route,IndexRoute,Redirect } from 'react-router';

console.log(Redirect)

const rootRouter = {
    path: '/',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/mainContainer'));
        })
    },
    indexRoute: {
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../containers/Home/index'))
            }, 'home')
        }
    },
    childRoutes: [{
        path: 'proDetail/:id',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../containers/ProDetail/index'),'proDetail');
            })
        }
    },{
        path: 'buy',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../containers/ProDetail/buy'),'buy');
            })
        }
    },{
        path: 'news',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../containers/News/news'),'news');
            })
        }
    },{
        path: 'newsDetail/:id',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../containers/News/newsDetail'),'newsDetail');
            })
        }
    },{
        path: 'form',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../containers/Form/index'),'form');
            })
        }
    },{
        path:'*',
        onEnter: (_, replace) => replace("/")
    }]
};

export default rootRouter;