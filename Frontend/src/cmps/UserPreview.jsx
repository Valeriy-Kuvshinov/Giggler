import { Link } from 'react-router-dom'
import { loadUser, loadUsers } from '../store/user.actions'
import { useEffect, useState } from 'react'
import star from '../assets/img/svg/star.icon.svg'
import SvgIcon from '../cmps/SvgIcon'

export function UserPreview({ is, owner, children }) {
  const [user, setUser] = useState(null)
    // console.log('userId',owner)
  useEffect(() => {
    loadUserData()
  }, [owner])

  function loadUserData() {
      setUser(owner)
  }

  if (!user) {
    return null // Or render a loading state if necessary
  }

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
        <span className="rating-score">
          {/* <img className="icon" src={star}/> */}
          <SvgIcon iconName={'star'}/>
           {`${user.rate}`}</span>
      </div>
    </>
  )
}
