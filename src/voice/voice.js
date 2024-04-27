import './voice.css'
import init_voice_vfx from './voice_vfx/voice_vfx'
import init_voice from './voice_change'
import React, { useEffect } from 'react';
import up_time_progess from './time_change'
let i_time_num = 0
function Voice() {
    useEffect(()=>{
        init_voice_vfx()
        init_voice()
        clearInterval(i_time_num)
        i_time_num = up_time_progess()
    }, [])
    return (
        <div id="time">
            {/* <!-- 声音 --> */}
            <div id="voice_div">
                <input className="voice_input" type="range" min={0} max={100}></input>
                <img className="voice" src="./img/icons8-中等音量-50.png" alt=''></img>
            </div>
            {/* <!-- 具体时长 --> */}
            <p id='time_p'>3:30/ 4:20</p>
        </div>
    )
}

export default Voice