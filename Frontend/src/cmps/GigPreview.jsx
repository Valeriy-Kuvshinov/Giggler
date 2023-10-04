import { Link } from 'react-router-dom'
import { UserPreview } from './UserPreview'

export function GigPreview({is, gig }) {

  const ownerId = gig.owner._id
  console.log('gig.owner._id', ownerId);
  return (
    <>
      <Link className="link-gig-img" to={`/gig/${gig._id}`}>
        <img src={gig.imgUrls[0]} alt={`${gig.owner.fullName} gig img`} />
      </Link>
      {is === 'explore' && (
        <UserPreview is={is} ownerId={ownerId} gig={gig}>
          <Link className="gig-title" to={`/gig/${gig._id}`}>
            {gig.title}
          </Link>
        </UserPreview>
      )}
      {is === 'userProfile' && (
        <Link className="gig-title" to={`/gig/${gig._id}`}>
          {gig.title}
        </Link>
      )}

      <div className="gig-price-likes">
        <span className="price">{`From $${gig.price}`}</span>
      </div>
    </>
  )
}
