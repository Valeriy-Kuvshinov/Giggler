import { NavLink } from 'react-router-dom'
import SvgIcon from './SvgIcon'
import { MobileFilter } from './MobileFilter'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export function MobileFooter() {
  const [navState, setNavState] = useState('home')
  const [search, setSearch] = useState(false)

  const loggedinUser = useSelector((storeState) => storeState.userModule.user)

  function onOpenSearch() {
    setSearch((prevState) => !prevState)
  }
  return (
    <footer className="mobile-nav">
      <NavLink
        to="/"
        className={navState === 'home' ? 'selected' : ''}
        onClick={() => setNavState('home')}
      >
        <SvgIcon iconName="appHomeIcon" />
      </NavLink>
      <NavLink
        to={window.location.pathname}
        className={navState === 'chat' ? 'selected' : ''}
        onClick={() => setNavState('chat')}
      >
        <SvgIcon iconName="appEnvelopeIcon" />
      </NavLink>
      <NavLink
        to={window.location.pathname}
        className={navState === 'search' ? 'selected' : ''}
        onClick={(e) => {
          setNavState('search')
          onOpenSearch(e)
        }}
      >
        {search && <MobileFilter />}
        <SvgIcon iconName="appMagnifyingGlassIcon" />
      </NavLink>
      <NavLink
        to={window.location.pathname}
        className={navState === 'order' ? 'selected' : ''}
        onClick={() => setNavState('order')}
      >
        <SvgIcon iconName="appOrdersIcon" />
      </NavLink>
      <NavLink
        to={window.location.pathname}
        className={navState === 'profile' ? 'selected' : ''}
        onClick={() => setNavState('profile')}
      >
        <SvgIcon iconName="appProfileIcon" />
      </NavLink>
    </footer>
  )
}
