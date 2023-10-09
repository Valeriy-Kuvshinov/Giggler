import { useEffect, useState } from 'react'
import SvgIcon from '../cmps/SvgIcon'
import { userService } from '../services/user.service.js'

export function UserPreview({ is, owner, children }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    loadUserData()
  }, [owner])

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
            src={user.avatar}
            alt={`${user.fullName} gig avatar`}
          />
          <span className="full-name">{user.fullName}</span>
        </div>
        <span className="level">{user.level}</span>
      </div>
      {is === 'explore' && children}
      <div className="user-rating">
        <span className="rating-score">
          <SvgIcon iconName={'star'} />
          <span className="rate b">{user.rating}</span>
          <span className="rate-count ">{`(${userService.getUserRatingCount(
            user
          )})`}</span>
        </span>
      </div>
    </>
  )
}
