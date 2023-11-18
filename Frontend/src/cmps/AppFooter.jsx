import { useEffect, useState } from 'react'
import { galleryService } from '../services/gallery.service.js'
import { MobileFooter } from './MobileFooter.jsx'
import SvgIcon from './SvgIcon.jsx'

export function AppFooter() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 480 ? true
      : false
  )
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

  return !isMobile ? (
    <footer className="app-footer flex full">
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
          <SvgIcon iconName={'accessIcon'} />
        </div>
      </div>
    </footer>
  ) : (
    <MobileFooter />
  )
}
