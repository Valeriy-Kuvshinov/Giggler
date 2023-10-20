import shareFacebook from "../assets/img/svg/share.facebook.icon.svg"
import shareLinkedin from "../assets/img/svg/share.linkedin.icon.svg"
import shareTwitter from "../assets/img/svg/share.twitter.icon.svg"
import shareWhatsapp from "../assets/img/svg/share.whatsapp.icon.svg"
import shareLink from "../assets/img/svg/share.link.icon.svg"

import { useEffect, useRef } from 'react'

export function ShareGigModal({ onClose }) {
    const modalRef = useRef()

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])

    return (
        <div className="share-gig-modal-wrapper">
            <section className="share-gig-modal flex column" ref={modalRef}>
                <button onClick={onClose}>×</button>

                <h2>Share This Gig</h2>
                <p>Spread the word about this Gig on Giggler</p>
                <ul className="social-mediums flex row">
                    <li className="social-medium flex column">
                        <img src={shareFacebook} />
                        <span>Facebook</span>
                    </li>

                    <li className="social-medium flex column">
                        <img src={shareLinkedin} />
                        <span>LinkedIn</span>
                    </li>

                    <li className="social-medium flex column">
                        <img src={shareTwitter} />
                        <span>Twitter</span>
                    </li>

                    <li className="social-medium flex column">
                        <img src={shareWhatsapp} />
                        <span>WhatsApp</span>
                    </li>

                    <li className="social-medium flex column">
                        <img src={shareLink} />
                        <span>Copy Link</span>
                    </li>
                </ul>
            </section>
        </div>
    )
}