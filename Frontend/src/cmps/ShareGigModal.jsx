import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import SvgIcon from "./SvgIcon.jsx"

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
        <div className="modal-wrapper">
            <section className="share-gig-modal flex column" ref={modalRef}>
                <button className="close-modal" onClick={onClose}>×</button>

                <h2>Share This Gig</h2>
                <p>Spread the word about this Gig on Giggler</p>
                <ul className="flex row">
                    <li className="flex column">
                        <a className="flex column"
                            href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`} target="_blank" rel="noopener noreferrer">
                            <SvgIcon iconName={'shareFacebookIcon'} />
                            <span>Facebook</span>
                        </a>
                    </li>

                    <li className="flex column">
                        <a className="flex column"
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentURL}`} target="_blank" rel="noopener noreferrer">
                            <SvgIcon iconName={'shareLinkedinIcon'} />
                            <span>LinkedIn</span>
                        </a>
                    </li>

                    <li className="flex column">
                        <a className="flex column"
                            href={`https://twitter.com/intent/tweet?url=${currentURL}`} target="_blank" rel="noopener noreferrer">
                            <SvgIcon iconName={'shareTwitterIcon'} />
                            <span>Twitter</span>
                        </a>
                    </li>

                    <li className="flex column">
                        <a className="flex column"
                            href={`whatsapp://send?text=${currentURL}`} target="_blank" rel="noopener noreferrer">
                            <SvgIcon iconName={'shareWhatsappIcon'} />
                            <span>WhatsApp</span>
                        </a>
                    </li>

                    <li className="flex column" onClick={copyLink}>
                        <SvgIcon iconName={'shareLinkIcon'} />
                        <span style={isLinkCopied ? { color: 'green' } : {}}>{isLinkCopied ? "Link Copied!" : "Copy Link"}</span>
                    </li>
                </ul>
            </section>
        </div>
    )
}