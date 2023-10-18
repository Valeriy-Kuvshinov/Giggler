import { useEffect, useState } from 'react'
import SvgIcon from '../cmps/SvgIcon'
import { userService } from '../services/user.service.js'

export function UserPreview({ is, owner, children }) {
  const [user, setUser] = useState(null)
  const [ratingCount, setRatingCount] = useState(null)

  useEffect(() => {
    loadUserData()
  }, [owner])

  useEffect(() => {
    if (user && ratingCount === null) {
      const count = userService.getUserRatingCount(user)
      setRatingCount(count)
    }
  }, [user])

  function loadUserData() {
    setUser(owner)
  }
  if (!user) return null

  return (
    <>
      <div className="preview-user-info">
        <div className="avatar-fullname">
          <img
            className="avatar"
            src={user.imgUrl}
            alt={`${user.fullName} gig avatar`}
          />
          <span className="full-name b">{user.fullName}</span>
        </div>
        <span className="level">{user.level}</span>
      </div>
      {is === 'explore' && children}
      <div className="user-rating">
        <span className="rating-score">
          <SvgIcon iconName={'star'} />
          <span className="rate b">{user.rating}</span>
          <span className="rate-count ">{`(${ratingCount})`}</span>
        </span>
      </div>
    </>
  )
}
