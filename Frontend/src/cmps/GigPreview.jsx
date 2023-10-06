import { Link } from 'react-router-dom'
import { UserPreview } from './UserPreview'
import { removeGig } from '../store/gig.actions'
import { useNavigate } from 'react-router-dom'
import { ImageCarousel } from './ImageCarousel'
import SvgIcon from './SvgIcon'
import { useState } from 'react'

export function GigPreview({ is, gig }) {
  const [isLiked, setIsLiked] = useState(true)
  const navigate = useNavigate()
  const owner = gig.owner
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

  function onToggleHeart() {
    setIsLiked((prevIsLiked) => !prevIsLiked)
  }

  return (
    <>
      {/* <img src={gig.imgUrls[0]} alt={`${gig.owner.fullName} gig img`} /> */}
      <Link className="link-gig-img" to={`/gig/${gig._id}`}>
      <ImageCarousel images={gig.imgUrls} />
      </Link>
      {is === 'explore' && (
        <UserPreview is={is} owner={owner} gig={gig}>
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
          <button>
            <Link className="gig-title" to={`/gig/edit/${gig._id}`}>
              update
            </Link>
          </button>
          <button onClick={onRemoveGig}>remove</button>
        </>
      )}
      <div className="gig-price-likes">
        <span className="price b">{`From $${gig.price}`}</span>
        <span
          className={`${isLiked ? 'black' : ''}`}
          onClick={() => onToggleHeart()}
        >
          <SvgIcon iconName={'heart'} />
        </span>
      </div>
    </>
  )
}
