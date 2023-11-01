import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { GigReview } from './GigReview.jsx'
import { userService } from '../services/user.service.js'
import { reviewService } from '../services/review.service.js'

import { ReviewSubmit } from './ReviewSubmit.jsx'
import { gigService } from '../services/gig.service.js'
import { ReviewBreakdown } from './ReviewBreakdown.jsx'

export function GigReviews({ gig }) {
  const [fullReviews, setFullReviews] = useState([])
  const reviews = useSelector((storeState) => storeState.reviewModule.reviews)
console.log('reviews from the store: ', reviews )

  const filteredReviews = reviews.filter((review) => {
    return gig.reviews.some((gigReview) => {
      return review._id === gigReview
    })
  })
  let reviewsWithUser 
  console.log('filteredReviews:', filteredReviews)



  useEffect(() => {
    fetchFullReviews()
    setFullReviews(reviewsWithUser)
  }, [reviews])

  async function fetchFullReviews() {
    reviewsWithUser = await Promise.all(
      filteredReviews.map(async (review) => {
        const user = await userService.getById(review.userId)
        return {
          ...review,
          userName: user.username,
          imgUrl: user.imgUrl,
          country: user.country,
        }
      })
    )
  }

  console.log('fullReviews: ',fullReviews)

  const handleReviewAdded = (newReview) => {
    setFullReviews((prevReviews) => [...prevReviews, newReview])
  }

  // console.log(fullReviews)

  return (
    <section className="gig-reviews">
      <span className="title">Reviews</span>

      <ReviewBreakdown reviews={reviews} />

      {/* {gig && loggedInUser && loggedInUser._id !== gig.ownerId && <ReviewSubmit loggedInUser={loggedInUser} gig={gig} onReviewAdded={handleReviewAdded} />} */}

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
