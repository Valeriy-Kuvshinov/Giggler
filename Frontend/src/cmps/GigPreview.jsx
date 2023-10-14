import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import SvgIcon from './SvgIcon.jsx'
import { userService } from '../services/user.service.js'
import { removeGig } from '../store/gig.actions.js'

import { UserPreview } from './UserPreview.jsx'
import { ImageCarousel } from './ImageCarousel.jsx'

export function GigPreview({ is, gig }) {
  const [isLiked, setIsLiked] = useState(false)
  const [owner, setOwner] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchOwnerDetails() {
      const ownerData = await userService.getById(gig.ownerId)
      setOwner(ownerData)
    }
    fetchOwnerDetails()
  }, [gig.ownerId])

  async function onRemoveGig() {
    try {
      await removeGig(gig._id)
      console.log('Gig removed successfully:')
      navigate(`/user/${owner._id}`)
    } catch (err) {
      console.error('Failed to save gig:', err)
    }
  }

  function onToggleHeart() {
    // event.stopPropagation()
    setIsLiked((prevIsLiked) => !prevIsLiked)
  }
  if (!owner) return null

  return (
    <>
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
          onClick={(e) => onToggleHeart(e)}
        >
          <SvgIcon iconName={'heart'} />
        </span>
      </div>
    </>
  )
}