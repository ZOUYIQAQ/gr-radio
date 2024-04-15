import './voice.css'
import init_voice_vfx from './voice_vfx/voice_vfx'
const appInitialized = window.electron.appInitialized
appInitialized(init_voice_vfx)
function Voice() {
    return (
        <div id="time">
            {/* <!-- 声音 --> */}
            <div id="voice_div">
                <input className="voice_input" type="range" min={0} max={100}></input>
                <img className="voice" src="./img/icons8-中等音量-50.png" alt=''></img>
            </div>
            {/* <!-- 具体时长 --> */}
            3:30/ 4:20
        </div>
    )
}

export default Voice