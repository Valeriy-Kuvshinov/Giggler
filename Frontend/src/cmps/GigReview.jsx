import { flagImages } from '../services/gallery.service.js'
import SvgIcon from './SvgIcon.jsx'

export function GigReview({ review }) {
    const dateOfReview = review.createdAt

    let timeDelay = (Date.now() - dateOfReview) / 1000 / 60 / 60 / 24
    timeDelay = Math.floor(timeDelay)
    if (timeDelay >= 7) {
        if (timeDelay >= 30) {
            timeDelay = Math.floor(timeDelay / 30)
            if (timeDelay === 1) timeDelay = `${timeDelay} month ago`
            else timeDelay = `${timeDelay} months ago`
        }
        else {
            timeDelay = Math.floor(timeDelay / 7)
            if (timeDelay === 1) timeDelay = `${timeDelay} week ago`
            else timeDelay = `${timeDelay} weeks ago`
        }
    }
    else {
        if (timeDelay === 1) timeDelay = `${timeDelay} day ago`
        else timeDelay = `${timeDelay} days ago`
    }

    const renderStars = () => {
        let fullStarsCount = Math.floor(review.rating)
        const isHalfStar = review.rating % 1 >= 0.5

        const stars = Array.from(
            { length: fullStarsCount },
            (_, idx) => <SvgIcon key={idx} iconName="star" />
        )
        if (isHalfStar) stars.push(<SvgIcon key="half-star" iconName='halfStar' />)

        const emptyStarsCount = 5 - stars.length
        for (let i = 0; i < emptyStarsCount; i++) {
            stars.push(<SvgIcon key={`empty-star-${i}`} iconName='emptyStar' />)
        }
        return stars
    }
    
    if (!review.country || !review.imgUrl) return

    return (
        <section className="gig-review" key={review._id}>
            <img src={review.imgUrl} alt={review.userName} className='pfp' />
            <div>
                <span className='username'>{review.userName}</span>
                <div className='country'>
                    <img src={flagImages[review.country.replace(' ', '')]} />
                    <span>{review.country}</span>
                </div>
                <div className='review-details'>
                    <div className="stars">
                        {renderStars()}
                        <span className='rating'>{review.rating}</span>
                    </div>
                    <div className='divider'>|</div>
                    <span className='time-ago'>{timeDelay}</span>
                </div>
                <span className='comment'>{review.text}</span>
            </div>
        </section>
    )
}