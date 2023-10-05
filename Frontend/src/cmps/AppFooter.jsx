import { UserMsg } from './UserMsg.jsx'
import { galleryService } from '../services/gallery.service.js'

export function AppFooter() {
    const { socialMediaLinks } = galleryService

    return (
        <footer className="app-footer flex row full">
            <h1 className="logo">giggler</h1>
            <h2>© Giggler International Ltd. 2023</h2>
            <div className="social-icons flex row">
                {socialMediaLinks.map((link, idx) => (
                    <div key={idx} className="icon-container">
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <img src={link.img} className="social-icon" alt="Social Media Icon" />
                        </a>
                    </div>
                ))}
            </div>
            <UserMsg />
        </footer>
    )
}