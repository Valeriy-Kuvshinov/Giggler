import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useModal } from '../../customHooks/ModalContext.jsx'

import { gigService } from '../../services/gig.service.js'

import { ShareGigModal } from '../ShareGigModal.jsx'
import SvgIcon from '../SvgIcon.jsx'

export function GigDetInteractions({ loggedInUser, gig, deviceType, onGigChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLiked, setIsLiked] = useState(
        loggedInUser && gig.likedByUsers.includes(loggedInUser._id)
    )
    const [headerStage, setHeaderStage] = useState(0)

    const { openLogin } = useModal()

    const headerStyles = {
        backgroundColor: headerStage === 0 ? 'transparent' : '#fff',
        position: headerStage === 0 ? 'absolute' : 'sticky',
        borderBottom: headerStage === 0 ? 'none' : '1px solid #dadbdd'
    }

    function likeGig() {
        if (!loggedInUser) {
            openLogin()
            return
        }
        const gigToSave = { ...gig }

        if (gigToSave.likedByUsers.includes(loggedInUser._id)) {
            gigToSave.likedByUsers = gigToSave.likedByUsers.filter(
                (liker) => liker !== loggedInUser._id)
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

    useEffect(() => {
        const handleScroll = () => {
            if (deviceType === 'mobile') {
                const newStage = window.scrollY < 100 ? 0 : 1
                setHeaderStage(newStage)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [deviceType])

    return (
        <>
            {deviceType === 'mobile' ? (
                <div className={`gig-interactions mobile flex ${headerStage === 0 ? 'stage-one' : 'stage-two'}`}
                    style={headerStyles}>
                    <Link to="/explore">
                        <SvgIcon iconName={'arrowDown'} />
                    </Link>
                    <div className="flex row">
                        <span className="heart" onClick={(e) => likeGig(e)} title='like the gig to show support'>
                            {isLiked ? (
                                <SvgIcon iconName={'heartLikedMobileIcon'} />
                            ) : (
                                <SvgIcon iconName={'heartEmptyMobileIcon'} />
                            )}
                        </span>
                        <button onClick={shareGig} className="share-gig flex" title="share the gig">
                            <SvgIcon iconName={'shareGigMobileIcon'} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="gig-interactions flex">
                    <span className="heart" onClick={(e) => likeGig(e)} title='like the gig to show support'>
                        {isLiked ? (
                            <SvgIcon iconName={'heartLikedDesktopIcon'} />
                        ) : (
                            <SvgIcon iconName={'heartEmptyDesktopIcon'} />
                        )}
                    </span>
                    <span className="liked-count flex">
                        {gig.likedByUsers.length}
                    </span>
                    <button onClick={shareGig} className="share-gig desktop flex" title="share the gig">
                        <SvgIcon iconName={'shareGigDesktopIcon'} />
                    </button>
                </div>
            )}
            {isModalOpen && <ShareGigModal onClose={closeModal} gigId={gig._id} />}
        </>
    )
}