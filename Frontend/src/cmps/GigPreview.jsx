import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useModal } from '../customHooks/ModalContext.jsx'

import { gigService } from '../services/gig.service'
import { userService } from '../services/user.service.js'
import { removeGig } from '../store/gig.actions.js'

import SvgIcon from './SvgIcon.jsx'
import { UserPreview } from './UserPreview.jsx'
import { ImageCarousel } from './ImageCarousel.jsx'
import { loadReviews } from '../store/review.actions.js'
import { utilService } from '../services/util.service.js'

export function GigPreview({ isFrom, gig }) {
  const navigate = useNavigate()
  const params = useParams()
  const loggedInUserId = params.id
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const { openLogin } = useModal()

  const [newImgIndex, setNewImgIndex] = useState(0)
  const [owner, setOwner] = useState(null)
  const [updatedGig, setUpdatedGig] = useState(gig)
  const [isLiked, setIsLiked] = useState(
    loggedInUser && updatedGig.likedByUsers.includes(loggedInUser._id)
  )
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)

  useEffect(() => {
    async function fetchOwnerDetails() {
      const ownerData = await userService.getById(updatedGig.ownerId)
      setOwner(ownerData)
    }
    loadReviews()
    fetchOwnerDetails()
  }, [updatedGig.ownerId])

  useEffect(() => {
    setIsLiked(loggedInUser && gig.likedByUsers.includes(loggedInUser._id))
  }, [loggedInUser, gig])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  async function onRemoveGig() {
    try {
      await removeGig(updatedGig._id)
      console.log('Gig removed successfully:')
      navigate(`/user/${owner._id}`)
    } catch (err) {
      console.error('Failed to save gig:', err)
    }
  }

  async function likeGig(e) {
    e.preventDefault()
    if (!loggedInUser) {
      openLogin()
      return
    }
    const gigToSave = { ...updatedGig }

    if (gigToSave.likedByUsers.includes(loggedInUser._id)) {
      gigToSave.likedByUsers = gigToSave.likedByUsers.filter(
        (liker) => liker !== loggedInUser._id
      )
      setIsLiked(false)
      try {
        await gigService.save(gigToSave)
      } catch (err) {
        console.error(err)
      }
      setUpdatedGig(gigToSave)
    } else {
      gigToSave.likedByUsers.push(loggedInUser._id)

      setIsLiked(true)
      try {
        await gigService.save(gigToSave)
      } catch (err) {
        console.error(err)
      }
      setUpdatedGig(gigToSave)
    }
  }
  if (isMobile) {
    return (
      <li className="mobile-gig-preview">
        <img src={updatedGig.imgUrls[0]} alt="gig-img"></img>
        <div className="mobile-preview-body">
          <UserPreview isFrom={'mobile'} owner={owner} gig={updatedGig}>
            <Link className="gig-title" to={`/gig/${updatedGig._id}`}>
              {updatedGig.title}
            </Link>
            <div className="gig-price">
              <span className="from">From</span><span className="price b">{`$${updatedGig.price}`}</span>
            </div>
          </UserPreview>
        </div>
        <span className="heart" onClick={(e) => likeGig(e)}>
          {isLiked ? (
            <SvgIcon iconName={'heartLikedDesktopIcon'} />
          ) : (
            <SvgIcon iconName={'heartEmptyDesktopIcon'} />
          )}
        </span>
      </li>
    )
  }
  return (
    <li className="gig-preview">
      <ImageCarousel
        isFrom={isFrom}
        images={updatedGig.imgUrls}
        gigId={updatedGig._id}
        newImgIndex={newImgIndex}
        setNewImgIndex={setNewImgIndex}
      />

      {isFrom !== 'userProfile' && (
        <span className="heart" onClick={(e) => likeGig(e)}>
          {isLiked ? (
            <SvgIcon iconName={'heartLikedDesktopIcon'} />
          ) : (
            <SvgIcon iconName={'heartEmptyDesktopIcon'} />
          )}
        </span>
      )}
      <div className="preview-body">
        {isFrom === 'explore' && (
          <UserPreview isFrom={isFrom} owner={owner} gig={updatedGig}>
            <Link className="gig-title" to={`/gig/${updatedGig._id}`}>
              {updatedGig.title}
            </Link>
          </UserPreview>
        )}

        {isFrom === 'userProfile' && (
          <>
            <div className="profile">
              {loggedInUserId !== loggedInUser?._id && (
                <UserPreview isFrom="userProfile" owner={owner} />
              )}
              <Link className="gig-title" to={`/gig/${updatedGig._id}`}>
                {updatedGig.title}
              </Link>
              <div className="rating">
                <SvgIcon iconName={'star'} />
                <span>{loggedInUser?.rating}</span>
                <span className="reviews">
                  ({utilService.getRandomIntInclusive(100, 999)})
                </span>
              </div>
            </div>
            <div
              className={`gig-changes ${
                loggedInUserId !== loggedInUser?._id ? 'right' : ''
              }`}
            >
              {loggedInUserId === loggedInUser?._id && (
                <div className="gig-btns">
                  <button className="gig-btn">
                    <Link to={`/gig/edit/${updatedGig._id}`}>
                      <SvgIcon iconName={'pencil'} />
                    </Link>
                  </button>
                  <button onClick={onRemoveGig} className="gig-btn">
                    <SvgIcon iconName={'deny'} />
                  </button>
                </div>
              )}
              <div className="price">
                <span className="starting">Starting At</span>
                <span>{`$${updatedGig.price}`}</span>
              </div>
            </div>
          </>
        )}
        {isFrom !== 'userProfile' && (
          <div className="gig-price">
            <span className="price b">{`From $${updatedGig.price}`}</span>
          </div>
        )}
      </div>
    </li>
  )
}
