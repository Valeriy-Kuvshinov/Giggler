import starIcon from '../assets/img/svg/star.icon.svg'

export function GigReview({ review }) {
    const renderStars = () => {
        const fullStarsCount = Math.ceil(review.rating);
        return [...Array(fullStarsCount)].map((_, idx) => (
            <img src={starIcon} key={idx} alt="star" />
        ));
    };

    return (
        <section className="gig-review">
            <img src={review.imgUrl} alt={review.userName} />
            <div>
                <span>{review.userName}</span>
                <div className="stars">
                    {renderStars()}
                    {review.rating}
                </div>
                <span>{review.text}</span>
            </div>
        </section>
    );
}