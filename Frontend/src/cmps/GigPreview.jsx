import { Link } from 'react-router-dom'



export function GigPreview({ gig }) {
  return (
    <>
      <Link className="link-gig-img" to={`/gigdetails/${gig._id}`}>
        <img className="gig-preview-img" src={gig.imgUrls[0]} alt={`${gig.owner.fullName} gig img`} />
      </Link>
      <div className="preview-user-info">
        <img
          className="avatar"
          src={gig.owner.imgUrl}
          alt={`${gig.owner.fullName} gig avatar`}
        />
        <span className="full-name">{gig.owner.fullName}</span>
        <span className="level">{gig.owner.level}</span>
      </div>
      <div className="user-rating">
        <span className="rating-score">{`★${gig.owner.rate}`}</span>
      </div>
      <Link className="link-gig-details" to={`/gigdetails/${gig._id}`}>
        {gig.title}
      </Link>
      <span className="price">{`From $${gig.price}`}</span>
    </>
  )
}
