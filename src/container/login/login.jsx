import React from 'react';
import Logo from '../../component/logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'

@connect(
    state=>state.user,
    {login}
)
class Login extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            admin:'',
            password:'',
        }
        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
    }
    register(){
        this.props.history.push('/register')
    }
    handleChange(key,v){
        this.setState({
            [key]:v
        })
    }
    login(){
        this.props.login(this.state)
    }
    render(){
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect>:null}
                <Logo></Logo>
                <div>登录页</div>
                <WingBlank>
                    <List>
                        {this.props.msg ? <div className="error-msg">{this.props.msg}</div> : null}
                        <InputItem
                            onChange={v=>this.handleChange('admin',v)}
                            >用户名</InputItem>
                        <InputItem
                            onChange={v=>this.handleChange('password',v)}
                            type="password"
                            >密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.login}>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login
