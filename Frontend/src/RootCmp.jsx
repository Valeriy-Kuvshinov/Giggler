import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import routes from './routes.jsx'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

import { useModal } from './customHooks/ModalContext'

export function RootCmp() {
  const [footerPosition, setFooterPosition] = useState('fixed')

  const location = useLocation()
  const { isDimmed } = useModal()

  const dimmerStyle = {
    backgroundColor: isDimmed ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)',
    visibility: isDimmed ? 'visible' : 'hidden',
  }

  function updateFooterPosition() {
    const contentHeight = document.body.scrollHeight
    const viewportHeight = window.innerHeight
    setFooterPosition(contentHeight > viewportHeight ? 'relative' : 'fixed')
  }

  useEffect(() => {
    updateFooterPosition()
    window.addEventListener('resize', updateFooterPosition)
    return () => window.removeEventListener('resize', updateFooterPosition)
  }, [location])

  return (
    <main className="main-container">
      <AppHeader />
      <div className="dimmed-content" style={dimmerStyle}></div>
      <UserMsg />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component onFooterUpdate={updateFooterPosition} />}
          />
        ))}
      </Routes>
      <AppFooter position={footerPosition} />
    </main>
  )
}
