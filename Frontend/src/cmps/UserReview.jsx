import starIcon from '../assets/img/svg/star.icon.svg'
import halfStarIcon from '../assets/img/svg/half.star.icon.svg'
import emptyStarIcon from '../assets/img/svg/empty.star.icon.svg'

export function UserReview({ user, review }) {
    const renderStars = () => {
        let fullStarsCount = Math.floor(review.rating)
        const isHalfStar = review.rating % 1 >= 0.5

        const stars = [...Array(fullStarsCount)].map((_, idx) => (
            <img src={starIcon} key={idx} alt="star" />
        ))

        if (isHalfStar) {
            stars.push(<img src={halfStarIcon} key="half-star" alt="half star" />)
            fullStarsCount += 1
        }

        const emptyStarsCount = 5 - fullStarsCount
        for (let i = 0; i < emptyStarsCount; i++) {
            stars.push(<img src={emptyStarIcon} key={`empty-${i}`} alt="empty star" />)
        }
        return stars
    }
    return (<section className="user-review">
        <img src={review.imgUrl} alt={review.userName} />
        <div>
            <span>{user.userName}</span>
            <span>{user.country}</span>
            <div className="stars3">
                {renderStars()}
                {review.rating}
            </div>
            <span>{review.text}</span>
        </div>
    </section>)
}