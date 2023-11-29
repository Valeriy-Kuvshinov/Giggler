import { Routes, Route } from 'react-router'
import routes from './routes'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

import { useModal } from './customHooks/ModalContext'

export function RootCmp() {
  const { isDimmed } = useModal()

  const dimmerStyle = {
    backgroundColor: isDimmed ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)',
    visibility: isDimmed ? 'visible' : 'hidden',
  }

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
            element={<route.component />}
          />
        ))}
      </Routes>
      <AppFooter />
    </main>
  )
}
