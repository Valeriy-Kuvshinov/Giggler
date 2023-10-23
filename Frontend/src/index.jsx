import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ModalProvider } from './customHooks/ModalContext'
import { RootCmp } from './RootCmp'
import './assets/styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <ModalProvider>
        <RootCmp />
      </ModalProvider>
    </Router>
  </Provider>
)

