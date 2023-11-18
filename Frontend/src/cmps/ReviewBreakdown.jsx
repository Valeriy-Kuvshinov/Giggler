import SvgIcon from "./SvgIcon.jsx"

import { utilService } from "../services/util.service.js"

export function ReviewBreakdown({ reviews, context }) {
  const reviewCountText = `${reviews.length} reviews for this ${context === 'gig' ? 'Gig' : 'seller'}`

  const sumRatings = reviews.reduce((sum, review) => sum + review.rating, 0)
  let averageRating = (sumRatings / reviews.length).toFixed(1)

  const renderStars = () => {
    const fullStarsCount = Math.floor(averageRating)
    const isHalfStar = averageRating % 1 >= 0.25
    const stars = Array.from({ length: fullStarsCount }, (_, idx) => <SvgIcon key={idx} iconName="star" />)

    if (isHalfStar) stars.push(<SvgIcon key="half-star" iconName='halfStar' />)

    const emptyStarsCount = 5 - stars.length
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(<SvgIcon key={`empty-star-${i}`} iconName='emptyStar' />)
    }
    return stars
  }

  const renderStarStats = () => {
    return Array.from({ length: 5 }, (_, idx) => {
      const ratingValue = 5 - idx
      const count = reviews.filter(review => review.rating === ratingValue).length

      return (
        <div className={`stat-line flex ${!count ? 'no-count' : ''}`} key={utilService.makeId()}>
          <span className="rate-level flex">{ratingValue} Stars</span>
          <div className="counter">
            <span className="counter-meter" style={{ width: `${(100 * count / reviews.length)}%` }}></span>
          </div>
          <span className="rate-count">({count})</span>
        </div>
      )
    })
  }

  return (
    <section className="review-breakdown">
      <div className="review-count flex">
        <span>{reviewCountText}</span>
        <div className="stars flex">
          {renderStars()}
          <span>{averageRating}</span>
        </div>
      </div>
      <div className="breakdown-wrapper flex">
        <div className="star-counts">
          {renderStarStats()}
        </div>
        <div className="rating-breakdown flex column">
          <span className="title">Rating Breakdown</span>
          <div className="rating-stat flex">
            <span>Seller communication level</span>
            <div className="star flex">
              <SvgIcon iconName={'star'} />{averageRating}</div>
          </div>
          <div className="rating-stat flex">
            <span>Recommend to a friend</span>
            <div className="star flex">
              <SvgIcon iconName={'star'} />{averageRating}
            </div>
          </div>
          <div className="rating-stat flex">
            <span>Service as described</span>
            <div className="star flex">
              <SvgIcon iconName={'star'} />{averageRating}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}