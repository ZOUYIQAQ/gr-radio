import { useNavigate, useLocation } from "react-router-dom";
function Routers() {
    const location = useLocation()
    const  navigate = useNavigate()
    const jump = (path)=>{if (location.pathname !== path) navigate(path)}
    return {
        'home': ()=>jump('/homepage'),
        'setting': ()=>jump('/setting'),
        'collect': ()=>jump('/collect'),
        'playlist': ()=>jump('/playlist'),
        'news': ()=>jump('/news'),
        'comment': ()=>jump('/comment'),
    }
}
export default Routers;