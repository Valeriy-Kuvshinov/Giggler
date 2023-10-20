import shareFacebook from "../assets/img/svg/share.facebook.icon.svg"
import shareLinkedin from "../assets/img/svg/share.linkedin.icon.svg"
import shareTwitter from "../assets/img/svg/share.twitter.icon.svg"
import shareWhatsapp from "../assets/img/svg/share.whatsapp.icon.svg"
import shareLink from "../assets/img/svg/share.link.icon.svg"

import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function ShareGigModal({ onClose }) {
    const modalRef = useRef()
    const location = useLocation()
    const [isLinkCopied, setIsLinkCopied] = useState(false)
    const currentURL = encodeURIComponent(window.location.origin + location.pathname)

    function copyLink() {
        navigator.clipboard.writeText(decodeURIComponent(currentURL)).then(() => {
            setIsLinkCopied(true)
            setTimeout(() => setIsLinkCopied(false), 4000)
    
            setTimeout(() => {
                onClose()
            }, 3000)
    
        }).catch(err => {
            console.error("Could not copy text: ", err)
        })
    }

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
                        <a className="flex column"
                            href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`} target="_blank" rel="noopener noreferrer">
                            <img src={shareFacebook} />
                            <span>Facebook</span>
                        </a>
                    </li>

                    <li className="social-medium flex column">
                        <a className="flex column"
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentURL}`} target="_blank" rel="noopener noreferrer">
                            <img src={shareLinkedin} />
                            <span>LinkedIn</span>
                        </a>
                    </li>

                    <li className="social-medium flex column">
                        <a className="flex column"
                            href={`https://twitter.com/intent/tweet?url=${currentURL}`} target="_blank" rel="noopener noreferrer">
                            <img src={shareTwitter} />
                            <span>Twitter</span>
                        </a>
                    </li>

                    <li className="social-medium flex column">
                        <a className="flex column"
                            href={`whatsapp://send?text=${currentURL}`} target="_blank" rel="noopener noreferrer">
                            <img src={shareWhatsapp} />
                            <span>WhatsApp</span>
                        </a>
                    </li>

                    <li className="social-medium flex column" onClick={copyLink}>
                        <img src={shareLink} />
                        <span style={isLinkCopied ? { color: 'green' } : {}}>{isLinkCopied ? "Link Copied!" : "Copy Link"}</span>
                    </li>
                </ul>
            </section>
        </div>
    )
}