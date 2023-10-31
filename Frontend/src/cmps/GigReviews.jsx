import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { GigReview } from "./GigReview.jsx"
import { userService } from '../services/user.service.js'
import { reviewService } from '../services/review.service.js'

import { ReviewSubmit } from './ReviewSubmit.jsx'
import { gigService } from '../services/gig.service.js'

export function GigReviews({ reviews, gig }) {
    const [fullReviews, setFullReviews] = useState([])
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        async function fetchFullReviews() {
            const fetchedReviews = await Promise.all(reviews.map(reviewId => reviewService.getById(reviewId)))
            const reviewsWithUser = await Promise.all(fetchedReviews.map(async review => {
                const user = await userService.getById(review.userId)
                return { ...review, userName: user.username, imgUrl: user.imgUrl, country: user.country }
            }))
            setFullReviews(reviewsWithUser)
        }
        fetchFullReviews()
    }, [reviews])

    const handleReviewAdded = (newReview) => {
        setFullReviews(prevReviews => [...prevReviews, newReview])
    }

    // console.log(fullReviews)

    return (
        <section className="gig-reviews">
            <span className="title">Reviews</span>
            {gig && loggedInUser && loggedInUser._id !== gig.ownerId && <ReviewSubmit loggedInUser={loggedInUser} gig={gig} onReviewAdded={handleReviewAdded} />}

            {fullReviews.length !== 0 && (
                <ul className="reviews">
                    {fullReviews.map((review) => (
                        <li key={review._id}>
                            <GigReview review={review} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}