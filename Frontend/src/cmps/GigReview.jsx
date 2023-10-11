import starIcon from '../assets/img/svg/star.icon.svg'

export function GigReview({ review }) {
    const fullStarsCount = Math.ceil(review.rating)

    return (
        <section className="gig-review">
            <span>{review.userName}</span>
            <div className="stars">
                {[...Array(fullStarsCount)].map((_, idx) => (
                    <img src={starIcon} key={idx} alt="star" />
                ))}
                {review.rating}
            </div>
            <span>{review.text}</span>
        </section>
    )
}