import starIcon from '../assets/img/svg/star.icon.svg'
import halfStarIcon from '../assets/img/svg/half.star.icon.svg'
import emptyStarIcon from '../assets/img/svg/empty.star.icon.svg'

import Australia from '../assets/img/countryFlags/Australia.png'
import Austria from '../assets/img/countryFlags/Austria.png'
import Canada from '../assets/img/countryFlags/Canada.png'
import CzechRepublic from '../assets/img/countryFlags/CzechRepublic.png'
import Germany from '../assets/img/countryFlags/Germany.png'
import Hungary from '../assets/img/countryFlags/Hungary.png'
import India from '../assets/img/countryFlags/India.png'
import Netherlands from '../assets/img/countryFlags/Netherlands.png'
import Norway from '../assets/img/countryFlags/Norway.png'
import Poland from '../assets/img/countryFlags/Poland.png'
import Spain from '../assets/img/countryFlags/Spain.png'
import Switzerland from '../assets/img/countryFlags/Switzerland.png'
import Turkey from '../assets/img/countryFlags/Turkey.png'
import UnitedKingdom from '../assets/img/countryFlags/UnitedKingdom.png'
import UnitedStates from '../assets/img/countryFlags/UnitedStates.png'

export function GigReview({ review }) {
    const flags = {
        Australia, Austria, Canada, CzechRepublic,
        Germany, India, Netherlands, Norway, Poland,
        Spain, Switzerland, Turkey, UnitedKingdom, UnitedStates, Hungary
    }
    
    const dateOfReview = review.createdAt
    let timeDelay = (Date.now() - dateOfReview) / 1000 / 60 / 60 / 24
    timeDelay = Math.floor(timeDelay)
    if (timeDelay >= 7) {
        if (timeDelay >= 30) {
            timeDelay = Math.floor(timeDelay / 30)
            if (timeDelay === 1) {
                timeDelay = `${timeDelay} month ago`
            } else {
                timeDelay = `${timeDelay} months ago`
            }
        } else {
            timeDelay = Math.floor(timeDelay / 7)
            if (timeDelay === 1) {
                timeDelay = `${timeDelay} week ago`
            } else {
                timeDelay = `${timeDelay} weeks ago`
            }
        }
    } else {
        if (timeDelay === 1) {
            timeDelay = `${timeDelay} day ago`
        } else {
            timeDelay = `${timeDelay} days ago`
        }
    }

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
    if(!review.country || !review.imgUrl)return

    return (
        <section className="gig-review" key={review._id}>
            <img src={review.imgUrl} alt={review.userName} className='pfp' />
            <div>
                <span className='username'>{review.userName}</span>
                <div className='country'>
                    <img src={flags[review.country.replace(' ', '')]} />
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