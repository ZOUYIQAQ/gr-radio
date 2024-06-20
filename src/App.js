import './App.css';
import './tips/tips.css'
import Headers from './headers/header.js'
import Content from './content/content.js'
import Voice from './voice/voice.js';
import { BrowserRouter as Router } from 'react-router-dom';
import start from './player/wss.js'
import init_player from './player/player.js'
import init_mmg from './tips/tips.js'
import {img_load_callback} from './colour/colour.js'
import {clear_love} from './content/homepage/love_vfx/love_vfx.js'
import {clear_star} from './content/homepage/star_vfx/star_vfx.js'
import {getDataFun} from './content/homepage/play_vfx/homepage_change.js'
import {init_row_count} from './content/collect/collect_vfx/collect_vfx.js'
import {updata_collect_data} from './content/collect/collect.js'
import {updata_album_data} from './content/album/album.js'
import {up_news_data} from './content/news/news.js'
import {up_review_data} from './content/review/review.js'
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
appInitialized(init_row_count)
appInitialized(onChangeMusicData, img_load_callback)
appInitialized(onChangeMusicData, clear_love)
appInitialized(clear_love)
appInitialized(onChangeMusicData, clear_star)
appInitialized(clear_star)
appInitialized(onChangeMusicData, getDataFun)
appInitialized(onChangeCollecteData, updata_collect_data)
appInitialized(onUpdateMusicAlbumId, updata_album_data)
appInitialized(onUpdataNewsData, up_news_data)
appInitialized(onUpdataReviewData, up_review_data)
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
