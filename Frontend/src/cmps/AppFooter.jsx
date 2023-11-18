import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SvgIcon from './SvgIcon.jsx'

import { galleryService } from '../services/gallery.service.js'

import { MobileFilter } from './MobileFilter.jsx'

export function AppFooter() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 480 ? true : false)
  const [navState, setNavState] = useState('home')
  const [search, setSearch] = useState(false)

  const loggedinUser = useSelector((storeState) => storeState.userModule.user)

  const { socialMediaLinks } = galleryService

  useEffect(() => {
    window.addEventListener('resize', updateFooter)
    updateFooter()
    return () => {
      window.removeEventListener('resize', updateFooter)
    }
  }, [])

  function updateFooter() {
    if (window.innerWidth <= 480) setIsMobile(true)
    else setIsMobile(false)
  }

  function onOpenSearch() {
    setSearch((prevState) => !prevState)
  }

  return !isMobile ? (
    <footer className="desktop-footer flex full">
      <div className="footer-part flex">
        <h1 className="logo">Giggler</h1>
        <h2>© Giggler International Ltd. 2023</h2>
      </div>

      <div className="footer-part flex">
        <div className="social-icons flex row">
          {socialMediaLinks.map((link, idx) => (
            <div key={idx} className="icon-container">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <img src={link.img} alt="Social Media Icon" />
              </a>
            </div>
          ))}
        </div>

        <div className="access-icon flex">
          <SvgIcon iconName='accessIcon' />
        </div>
      </div>
    </footer>
  ) : (
    <footer className="mobile-footer grid">
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