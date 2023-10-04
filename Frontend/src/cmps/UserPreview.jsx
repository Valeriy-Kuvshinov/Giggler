import { Link } from 'react-router-dom'
import { loadUser } from '../store/user.actions'



export function UserPreview({is, userId, children} ) {
    console.log('userId' , userId)
  
    const user = loadUser(userId)
  if (user=== undefined) return
//   console.log('gig',gig)
  return (
    <>
      <div className="preview-user-info">
        <div className="avatar-fullname">
          <img
            className="avatar"
            src={user.imgUrl}
            alt={`${user.fullName} gig avatar`}
          />
          <span className="full-name">{user.fullName}</span>
        </div>
        <span className="level">{user.level}</span>
      </div>
      {is === 'explore' && (
        children
      )}
      <div className="user-rating">
        <span className="rating-score">{`★${user.rate}`}</span>
      </div>
    </>
  )
}
