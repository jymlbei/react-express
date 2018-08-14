import React from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadDate} from '../../redux/user.redux'

@withRouter
@connect(
    null,
    {loadDate}
)
class AuthRoute extends React.Component{
    // constructor() {
    //
    // }
    componentDidMount(){
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname
        if(publicList.indexOf(pathname)>-1){
            return null
        }
        axios.get('/user/info').then(res=>{
            if(res.status === 200){
                if(res.data.code === 0){
                    // console.log(res.data);
                    this.props.loadDate(res.data.data)
                }else{
                    this.props.history.push('/login')
                }
            }
        })
    }
    render(){
        return null
    }
}

export default AuthRoute
