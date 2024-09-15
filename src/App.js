import './App.css';
import './tips/tips.css'
import Headers from './headers/header.js'
import Content from './content/content.js'
import Voice from './voice/voice.js';
import { HashRouter as Router } from 'react-router-dom';
import start from './player/wss.js'
import init_player from './player/player.js'
import init_mmg from './tips/tips.js'
import {img_load_callback} from './colour/colour.js'
import {init_row_count} from './content/collect/collect_vfx/collect_vfx.js'
import {updata_collect_data} from './content/collect/collect.js'
import {updata_album_data} from './content/album/album.js'
import {up_news_data} from './content/news/news.js'
import {up_review_data} from './content/review/review.js'
import {update_song_data} from './content/homepage/homepage.js'
import {init_show_song_data} from './content/homepage/homepage.js'
import {zero_star} from './content/homepage/star_vfx/star_vfx.js'
import {zero_love} from './content/homepage/love_vfx/love_vfx.js'
import check_updates from './check_updates/check_updates.js'
import cookieHeartbeat from './content/tools_list/login/cookie_heartbeat.js'
const appInitialized = window.electron.appInitialized
const onChangeMusicData = window.electron.onChangeMusicData
const onChangeCollecteData = window.electron.onChangeCollecteData
const onUpdateMusicAlbumId = window.electron.onUpdateMusicAlbumId
const onUpdataNewsData = window.electron.onUpdataNewsData
const onUpdataReviewData = window.electron.onUpdataReviewData
const saveData = window.electron.saveData
const is_playing_data_name = 'is_playing'
// 杂七杂八的初始化
appInitialized(start)
appInitialized(init_player)
appInitialized(saveData, is_playing_data_name, false)
appInitialized(init_mmg)
appInitialized(check_updates)
appInitialized(init_row_count)
appInitialized(init_show_song_data)
appInitialized(onChangeMusicData, img_load_callback)
appInitialized(onChangeMusicData, zero_star)
appInitialized(onChangeMusicData, zero_love)
appInitialized(onChangeMusicData, update_song_data)
appInitialized(onChangeCollecteData, updata_collect_data)
appInitialized(onUpdateMusicAlbumId, updata_album_data)
appInitialized(onUpdataNewsData, up_news_data)
appInitialized(onUpdataReviewData, up_review_data)
appInitialized(cookieHeartbeat)
function App() {
  return (
    <Router>
      <div id="app">
        <audio src='' crossOrigin='anonymous' id='gr_radio'></audio>
        <div id="background"></div>
        <Headers />
        <Content />
        <div id="progress"></div>
        <Voice />
      </div>
    </Router>
  )
}

export default App;
