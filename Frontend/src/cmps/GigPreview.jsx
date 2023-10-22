import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

import SvgIcon from './SvgIcon.jsx'
import { userService } from '../services/user.service.js'
import { removeGig } from '../store/gig.actions.js'

import { UserPreview } from './UserPreview.jsx'
import { ImageCarousel } from './ImageCarousel.jsx'

export function GigPreview({ is, gig }) {
  const [isLiked, setIsLiked] = useState(false)
  const [owner, setOwner] = useState(null)
  const parentRef = useRef()
  const [parentWidth, setParentWidth] = useState(0)
  const navigate = useNavigate()

  function handleResize() {
    if (parentRef.current && parentRef.current.clientWidth > 0) {
      setParentWidth(parentRef.current.clientWidth);
    }
  }
  
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.addEventListener('load', handleResize)
    }
  }, [])

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
    setIsLiked((prevIsLiked) => !prevIsLiked)
  }
  if (!owner) return null

  return (
    <li className="gig-preview" ref={parentRef}>
      <ImageCarousel
        images={gig.imgUrls}
        gigId={gig._id}
        parentWidth={parentWidth}
      />
      <div className="preview-body">
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
      </div>
    </li>
  )
}
