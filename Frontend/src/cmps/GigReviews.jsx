import { useState, useEffect } from 'react'

import { GigReview } from "./GigReview.jsx"
import { ReviewBreakdown } from './ReviewBreakdown.jsx'

import { userService } from '../services/user.service.js'
import { reviewService } from '../services/review.service.js'
import { gigService } from '../services/gig.service.js'

export function GigReviews({ gig , userId}) {
    const [fullReviews, setFullReviews] = useState([])

    // console.log(gig)

    useEffect(() => {
        fetchFullReviews()
    }, [gig])
    
    async function fetchFullReviews() {
        // let gigsOfUser = await gigService.query()
        // gigsOfUser=gigsOfUser.filter(gig=>gig.ownerId===userId)
        // console.log(gigsOfUser)
        // let totalReviews=[]
        // gigsOfUser.map((gig)=>gig.reviews.map(review=>{
        //     const theReview=reviewService.getById(review)
        //     totalReviews.push(theReview)
        // }))
        // console.log(totalReviews)
        

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

    return (
        <section className="gig-reviews">
            <span className="title">Reviews</span>

            <ReviewBreakdown reviews={fullReviews} />

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


// const handleReviewAdded = (newReview) => {
//     setFullReviews((prevReviews) => [...prevReviews, newReview])
// }

// let isReviewedAlready = false
// fullReviews.forEach((review) => {
//     if (review.userId === loggedInUser._id) {
//         isReviewedAlready = true
//     }
// })

{/* {gig && loggedInUser && loggedInUser._id !== gig.ownerId && !isReviewedAlready && (
                <ReviewSubmit loggedInUser={loggedInUser} gig={gig} onReviewAdded={handleReviewAdded} />
            )} */}