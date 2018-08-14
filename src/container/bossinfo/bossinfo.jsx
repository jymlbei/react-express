import React from 'react';
import {NavBar,TextareaItem,InputItem,Button} from 'antd-mobile'
import AvatorSelect from '../../component/avatorSelect/avatorSelect'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'

@connect(
    state=>state.user,
    {update}
)
class BossInfor extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            title:'',
            avator:'',
            money:'',
            company:'',
            desc:'',
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect&&redirect!==path ? <Redirect to={redirect}></Redirect> : null}
                <NavBar mode="dark">BOSS页面</NavBar>
                <AvatorSelect
                    selectAvator={(img)=>{
                        this.setState({
                            avator:img
                        })
                    }}></AvatorSelect>
                <InputItem onChange={(v)=>this.onChange('title',v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('money',v)}>
                    职位薪资
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('company',v)}>
                    公司名称
                </InputItem>
                <TextareaItem onChange={(v)=>this.onChange('desc',v)} rows={3} autoHeight title="职位要求">

                </TextareaItem>
                <Button type="primary"
                    onClick={()=>{
                        this.props.update(this.state)
                    }}>保存</Button>
            </div>
        )
    }
}

export default BossInfor
