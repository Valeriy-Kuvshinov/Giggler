import { useState, useEffect } from 'react'

import { GigReview } from "./GigReview.jsx"
import { ReviewBreakdown } from './ReviewBreakdown.jsx'

import { userService } from '../services/user.service.js'
import { reviewService } from '../services/review.service.js'

export function GigReviews({ gig }) {
    const [fullReviews, setFullReviews] = useState([])

    useEffect(() => {
        fetchFullReviews()
    }, [gig])

    async function fetchFullReviews() {
        if (!gig || gig.reviews.length === 0) return

        const fetchedReviews = await Promise.all(
            gig.reviews.map(reviewId => reviewService.getById(reviewId))
        )
        const reviewsWithUser = await Promise.all(
            fetchedReviews.map(async review => {
                const user = await userService.getById(review.userId)
                return {
                    ...review,
                    userName: user.username,
                    imgUrl: user.imgUrl,
                    country: user.country,
                }
            })
        )
        setFullReviews(reviewsWithUser)
    }

    if(fullReviews.length===0) return <div></div>

    return (
        <section className="gig-reviews">
            <span className="title">Reviews</span>

            <ReviewBreakdown reviews={fullReviews} context='gig' />

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