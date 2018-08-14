import axios from 'axios'
import {getRedirectPath} from '../until'
const AUTHSUCCESS = 'AUTHSUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const USER_INFO = 'USER_INFO'

const initState = {
    redirectTo:'',
    msg:'',
    admin:'',
    // password:'',
    type:'',
}

export function user(state=initState,action){
    switch (action.type) {
        case AUTHSUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload,password:''}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case USER_INFO:
            return {...state,...action.payload}
        default:
            return state
    }
}

function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}

export function loadDate(userinfo){
    return { type:USER_INFO,payload:userinfo}
}

export function authSuccess(data){
    return { type:AUTHSUCCESS,payload:data}
}

export function update(date){
    return dispatch=>{
        axios.post('/user/update',date).then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}


export function login({admin,password}){
    if(!admin||!password){
        return errorMsg('用户名密码必输入')
    }
    return dispatch=>{
        axios.post('/user/login',{admin,password}).then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function regisger({admin,password,repeat,type}){
    if(!admin||!password||!type){
        return errorMsg('用户名密码必输入')
    }
    if(password!==repeat){
        return errorMsg('密码不一致')
    }
    return dispatch=>{
        axios.post('/user/register',{admin,password,type}).then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess({admin,password,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
