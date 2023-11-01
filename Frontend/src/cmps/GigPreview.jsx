import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"

import SvgIcon from "./SvgIcon.jsx"
import { gigService } from "../services/gig.service"
import { userService } from "../services/user.service.js"
import { removeGig } from "../store/gig.actions.js"

import { useModal } from "../customHooks/ModalContext"
import { UserPreview } from "./UserPreview.jsx"
import { ImageCarousel } from "./ImageCarousel.jsx"
import { loadReviews } from "../store/review.actions.js"
import { utilService } from "../services/util.service.js"

export function GigPreview({ is, gig }) {
  const params = useParams()
  const loggedId = params.id
  const user = useSelector((storeState) => storeState.userModule.user)
  const reviews = useSelector((storeState) => storeState.reviewModule.reviews)
  const filteredReviewIds = gig
    ? reviews
        .filter((review) => review.gigId === gig._id)
        .map((review) => review._id)
    : []
  const [newImgIndex, setNewImgIndex] = useState(0)

  const [owner, setOwner] = useState(null)
  const [updatedGig, setUpdatedGig] = useState(gig)

  const [isLiked, setIsLiked] = useState(
    user && updatedGig.likedByUsers.includes(user._id)
  )

  const navigate = useNavigate()
  const { openLogin } = useModal()

  useEffect(() => {
    async function fetchOwnerDetails() {
      const ownerData = await userService.getById(updatedGig.ownerId)
      setOwner(ownerData)
    }
    loadReviews()
    fetchOwnerDetails()
  }, [updatedGig.ownerId])

  useEffect(() => {
    setIsLiked(user && gig.likedByUsers.includes(user._id))
  }, [user, gig])

  async function onRemoveGig() {
    try {
      await removeGig(updatedGig._id)
      console.log("Gig removed successfully:")
      navigate(`/user/${owner._id}`)
    } catch (err) {
      console.error("Failed to save gig:", err)
    }
  }

  async function likeGig(e) {
    e.preventDefault()
    if (!user) {
      openLogin()
      return
    }
    const gigToSave = { ...updatedGig }

    if (gigToSave.likedByUsers.includes(user._id)) {
      gigToSave.likedByUsers = gigToSave.likedByUsers.filter(
        (liker) => liker !== user._id
      )
      setIsLiked(false)
      try {
        await gigService.save(gigToSave)
      } catch (err) {
        console.error(err)
      }
      setUpdatedGig(gigToSave)
    } else {
      gigToSave.likedByUsers.push(user._id)

      setIsLiked(true)
      try {
        await gigService.save(gigToSave)
      } catch (err) {
        console.error(err)
      }
      setUpdatedGig(gigToSave)
    }
  }

  if (!owner) return null

  return (
    <li className="gig-preview">
      <ImageCarousel
        isFrom={is}
        images={updatedGig.imgUrls}
        gigId={updatedGig._id}
        newImgIndex={newImgIndex}
        setNewImgIndex={setNewImgIndex}
      />

      {is !== "userProfile" && (
        <span className="heart" onClick={(e) => likeGig(e)}>
          {isLiked ? (
            <SvgIcon iconName={"heartLiked"} />
          ) : (
            <SvgIcon iconName={"heart"} />
          )}
        </span>
      )}

      <div className="preview-body">
        {is === "explore" && (
          <UserPreview is={is} owner={owner} gig={updatedGig}>
            <Link className="gig-title" to={`/gig/${updatedGig._id}`}>
              {updatedGig.title}
            </Link>
          </UserPreview>
        )}

        {is === "userProfile" && (
          <>
            <div className="profile">
              <UserPreview is="userProfile" owner={owner} />
              <Link className="gig-title" to={`/gig/${updatedGig._id}`}>
                {updatedGig.title}
              </Link>
              <div className="rating">
                <SvgIcon iconName={"star"} />
                <span>{user.rating}</span>
                <span className="reviews">
                  {/* ({filteredReviewIds.length}) */}
                  ({utilService.getRandomIntInclusive(100,999)})
                  </span>
              </div>
            </div>
            <div className={`gig-changes ${(loggedId !== user._id) ? 'right' : ''}`}>
              {loggedId === user._id && (
                <div className="gig-btns">
                  <button className="gig-btn">
                    <Link to={`/gig/edit/${updatedGig._id}`}>
                      <SvgIcon iconName={"pencil"} />
                    </Link>
                  </button>
                  <button onClick={onRemoveGig} className="gig-btn">
                    <SvgIcon iconName={"deny"} />
                  </button>
                </div>
              )}
              <div className='price'>
                <span className="starting">Starting At</span>
                <span>{`$${updatedGig.price}`}</span>
              </div>
            </div>
          </>
        )}
        {is !== "userProfile" && (
          <div className="gig-price">
            <span className="price b">{`From $${updatedGig.price}`}</span>
          </div>
        )}
      </div>
    </li>
  )
}
