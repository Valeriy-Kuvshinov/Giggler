import { useState } from 'react'

import starIcon from '../assets/img/svg/star.icon.svg'
import emptyStarIcon from '../assets/img/svg/empty.star.icon.svg'

import { reviewService } from '../services/review.service.js'
import { saveGig } from '../store/gig.actions.js'
import { loadReviews } from '../store/review.actions'

export function ReviewSubmit({ loggedInUser, gig, onReviewAdded }) {
    const [reviewText, setReviewText] = useState('')
    const [reviewRating, setReviewRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)

    const handleStarHover = (ratingValue) => {
        setHoverRating(ratingValue)
    }

    const handleStarLeave = () => {
        setHoverRating(0)
    }

    const handleStarClick = (ratingValue) => {
        setReviewRating(ratingValue)
    }

    const renderStarsInput = () => {
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

    const submitReview = async () => {
        try {
            const review = {
                userId: loggedInUser._id,
                gigId: gig._id,
                sellerId:gig.ownerId,
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
            onReviewAdded(savedReview)
            loadReviews()
        }
        catch (err) {
            console.log('Error while submitting the review:', err)
        }
    }

    return (
        <div className="review-addition">
            <div className="stars-input flex row">
                {renderStarsInput()}
            </div>
            <input
                type='text'
                placeholder="Enter your review"
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                className='text'
            />
            <button className="btn-contact" onClick={submitReview}>Submit</button> 
            
        </div>
    )
}