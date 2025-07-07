import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
   <Toaster
  position="bottom-right"
  toastOptions={{
    style: {
      padding: "12px 16px",
      fontSize: "15px",
    },
    duration: 5000,
  }}
/>

  </StrictMode>,
)
