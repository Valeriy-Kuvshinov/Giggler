import { Link } from 'react-router-dom'
import { UserPreview } from './UserPreview'
import { removeGig } from '../store/gig.actions'
import { useNavigate } from 'react-router-dom'
export function GigPreview({ is, gig }) {
  const navigate = useNavigate()
  const ownerId = gig.owner._id
  // console.log('is', is)

  async function onRemoveGig() {
    try {
      await removeGig(gig._id)
      console.log('Gig removed successfully:')
      navigate('/profile')
    } catch (err) {
      console.error('Failed to save gig:', err)
    }
  }
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
        <>
          <Link className="gig-title" to={`/gig/${gig._id}`}>
            {gig.title}
          </Link>
          <button><Link className="gig-title" to={`/gig/edit/${gig._id}`}>update</Link></button>
          <button onClick={onRemoveGig}>remove</button>
        </>
      )}

      <div className="gig-price-likes">
        <span className="price">{`From $${gig.price}`}</span>
      </div>
    </>
  )
}
