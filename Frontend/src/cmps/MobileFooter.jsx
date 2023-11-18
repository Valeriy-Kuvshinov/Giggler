import { NavLink } from 'react-router-dom'
import SvgIcon from './SvgIcon'
import { MobileFilter } from './MobileFilter'
import { useState } from 'react'

export function MobileFooter() {
  const [search, setSearch] = useState(false)

  const loggedinUser = useSelector((storeState) => storeState.userModule.user)

  function searchOn() {
    setSearch((prevState) => !prevState)
  }
  return (
    <footer className="mobile-nav">
      <NavLink
        to="/"
        exact="true"
        className={(navData) => (navData.isActive ? 'active' : '')}
      >
        <SvgIcon iconName="appHomeIcon" />
      </NavLink>
      <NavLink
        to="/messages"
        className={(navData) => (navData.isActive ? 'active' : '')}
      >
        <SvgIcon iconName="appEnvelopeIcon" />
      </NavLink>
      <NavLink
        to={window.location.pathname}
        className={(navData) => (navData.isActive ? 'active' : '')}
        onClick={() => openSearch()}
      >
        {searchOn && <MobileFilter />}
        <SvgIcon iconName="appMagnifyingGlassIcon" />
      </NavLink>
      <NavLink
        to="/orders"
        className={(navData) => (navData.isActive ? 'active' : '')}
      >
        <SvgIcon iconName="appOrdersIcon" />
      </NavLink>
      <NavLink
        to="/profile"
        className={(navData) => (navData.isActive ? 'active' : '')}
      >
        <SvgIcon iconName="appProfileIcon" />
      </NavLink>
    </footer>
  )
}
