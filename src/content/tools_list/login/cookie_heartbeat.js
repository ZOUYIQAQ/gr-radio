// cookie保活, 心跳函数. 具体原因不明, cookie需要定时请求收藏列表才能保持收藏音乐和评分正常
import get_data from '../../collect/requests_collect'
function cookieHeartbeat() {
    console.log('cookie心跳~噗通')
    return setInterval(get_data, 1000*60*10)
}
export default cookieHeartbeat;