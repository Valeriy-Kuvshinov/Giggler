import starIcon from '../assets/img/svg/star.icon.svg'
import houseIcon from '../assets/img/svg/home.icon.svg'

import { Link } from 'react-router-dom'

export function GigHeader({ gig, owner }) {
    const fullStarsCount = Math.ceil(owner.rating)

    return (
        <section style={{ overflow: 'hidden' }} className="gig-header">
            <div className='nav-header'>
                <Link to={'/'}>
                    <img src={houseIcon} />
                </Link>
                /
                <Link to={`/explore?cat=${gig.category}`}>
                    {gig.category}
                </Link>
                /
                <Link to={`/explore?cat=${gig.category}&${gig.tags[2]}`}>
                    {gig.tags[2]}
                </Link>
            </div>

            <h2>{gig.title}</h2>
            <div className="rating">
                <img className='seller-picture' src={owner.imgUrl} alt="Seller Avatar" />
                <p>{owner.fullName}</p>

                <p className="stars">
                    {[...Array(fullStarsCount)].map((_, idx) => (
                        <img src={starIcon} key={idx} alt="star" />
                    ))}
                    {owner.rating}
                </p>
            </div>
            <img src={gig.imgUrls[0]} alt="Main gig" />

            <div className='gig-images'>
                {gig.imgUrls.map((imgUrl, idx) => (
                    <img src={imgUrl} key={idx} alt={`Gig image ${idx}`} />
                ))}
            </div>
        </section>
    )
}