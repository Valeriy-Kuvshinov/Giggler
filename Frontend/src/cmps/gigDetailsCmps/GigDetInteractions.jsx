import { useModal } from '../../customHooks/ModalContext.jsx'
import { useState, useEffect } from 'react'

import { gigService } from '../../services/gig.service.js'

import { ShareGigModal } from '../ShareGigModal.jsx'
import SvgIcon from '../SvgIcon.jsx'

export function GigDetInteractions({ loggedInUser, gig, deviceType, onGigChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLiked, setIsLiked] = useState(
        loggedInUser && gig.likedByUsers.includes(loggedInUser._id)
    )
    const { openLogin } = useModal()

    function likeGig() {
        if (!loggedInUser) {
            openLogin()
            return
        }
        const gigToSave = { ...gig }

        if (gigToSave.likedByUsers.includes(loggedInUser._id)) {
            gigToSave.likedByUsers = gigToSave.likedByUsers.filter(
                (liker) => liker !== loggedInUser._id
            )
            setIsLiked(false)

            gigService.save(gigToSave).then(() => {
                onGigChange(gigToSave)
            })
        } else {
            gigToSave.likedByUsers.push(loggedInUser._id)

            setIsLiked(true)

            gigService.save(gigToSave).then(() => {
                onGigChange(gigToSave)
            })
        }
    }

    function shareGig() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    useEffect(() => {
        setIsLiked(loggedInUser && gig.likedByUsers.includes(loggedInUser._id))
    }, [loggedInUser, gig])

    return (
        <div className="gig-interactions flex">
            <span className="heart" onClick={(e) => likeGig(e)}>
                {isLiked ? (
                    <SvgIcon iconName={'heartLiked'} />
                ) : (
                    <SvgIcon iconName={'heart'} />
                )}
            </span>
            <span className="liked-count flex">
                {gig.likedByUsers.length}
            </span>
            <button onClick={shareGig} className="share-gig flex" title="share the gig">
                <SvgIcon iconName={'shareSocialMediaIcon'} />
            </button>
            {isModalOpen && <ShareGigModal onClose={closeModal} />}
        </div>
    )
}