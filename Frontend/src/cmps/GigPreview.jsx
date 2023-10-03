import { Link } from 'react-router-dom'


export function GigPreview({ gig }) {
  return (
    <article className="gig-article">
      <Link className="link-gig-img" to={`/gig/${gig._id}`}>
        <img src={gig.imgUrls[0]} alt={`${gig.owner.fullName} gig img`} />
      </Link>
      <div className="preview-userinfo">
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
      <Link className="link-gig-details" to={`/gig/${gig._id}`}>
        {gig.title}
      </Link>
      <span className="price">{`From $${gig.price}`}</span>
    </article>
  )
}
