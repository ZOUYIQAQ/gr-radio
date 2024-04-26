import './App.css';
import Headers from './headers/header.js'
import Content from './content/content.js'
import Voice from './voice/voice.js';
import { BrowserRouter as Router } from 'react-router-dom';
import start from './player/wss.js'
const appInitialized = window.electron.appInitialized
appInitialized(start)
function App() {
  return (
    <Router>
      <div id="app">
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
