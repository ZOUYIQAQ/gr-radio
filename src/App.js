import './App.css';
import Headers from './headers/header.js'
import Content from './content/content.js'
import Voice from './voice/voice.js';
import { BrowserRouter as Router } from 'react-router-dom';
import start from './player/wss.js'
import init_player from './player/player.js'
const appInitialized = window.electron.appInitialized
const saveData = window.electron.saveData
const is_playing_data_name = 'is_playing'
appInitialized(start)
appInitialized(init_player)
appInitialized(saveData, is_playing_data_name, false)
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
