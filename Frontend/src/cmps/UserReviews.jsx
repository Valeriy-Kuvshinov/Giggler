import { useState, useEffect } from "react"

import { UserReviewSubmit } from "./UserReviewSubmit"
import { ReviewSubmit } from "./ReviewSubmit"

import { reviewService } from "../services/review.service"
import { UserReview } from "./UserReview"

export function UserReviews({ user, reviews }) {
  // console.log(reviews)
  const [fullReviews, setFullReviews] = useState([])

  useEffect(() => {
    async function fetchFullReviews() {
      const fetchedReviews = await Promise.all(
        reviews.map((review) => reviewService.getById(review._id))
      )
      const reviewsWithUser = await Promise.all(
        fetchedReviews.map(async (review) => {
          const user = await userService.getById(review.userId)
          return { ...review, userName: user.username, imgUrl: user.imgUrl }
        })
      )
      setFullReviews(reviewsWithUser)
    }
    fetchFullReviews()
  }, [reviews])

  const handleReviewAdded = (newReview) => {
    setFullReviews((prevReviews) => [...prevReviews, newReview])
  }
  console.log(fullReviews)
  fullReviews.map(user => console.log('test'))

  return (
    <section>
      {/* <ReviewSubmit loggedInUser={user} onReviewAdded={handleReviewAdded} /> */}
      {
    //   (fullReviews.length !== 0) &&
    <ul>
        {fullReviews.map((userReview) => 
            <li key={userReview._id}>
                <UserReview review={userReview}/>
            </li>
        )}
    </ul>
        }
    </section>
  )
}
