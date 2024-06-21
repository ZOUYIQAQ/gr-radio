import './content.css'
import ToolModule from './tools_list/tools_list'
import Homepage from './homepage/homepage'
import React from "react";
import SettingsPage from './settings/settings'
import CollectPage from './collect/collect'
import AlbumPage from './album/album'
import NewsPage from './news/news'
import ReviewPage from './review/review'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CSSTransition, SwitchTransition, } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

// 内容
function Content() {
    const location = useLocation();
    return (
        <div id="content">
            <ToolModule />
                <CSSTransition key={location.key} classNames="fade" timeout={0}>
                    <Routes location={location}>
                        {/* 默认显示主页 */}
                        <Route index element={<Homepage />} />
                        {/* 播放主页 */}
                        <Route path="/homepage" element={<Homepage />} />
                        {/* 收藏页面 */}
                        <Route path="/collect" element={<CollectPage />} />
                        {/* 专辑页面 */}
                        <Route path="/playlist" element={<AlbumPage />} />
                        {/* 新闻页面 */}
                        <Route path="/news" element={<NewsPage />} />
                        {/* 评论页面 */}
                        <Route path="/comment" element={<ReviewPage />} />
                        {/* 设置页面 */}
                        <Route path="/setting" element={<SettingsPage />} />
                    </Routes>
                </CSSTransition>
            {/* <Homepage /> */}
        </div>
    )
}
export default Content