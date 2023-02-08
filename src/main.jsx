import 'bootstrap'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './assets/scss/main.scss'
import { router } from './Router.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  // strict mode enables a hyper strict intellisense so no console.logs, no double mounting of components
  // <React.StrictMode>
  // NOTE router provivder says "hey router do your thing"
  <RouterProvider router={router} />
  // </React.StrictMode>
)