import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useModal } from '../customHooks/ModalContext.jsx'
import SvgIcon from './SvgIcon.jsx'

import { galleryService } from '../services/gallery.service.js'

import { MobileFilter } from './MobileFilter.jsx'

export function AppFooter() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 480 ? true : false)
  const [search, setSearch] = useState(false)

  const loggedinUser = useSelector((storeState) => storeState.userModule.user)

  const { openLogin } = useModal()

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
      >
        <SvgIcon iconName="appHomeIcon" />
      </NavLink>

      <NavLink
        to='inbox'
        onClick={(e) => {
          if (!loggedinUser) {
            e.preventDefault()
            openLogin()
          } 
        }}
      >
        <SvgIcon iconName="appEnvelopeIcon" />
      </NavLink>

      <NavLink
        to='/explore'
        onClick={(e) => {
          onOpenSearch(e)
        }}
      >
        {search && <MobileFilter />}
        <SvgIcon iconName="appMagnifyingGlassIcon" />
      </NavLink>

      <NavLink
        to='orders'
        onClick={(e) => {
          if (!loggedinUser) {
            e.preventDefault()
            openLogin()
          } 
        }}
      >
        <SvgIcon iconName="appOrdersIcon" />
      </NavLink>

      <NavLink
        to={loggedinUser ? `/user/${loggedinUser._id}` : '/void'}
        onClick={(e) => {
          if (!loggedinUser) {
            e.preventDefault()
            openLogin()
          } 
        }}
      >
        <SvgIcon iconName="appProfileIcon" />
      </NavLink>
    </footer>
  )
}