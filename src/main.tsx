import { registerSW } from 'virtual:pwa-register'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { loadTheme } from './utils/autoSettings.ts'
import './index.css'
import App from './App.tsx'

registerSW({ immediate: true })

loadTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
