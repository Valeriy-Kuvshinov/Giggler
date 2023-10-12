import starIcon from '../assets/img/svg/star.icon.svg'

export function GigHeader({ gig, owner }) {
    const fullStarsCount = Math.ceil(owner.rating)

    return (
        <section style={{ overflow: 'hidden' }} className="gig-header">
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