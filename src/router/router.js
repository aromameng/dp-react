import React from 'react';
import { Router, Route,IndexRoute,Redirect } from 'react-router';

console.log(Redirect)

const rootRouter = {
    path: '/',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../containers/InsideContainer'));
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
        path: 'news',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../containers/news'),'news');
            })
        }
    },{
        path: 'newsDetail/:id',
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../containers/newsDetail'),'newsDetail');
            })
        }
    },{
        path:'*',
        onEnter: (_, replace) => replace("/")
    }]
};

export default rootRouter;