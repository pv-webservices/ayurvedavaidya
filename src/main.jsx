import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { LanguageProvider } from './i18n'
import './styles/base.css'
import './styles/layout.css'
import './styles/home.css'
import './styles/pages.css'

// Enables :active feedback on cards and buttons for iOS touch.
document.addEventListener('touchstart', () => {}, { passive: true })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider><App/></LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
)
