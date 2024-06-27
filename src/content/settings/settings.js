import './settings.css'
import React, { useEffect } from 'react';
import without_link_img from '../../assets/img/icons8-外部链接-100.png'
import check_updata_img from '../../assets/img/icons8-可用更新-100.png'
import auto_updata_img from '../../assets/img/icons8-删除-100.png'
const getData = window.electron.getData
const saveData = window.electron.saveData
const openLink = window.electron.openLink
const setting_list = [
    {
        'id': 'about',
        'ico_src': without_link_img,
        'text': '关于此应用',
        'right_doc': () => {

        },
        'onclick': () => {
            openLink('https://github.com/ZOUYIQAQ/gr-radio')
        }
    },
    {
        'id': 'check_update',
        'ico_src': check_updata_img,
        'text': '手动检查更新',
        'right_doc': () => {

        },
        'onclick': () => {
            window.tips('正在检查更新...')
        }
    },
    {
        'id': 'dont_check_update',
        'ico_src': auto_updata_img,
        'text': '自动检查更新',
        'right_doc': () => {
            return (
                <label className="switch_box">
                    <input id='update_switch' className='switch_input' type="checkbox" />
                    <span className='switch_slider' id='auto_up'></span>
                </label>
            )
        },
        'onclick': (e) => {
            const switch_slider = document.getElementById('auto_up')
            if (e.target.tagName === 'DIV') switch_slider.click()
            saveData('update_switch', !getData('update_switch', true))
        }
    },
    {
        'id': 'dont_direct_close',
        'ico_src': auto_updata_img,
        'text': '关闭时最小化到托盘',
        'right_doc': () => {
            return (
                <label className="switch_box">
                    <input id='update_switch' className='switch_input' type="checkbox" />
                    <span className='switch_slider' id='no_close'></span>
                </label>
            )
        },
        'onclick': (e) => {
            const switch_slider = document.getElementById('no_close')
            if (e.target.tagName === 'DIV') switch_slider.click()
            saveData('direct_close', !getData('direct_close', true))
        }
    },
]
// 生成设置列表
function SettingList() {
    return setting_list.map((item, index) => (
        <div className='setting_item' id={item.id} key={index} onClick={item.onclick}>
            <div className='left_box'>
                <img src={item.ico_src} alt='' className='setting_icon'></img>
                <div className='setting_text'>{item.text}</div>
            </div>
            <div className='reght_box'>
                {item.right_doc()}
            </div>
        </div>
    ))
}

// 设置页面
function SettingsPage() {
    // 页面初始化
    useEffect(() => {
        const update_switch = document.querySelector('#update_switch')
        getData('update_switch', true) && (update_switch.checked = true ) ||  (update_switch.checked = false)
    }, [])
    return (
        <div id='settings'>
            <div id='setting_list'>
                <SettingList />
            </div>
        </div>
    )
}
export default SettingsPage