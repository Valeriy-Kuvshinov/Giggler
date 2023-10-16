import { useState } from 'react'
import starIcon from '../assets/img/svg/star.icon.svg'
import emptyStarIcon from '../assets/img/svg/empty.star.icon.svg'
import { reviewService } from '../services/review.service.js'

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
        const review = {
            userId: loggedInUser._id,
            gigId: gig._id,
            rating: reviewRating,
            text: reviewText
        }
        await reviewService.addReview(review)
        setReviewText('')
        setReviewRating(0)
        onReviewAdded(review)
    }

    return (
        <div className='review-addition'>
            <div className="stars-input flex row">
                {renderStarsInput()}
            </div>
            <input
                type='text'
                placeholder="good service"
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                className='text'
            />
            <button className='flex' onClick={submitReview}>Submit</button>
        </div>
    )
}