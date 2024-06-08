import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import './QRcode.css'
import { QRCode } from './QRCode.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QRCode />
  </React.StrictMode>,
)
