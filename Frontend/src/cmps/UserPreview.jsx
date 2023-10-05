import { Link } from 'react-router-dom'
import { loadUser, loadUsers } from '../store/user.actions'
import { useEffect, useState } from 'react'

export function UserPreview({ is, ownerId, children }) {
  const [user, setUser] = useState(null)
    console.log('userId',ownerId)
  useEffect(() => {
    loadUserData()
  }, [ownerId])

  async function loadUserData() {
    try {
      await loadUsers()
      const loadedUser = await loadUser(ownerId)
      
      setUser(loadedUser)
    } catch (error) {
      console.log('Error loading user in UserPreview', error)
    }
  }

  if (!user) {
    return null // Or render a loading state if necessary
  }

console.log('I AM HERE!!!!!!!!!!!!!')
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
      {is === 'explore' && children}
      <div className="user-rating">
        <span className="rating-score">{`★${user.rate}`}</span>
      </div>
    </>
  )
}
