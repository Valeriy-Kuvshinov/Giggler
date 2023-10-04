import { Link } from 'react-router-dom'
import { userService } from '../services/user.service'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export function UserPreview({is, ownerId, children} ) {
    console.log('ownerId' , ownerId)
  
    const users = useSelector((storeState) => storeState.userModule.users)
    const owner = users.find((user) => user._id === ownerId)
  if (owner=== undefined) return
//   console.log('gig',gig)
  return (
    <>
      <div className="preview-user-info">
        <div className="avatar-fullname">
          <img
            className="avatar"
            src={owner.imgUrl}
            alt={`${owner.fullName} gig avatar`}
          />
          <span className="full-name">{owner.fullName}</span>
        </div>
        <span className="level">{owner.level}</span>
      </div>
      {is === 'explore' && (
        children
      )}
      <div className="user-rating">
        <span className="rating-score">{`★${owner.rate}`}</span>
      </div>
    </>
  )
}
