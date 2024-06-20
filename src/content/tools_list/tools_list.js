import './tools_list.css'
import Routers from '../route/route'
import {init_login_doc, init_user_btn} from './login/login_doc'
import React, { useEffect } from 'react';
// 选择对应功能函数
function choice_tool(id){
    let fuc = null
    const router = Routers()
    if (id === 'user') fuc = init_login_doc
    else if (id === 'radio') fuc = router.home
    else if (id === 'collect') fuc = router.collect
    else if (id === 'playlist') fuc = router.playlist
    else if (id === 'news') fuc = router.news
    else if (id === 'comment') fuc = router.comment
    else if (id === 'setting') fuc = router.setting
    else fuc = null
    return fuc
}
// 功能列表
function ToolList() {
    const tools_name = [
        { 'id': 'user', 'text': '未登录', 'key': 0 },
        { 'id': 'radio', 'text': '主页', 'key': 1 },
        { 'id': 'collect', 'text': '收藏', 'key': 2 },
        { 'id': 'playlist', 'text': '专辑', 'key': 3 },
        { 'id': 'news', 'text': '新闻', 'key': 4 },
        { 'id': 'comment', 'text': '评论', 'key': 5 },
        { 'id': 'setting', 'text': '设置', 'key': 6 }
    ]
    const tools = tools_name.map((tool) => {
        return <div onClick={choice_tool(tool['id'])} id={tool['id']} className="tool" key={tool['key']}>{tool.text}</div>
    })
    return tools
}
// 隐藏功能列表
function hidden_tools_list() {
    const tool_list = document.querySelector('#tool_list')
    const hidden_botten = document.querySelector('#hidden_tools_button_div>h2')
    if (tool_list.className.includes('hidder_tool_list')){
        tool_list.className = ''
        setTimeout(() => {hidden_botten.innerText = '<'}, 350)
    }
    else {
        tool_list.className = ' hidder_tool_list'
        setTimeout(() => {hidden_botten.innerText = '>'}, 350)
    }
}
function ToolModule() {
    useEffect(()=>{
        init_user_btn()
    }, [])
    return (
        <>
            <div id="tool_list" className=' hidder_tool_list'>
                <div id='tool_list_content'>
                    <ToolList />
                </div>
            </div>
            <div id="hidden_tools_button">
                <div id='hidden_tools_button_div' onClick={hidden_tools_list}>
                    <h2>{'>'}</h2>
                </div>
            </div>
        </>
    )
}
export default ToolModule