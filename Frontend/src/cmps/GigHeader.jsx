import starIcon from '../assets/img/svg/star.icon.svg'
import houseIcon from '../assets/img/svg/home.icon.svg'

import { Link } from 'react-router-dom'

export function GigHeader({ gig, owner }) {

    return (
        <section style={{ overflow: 'hidden' }} className="gig-header">

            <h2>{gig.title}</h2>
            <div className="header">
                <img className='seller-picture' src={owner.imgUrl} alt="Seller Avatar" />
                <div className='user-stats'>
                <p>{owner.fullName}</p>

                <p className="stars">
                        <img src={starIcon} alt="star" />
                    {owner.rating}
                </p>
                </div>
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