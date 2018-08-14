import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// createStore接受reducer生成stote compose合并生成store其他数据 applyMiddleware接受thunk解决redux异步问题
// Provider负责传递store
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom' // react路由
// import Login from './container/login/login'
// import BossInfor from './container/bossinfo/bossinfo'
// import UserInfor from './container/userInfor/userInfor'
// import Register from './container/register/register'
import Bundle from './Bundle.js' // 分模块打包
import reducers from './reducer.js' // 合并所有的reducer，（管理工具）// 生成store
import AuthRoute from './component/authRoute/authRoute' // 中央管理路由，用于登录失效，或者未登录默认跳转页面
import './config' // ajax拦截，ajax配置均可
import 'antd-mobile/dist/antd-mobile.css'
import './index.less'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))
const BossInfor = (props) => (
    <Bundle load={() => import('./container/bossinfo/bossinfo')}>
        {(BossInfor) => <BossInfor {...props}/>}
    </Bundle>
);

const UserInfor = (props) => (
    <Bundle load={() => import('./container/userInfor/userInfor')}>
        {(UserInfor) => <UserInfor {...props}/>}
    </Bundle>
);
const Login = (props) => (
    <Bundle load={() => import('./container/login/login')}>
        {(Login) => <Login {...props}/>}
    </Bundle>
);
const Register = (props) => (
    <Bundle load={() => import('./container/register/register')}>
        {(Register) => <Register {...props}/>}
    </Bundle>
);

// function Test(){
//     return <div>Test</div>
// }
ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div id="app">
                {/* <div className="header">123</div> */}
                <AuthRoute></AuthRoute>
                {/* <Route path='/test' component={Test}></Route> */}
                <Switch>
                    <Route path='/bossInfo' component={BossInfor}></Route>
                    <Route path='/userInfo' component={UserInfor}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)
