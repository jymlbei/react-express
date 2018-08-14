

export function getRedirectPath({type,avator}) {
    // 根据用户信息跳转地址
    let url = (type === 'boss') ? '/bossInfo':'/userInfo'
    if(avator){
        url = (type === 'boss') ? '/boss':'/user'
    }
    return url
}
