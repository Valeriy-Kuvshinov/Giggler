import { useState, useEffect } from 'react'

import { GigReview } from "./GigReview.jsx"
import { ReviewBreakdown } from './ReviewBreakdown.jsx'

import { userService } from '../services/user.service.js'
import { reviewService } from '../services/review.service.js'

export function UserReviews({ gigs }) {
    const [allFullReviews, setAllFullReviews] = useState([])

    useEffect(() => {
        fetchAllFullReviews()
    }, [gigs])

    async function fetchAllFullReviews() {
        let reviewsWithUser = []

        for (const gig of gigs) {
            if (gig.reviews.length === 0) continue

            const fetchedReviews = await Promise.all(
                gig.reviews.map(reviewId => reviewService.getById(reviewId))
            )
            const ReviewsWithUser = await Promise.all(
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
            reviewsWithUser = [...reviewsWithUser, ...ReviewsWithUser]
        }
        setAllFullReviews(reviewsWithUser)
    }
    if(allFullReviews.length===0) return <div></div>

    return (
        <section className="user-reviews">
            <ReviewBreakdown reviews={allFullReviews} context='user' />

            <ul className="reviews">
                {allFullReviews.map((review) => (
                    <li key={review._id}>
                        <GigReview review={review} />
                    </li>
                ))}
            </ul>
        </section>
    )
}