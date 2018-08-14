import React from 'react';
import {Grid,List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatorSelect extends React.Component {
    static propTypes = {
        selectAvator: PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state={}
    }
    render() {
        const dataList = 'nywPmnTAvTmLusPxHPSu,WXoqXTHrSnRcUwEaQgXJ,nywPmnTAvTmLusPxHPSu,nywPmnTAvTmLusPxHPSu,nywPmnTAvTmLusPxHPSu'
        .split(',').map(v=>({
            icon:`https://gw.alipayobjects.com/zos/rmsportal/${v}.png`,
            // text:v
        }))
        const header = this.state.icon ?　(<div>
                                            <span>已选择头像</span>
                                            <img src={this.state.icon} alt=''style={{width:20}}/></div>)
                                            : <div>头像选择</div>;
        return (
            <div>
                <List renderHeader={() => header}>
                    <Grid data={dataList} columnNum={5}
                        onClick={ele=>{
                            this.setState(ele)
                            this.props.selectAvator(ele.icon)
                        }}></Grid>
                </List>
            </div>
        );
    }
}

export default AvatorSelect
