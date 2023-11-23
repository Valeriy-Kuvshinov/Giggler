
const Canada = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700746193/Giggler/country-flags/p1slleqaqcanpdbquzpw.png'
const Australia = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700746193/Giggler/country-flags/wdmi574witt06qrffwir.png'
const CzechRepublic = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700746193/Giggler/country-flags/iudkuang0fjwgl5kymfa.png'
const Austria = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700746193/Giggler/country-flags/iniqjkoklzrwtslwxcey.png'
const Germany = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700746193/Giggler/country-flags/lqhknlw5hhbtebzhvgkb.png'
const Hungary = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700746193/Giggler/country-flags/youcp3zqjhzwitvfscm2.png'
const India = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700746193/Giggler/country-flags/uysqvjkaziqwc6rdyywi.png'
const Netherlands = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700746194/Giggler/country-flags/smkrc5mpyxqxslywa3be.png'
const Norway = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700746194/Giggler/country-flags/ds8jaimhxxjdlzamelta.png'
const Poland = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700746194/Giggler/country-flags/atltmxuforz8abc5rtqm.png'
const Spain = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700746195/Giggler/country-flags/tpsbun2clh4p73pvbapy.png'
const Switzerland = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700746195/Giggler/country-flags/c8u3fqxsc95tjhymvv4u.png'
const Turkey = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700746195/Giggler/country-flags/yaycbbd7a0navywwmckb.png'
const UnitedKingdom = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700746195/Giggler/country-flags/n3xjqehalxfdyd6mj8ly.png'
const UnitedStates = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700746196/Giggler/country-flags/w9mwmbw4mg5ndzml6huf.png'
import SvgIcon from './SvgIcon.jsx'

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

        const stars = Array.from({ length: fullStarsCount }, (_, idx) => <SvgIcon key={idx} iconName="star" />)

        if (isHalfStar) stars.push(<SvgIcon key="half-star" iconName='halfStar' />)

        const emptyStarsCount = 5 - stars.length
        for (let i = 0; i < emptyStarsCount; i++) {
            stars.push(<SvgIcon key={`empty-star-${i}`} iconName='emptyStar' />)
        }
        return stars
    }
    // const renderStars = () => {
    //     const fullStarsCount = Math.floor(averageRating)
    //     const isHalfStar = averageRating % 1 >= 0.25
    //     const stars = Array.from({ length: fullStarsCount }, (_, idx) => <SvgIcon key={idx} iconName="star" />)

    //     if (isHalfStar) stars.push(<SvgIcon key="half-star" iconName='halfStar' />)

    //     const emptyStarsCount = 5 - stars.length
    //     for (let i = 0; i < emptyStarsCount; i++) {
    //       stars.push(<SvgIcon key={`empty-star-${i}`} iconName='emptyStar' />)
    //     }
    //     return stars
    //   }

    if (!review.country || !review.imgUrl) return

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