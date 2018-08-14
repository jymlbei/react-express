import React from 'react'
import Logo from '../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {regisger} from '../../redux/user.redux'

@connect(
    state=>state.user,
    {regisger}
)
class Register extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            admin:'',
            password:'',
            repeat:'',
            type:''
        }
        this.addregister = this.addregister.bind(this)
    }
    addregister(){
        this.props.regisger(this.state)
    }
    handleChange(key,v){
        this.setState({
            [key]:v
        })
    }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect>:null}
                <Logo></Logo>
                <div>注册页</div>
                <List>
                    {this.props.msg ? <div className="error-msg">{this.props.msg}</div> : null}
                    <InputItem onChange={v=>this.handleChange('admin',v)}>用户名</InputItem>
                    <WhiteSpace />
                    <InputItem type="password" onChange={v=>this.handleChange('password',v)}>密码</InputItem>
                    <WhiteSpace />
                    <InputItem type="password" onChange={v=>this.handleChange('repeat',v)}>确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem checked={this.state.type === 'user'}
                        onChange={()=>this.handleChange('type','user')}>牛人</RadioItem>
                    <WhiteSpace />
                    <RadioItem checked={this.state.type === 'boss'}
                        onChange={()=>this.handleChange('type','boss')}>BOSS</RadioItem>
                    <Button type="primary" onClick={this.addregister}>注册</Button>
                </List>
            </div>
        )
    }
}

export default Register
