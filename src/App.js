import './App.css';
import Headers from './headers/header.js'
import Content from './content/content.js'
import Voice from './voice/voice.js';
function App() {
  return (
    <div id="app">
      <Headers />
      <Content />
      <div id="progress"></div>
      <Voice />
    </div>
  )
}

export default App;
