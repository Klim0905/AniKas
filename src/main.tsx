import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { App } from './App'
import { storage } from './components'

const resultIMG = storage.getFileView(
  "67e373010024a7f60a5d",
  "67e3733a0005c20e6766"
)

createRoot(document.getElementById('root')!).render(

  <HashRouter>
    <link rel="icon" type="image" href={resultIMG} />
    <App />
  </HashRouter>
)

