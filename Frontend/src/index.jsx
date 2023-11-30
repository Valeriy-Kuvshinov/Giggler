import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ModalProvider } from './customHooks/ModalContext'
import { DeviceTypeProvider } from './customHooks/DeviceTypeContext'
import { RootCmp } from './RootCmp'
import './assets/styles/main.scss'
import ScrollToTop from './cmps/ScrollToTop'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <DeviceTypeProvider>
        <ModalProvider>
          <RootCmp />
        </ModalProvider>
      </DeviceTypeProvider>
      <ScrollToTop />
    </Router>
  </Provider>
)