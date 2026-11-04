import React from 'react'
import ReactDOM from 'react-dom/client'
import { init } from '@tma.js/sdk'
import App from './App'
import './styles.css'

try {
  init()
  window.Telegram?.WebApp?.ready()
  window.Telegram?.WebApp?.expand()
} catch {
  // The app also runs in a regular browser during local development.
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
)

declare global {
  interface Window { Telegram?: { WebApp?: { ready: () => void; expand: () => void; close?: () => void } } }
}

