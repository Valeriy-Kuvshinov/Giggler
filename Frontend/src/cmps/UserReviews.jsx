import { useState, useEffect } from "react"

import { reviewService } from "../services/review.service"
import { UserReview } from "./UserReview"

export function UserReviews({ reviews }) {
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
          return { ...review, userName: user.username, imgUrl: user.imgUrl, country:user.country, country: user.country }
        })
      )
      setFullReviews(reviewsWithUser)
    }
    fetchFullReviews()
  }, [reviews])

  return (
    <section>
      <ul>
        {fullReviews.map((userReview) =>
          <li key={userReview._id}>
            <UserReview review={userReview} user={userReview} />
          </li>
        )}
      </ul>
    </section>
  )
}
