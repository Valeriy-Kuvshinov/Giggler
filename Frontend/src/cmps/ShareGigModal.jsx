import { useState, useRef } from 'react'
import outsideClick from '../customHooks/outsideClick.js'

import SvgIcon from "./SvgIcon.jsx"

export function ShareGigModal({ onClose, gigId }) {
    const [isLinkCopied, setIsLinkCopied] = useState(false)
    const currentURL = `${window.location.origin}/gig/${gigId}`

    const modalRef = useRef()
    outsideClick(modalRef, onClose)

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(currentURL)
            setIsLinkCopied(true)

            setTimeout(() => setIsLinkCopied(false), 4000)
            setTimeout(() => onClose(), 3000)
        } catch (err) {
            console.error("Could not copy text: ", err)
        }
    }

    return (
        <div className="modal-wrapper">
            <section className="share-gig-modal flex column" ref={modalRef}>
                <button className="close-modal" onClick={onClose}>×</button>

                <h2>Share This Gig</h2>
                <p>Spread the word about this Gig on Giggler</p>
                <ul className="flex row">
                    <li className="flex column">
                        <a className="flex column"
                            href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`}
                            target="_blank" rel="noopener noreferrer" title='share gig on Facebook'>
                            <SvgIcon iconName={'shareFacebookIcon'} />
                            <span>Facebook</span>
                        </a>
                    </li>

                    <li className="flex column">
                        <a className="flex column"
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentURL}`}
                            target="_blank" rel="noopener noreferrer" title='share gig on LinkedIn'>
                            <SvgIcon iconName={'shareLinkedinIcon'} />
                            <span>LinkedIn</span>
                        </a>
                    </li>

                    <li className="flex column">
                        <a className="flex column"
                            href={`https://twitter.com/intent/tweet?url=${currentURL}`}
                            target="_blank" rel="noopener noreferrer" title='share gig on X'>
                            <SvgIcon iconName={'shareTwitterIcon'} />
                            <span>Twitter</span>
                        </a>
                    </li>

                    <li className="flex column">
                        <a className="flex column"
                            href={`whatsapp://send?text=${currentURL}`} target="_blank"
                            rel="noopener noreferrer" title='share gig on Whatsapp'>
                            <SvgIcon iconName={'shareWhatsappIcon'} />
                            <span>WhatsApp</span>
                        </a>
                    </li>

                    <li className="flex column" onClick={copyLink}>
                        <SvgIcon iconName={'shareLinkIcon'} />
                        <span style={isLinkCopied ? { color: 'green' } : {}} title='copy link'>
                            {isLinkCopied ? "Link Copied!" : "Copy Link"}
                        </span>
                    </li>
                </ul>
            </section>
        </div>
    )
}