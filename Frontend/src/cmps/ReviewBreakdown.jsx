import SvgIcon from "./SvgIcon"

export function ReviewBreakdown({ reviews }) {
  console.log(reviews)
  let sum = 0
  let averageRating = 0
  reviews.map((review) => (sum += review.rating))
  averageRating = sum / reviews.length
  if (parseInt(averageRating) === averageRating) {
    parseInt(averageRating)
  } else {
    averageRating = averageRating.toFixed(1)
  }
  if (reviews.length === 0) return

  const renderStars = () => {
    let fullStarsCount = Math.floor(averageRating)
    const isHalfStar = averageRating % 1 >= 0.5

    const stars = [...Array(fullStarsCount)].map((_, idx) => (
      <SvgIcon iconName="star" />
    ))

    if (isHalfStar) {
      stars.push(<SvgIcon iconName="half-star" />)
      fullStarsCount += 1
    }

    const emptyStarsCount = 5 - fullStarsCount
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(<SvgIcon iconName="emptystar" />)
    }
    return stars
  }
  let i=5
  const renderStarStats = () => {
    const stats = [...Array(5)].map((_, idx) => {
      i--
      let count=0
      reviews.map((review)=>{
        if(review.rating===i+1) count++
      })
      return <div className={`stat-line ${(!count)?'no-count':''}`}><span className="rate-level">{i+1} Stars </span>
      <div className={`counter ${i+1}`}><span></span></div><span>({count})</span></div>
    })

    return stats
  }

  return (
    <section className="review-breakdown">
      <div className="review-count">
        <span>{reviews.length} reviews for this Gig</span>
        <div className="stars">
          {renderStars()}
          <span className="rating">{averageRating}</span>
        </div>
      </div>
      <div className="breakdown-wrapper">
        <div className="star-counts">
          {renderStarStats()}
        </div>
      </div>
    </section>
  )
}
