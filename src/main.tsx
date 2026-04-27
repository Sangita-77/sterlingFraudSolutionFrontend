import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import './i18n/config'
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter basename="/dev/sterlingFraudSolutionFrontend">
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)