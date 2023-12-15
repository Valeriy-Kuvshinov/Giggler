import { NavLink, Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useModal } from '../customHooks/ModalContext.jsx'
import { useDeviceType } from '../customHooks/DeviceTypeContext.jsx'

import { socialMediaLinks } from '../services/gallery.service.js'

import SvgIcon from './SvgIcon.jsx'

export function AppFooter({ position }) {
  const loggedinUser = useSelector((storeState) => storeState.userModule.user)
  const { openLogin } = useModal()
  const deviceType = useDeviceType()
  const isChatPage = useLocation().pathname.startsWith('/chat/')

  if (isChatPage && (deviceType === 'desktop'
    || deviceType === 'tablet')) return

  return deviceType === 'desktop' || deviceType === 'tablet' ? (
    <footer className={`desktop-footer flex full 
    ${position === 'fixed' ? 'fixed' : 'relative'}`}>
      <div className="footer-part flex">
        <h1>Giggler</h1>
        <h2>© Giggler International Ltd. 2023</h2>
      </div>

      <div className="footer-part flex">
        <div className="social-icons flex row">
          {socialMediaLinks.map((link, idx) => (
            <div key={idx} className="icon-container">
              <Link to="/about">
                <img src={link.img} alt="Social Media Icon" />
              </Link>
            </div>
          ))}
        </div>

        <div className="other-icons flex row">
          <div className="access-icon flex">
            <SvgIcon iconName="accessIcon" />
          </div>

          <Link to="/about" className="about-icon flex">
            <SvgIcon iconName="questionMarkIcon" />
          </Link>
        </div>
      </div>
    </footer>
  ) : (
    <footer className="mobile-footer grid">
      <NavLink to="/">
        <SvgIcon iconName="appHomeIcon" />
      </NavLink>

      <NavLink
        to={`chat/${loggedinUser?._id}`}
        onClick={(e) => {
          if (!loggedinUser) {
            e.preventDefault()
            openLogin()
          }
        }}
      >
        <SvgIcon iconName="appEnvelopeIcon" />
      </NavLink>

      <NavLink to="/explore">
        <SvgIcon iconName="appMagnifyingGlassIcon" />
      </NavLink>

      <NavLink
        to="orders"
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
