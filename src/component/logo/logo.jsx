import React from 'react'
import logoImg from './logo.png'
import './logo.css'
class Logo extends React.Component{
    // constructor() {
    //
    // }
    render(){
        return (
            <div className="logo-content">
                <img src={logoImg} alt="123" />
            </div>
        )
    }
}

export default Logo
