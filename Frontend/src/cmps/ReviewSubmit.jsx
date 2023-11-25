import { useState, useRef, useEffect } from 'react'

import starIcon from '../assets/img/svg/star.icon.svg'
import emptyStarIcon from '../assets/img/svg/empty.star.icon.svg'

import { reviewService } from '../services/review.service.js'
import { userService } from '../services/user.service.js'
import { saveGig } from '../store/gig.actions.js'

export function ReviewSubmit({ loggedInUser, gig, onClose }) {
    const [reviewText, setReviewText] = useState('')
    const [reviewRating, setReviewRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [gigOwner, setGigOwner] = useState(null)

    const modalRef = useRef()

    function handleModalClick(event) {
        event.stopPropagation()
    }

    useEffect(() => {
        async function fetchGigOwner() {
            try {
                const ownerDetails = await userService.getById(gig.ownerId)
                setGigOwner(ownerDetails)
            } catch (err) {
                console.log('Error fetching gig owner details:', err)
            }
        }
        fetchGigOwner()
    }, [gig.ownerId])

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

    function handleStarHover(ratingValue) {
        setHoverRating(ratingValue)
    }

    function handleStarLeave() {
        setHoverRating(0)
    }

    function handleStarClick(ratingValue) {
        setReviewRating(ratingValue)
    }

    const submitReview = async () => {
        try {
            const review = {
                userId: loggedInUser._id,
                gigId: gig._id,
                sellerId: gig.ownerId,
                rating: reviewRating,
                text: reviewText,
                createdAt: Date.now()
            }
            const savedReview = await reviewService.save(review)
            // Update the gig with the new review ID
            gig.reviews.push(savedReview._id)
            await saveGig(gig)

            setReviewText('')
            setReviewRating(0)
        }
        catch (err) {
            console.log('Error while submitting the review:', err)
        }
    }

    function renderStarsInput() {
        const stars = []
        const effectiveRating = hoverRating || reviewRating

        for (let i = 1; i <= 5; i++) {
            if (i <= effectiveRating) {
                stars.push(<img src={starIcon} key={i} alt="star" onMouseEnter={() => handleStarHover(i)} onMouseLeave={handleStarLeave} onClick={() => handleStarClick(i)} />)
            } else {
                stars.push(<img src={emptyStarIcon} key={i} alt="empty star" onMouseEnter={() => handleStarHover(i)} onMouseLeave={handleStarLeave} onClick={() => handleStarClick(i)} />)
            }
        }
        return stars
    }

    return (
        <div className="modal-wrapper" onClick={handleModalClick}>
            <div className="review-modal flex column" ref={modalRef}>
                <button className="close-modal" onClick={onClose}>×</button>
                <div className="reviewed-gig grid">
                    <div className="title-user-info flex column">
                        <h3>{gig.title}</h3>
                        <h4 className='user-info flex row'>
                            By
                            <img src={gigOwner ? gigOwner.imgUrl : "gig-owner-img"} />
                            {gigOwner ? `@${gigOwner.username}` : "owner-username"}
                        </h4>
                    </div>
                    <img src={gig.imgUrls[0]} alt="gig-img" />
                </div>
                <div className="stars-input flex row">
                    {renderStarsInput()}
                </div>
                <textarea
                    type='text'
                    placeholder="Please describe your experience with the seller, was the final version of the product exactly as you wanted it to be?"
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                />
                <button className="submit" onClick={submitReview}>Submit</button>
            </div>
        </div>
    )
}