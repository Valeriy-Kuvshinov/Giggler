import { Link } from 'react-router-dom'
import { loadUser, loadUsers } from '../store/user.actions'
import { useEffect, useState } from 'react'
import SvgIcon from '../cmps/SvgIcon'
import { utilService } from '../services/util.service'
import { userService } from '../services/user.service'

export function UserPreview({ is, owner, children }) {
  const [user, setUser] = useState(null)
  // console.log('userId',owner)
  useEffect(() => {
    loadUserData()
  }, [owner])

  function loadUserData() {
    setUser(owner)
  }
  // function getRatingCount() {
  //   let countMax = 500
  //   let countMin = 1
  //   switch (user.level) {
  //     case 'level 1':
  //       countMax = 50
  //       break
  //     case 'level 2':
  //       countMin = 51
  //       countMax = 250
  //       break
  //     case 'level 3':
  //       countMin = 251
  //       break

  //     default:
  //       console.log('NO LEVEL! :(')
  //       break
  //   }
  //   return utilService.getRandomIntInclusive(countMin, countMax)
  // }

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
          <SvgIcon iconName={'star'} />
          <span className="rate b">{user.rate}</span>
          <span className="rate-count ">{`(${userService.getUserRatingCount(user)})`}</span>
        </span>
      </div>
    </>
  )
}
