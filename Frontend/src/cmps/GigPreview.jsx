import { Link } from 'react-router-dom'
import { UserPreview } from './UserPreview'

export function GigPreview({ gig }) {
  const is = 'explore'
  console.log('gig in explore: ', gig)
  console.log('ownerID in explore: ', gig.owner._id)
  if (gig === undefined) return
  const ownerId = gig.owner._id
  return (
    <>
      <Link className="link-gig-img" to={`/gig/${gig._id}`}>
        <img src={gig.imgUrls[0]} alt={`${gig.owner.fullName} gig img`} />
      </Link>
      <UserPreview is={is} ownerId={ownerId} gig={gig}>
        <Link className="gig-title" to={`/gig/${gig._id}`}>
          {gig.title}
        </Link>
        {/* {'tomi'} */}
      </UserPreview>

      <div className="gig-price-likes">
        <span className="price">{`From $${gig.price}`}</span>
      </div>
    </>
  )
}
