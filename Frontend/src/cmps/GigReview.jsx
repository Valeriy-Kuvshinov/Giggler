import starIcon from '../assets/img/svg/star.icon.svg'
import halfStarIcon from '../assets/img/svg/half.star.icon.svg'
import emptyStarIcon from '../assets/img/svg/empty.star.icon.svg'

export function GigReview({ review }) {

    const dateOfReview = review.createdAt
    let timeDelay=(Date.now()-dateOfReview)/1000/60/60/24
    timeDelay=Math.floor(timeDelay)
    if(timeDelay>=7){
        if(timeDelay>=30){
            timeDelay=Math.floor(timeDelay/30)
            if(timeDelay===1){
                timeDelay=`${timeDelay} month ago`
            } else {
                timeDelay=`${timeDelay} months ago`
            }
        } else {
            timeDelay=Math.floor(timeDelay/7)
            if(timeDelay===1){
                timeDelay=`${timeDelay} week ago`
            } else {
                timeDelay=`${timeDelay} weeks ago`
            }
        }
    } else {
        if(timeDelay===1){
            timeDelay=`${timeDelay} day ago`
        } else {
            timeDelay=`${timeDelay} days ago`
        }
    }
    console.log(timeDelay)
    
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

    return (
        <section className="gig-review">
            <img src={review.imgUrl} alt={review.userName} />
            <div>
                <span>{review.userName}</span>
                <div className='review-details'>
                <div className="stars">
                    {renderStars()}
                    {review.rating}
                </div>
                <div className='divider'>|</div>
                <span>{timeDelay}</span>
                </div>
                <span>{review.text}</span>
            </div>
        </section>
    )
}