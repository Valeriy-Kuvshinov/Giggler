import { useEffect, useState } from 'react'
import SvgIcon from '../cmps/SvgIcon'
import { userService } from '../services/user.service.js'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function UserPreview({ isFrom, owner, children }) {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const [user, setUser] = useState(null)
  const [ratingCount, setRatingCount] = useState(null)
  let completedOrders = []
  if (isFrom === 'gigDetailsTop' || isFrom === 'gigDetailsBottom') {
    completedOrders = orders
      .filter((order) => order.sellerId === owner._id)
      .filter((order) => order.deniedAt || order.acceptedAt)
  }
  completedOrders = completedOrders.length

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
  if(isFrom === 'mobile') {
    return (
      <div className="user-mobile-preview">
          <div className="user-rating-order">
            <span className="rating-score flex">
              <SvgIcon iconName={'star'} tag={'span'} />
              <span className="rate b">{user.rating}</span>
              <span className="rate-count ">{`(${ratingCount})`}</span>
            </span>
          </div>
          {children}

        </div>

    )
  }

  return (
    <>
      <div
        className={`user-preview ${isFrom === 'gig-details' ? 'gap12' : isFrom === 'gig-details-2' ? 'gap16' : ''
          }`}
      >
        <img
          className={`avatar-${isFrom}`}
          src={user.imgUrl}
          alt={`${user.fullName} gig avatar`}
        />
        <div className={`user-${isFrom}-wrapper`}>
          <span className="name-wrapper">
            {(isFrom === 'gig-details' || isFrom === 'gig-details-2') && (
              <span className="fullname b">{user.fullName}</span>
            )}
          <Link to={`/user/${user._id}`} className={`username ${isFrom === 'explore' ? 'b' : ''}`}>{`${isFrom === 'gig-details' ? '@' : isFrom === 'gig-details-2' ? '@' : ''
              }${user.username}`}</Link>
              {isFrom==='userProfile' && <span className={`user-level ${user.level==='level 3'?'top':''}`}>{user.level}</span>}
          </span>
          {isFrom === 'gig-details-2' && (
            <span className="saying">{`Work Hard\, Work Fast and Cater Your needs as imagined`}</span>
          )}
          {(isFrom === 'gig-details' || isFrom === 'gig-details-2') && (
            <div className="rating-order-wrapper">
              <span className="rating-score flex">
                <SvgIcon iconName="star" />
                <span className="rate b">{user.rating}</span>
                <span className="rate-count ">{`(${ratingCount})`}</span>
              </span>
              {isFrom === 'gig-details' && (
                <span className="active-orders">{`${completedOrders} Order${completedOrders !== 1 ? 's' : ''
                  } in Queue`}</span>
              )}
            </div>
          )}
        </div>
        {isFrom === 'explore' && <span className={`level ${user.level==='Pro Talent'?'pro':''}`}>{user.level}</span>}
      </div>
      {isFrom === 'explore' && children}
      {isFrom === 'explore' && (
        <div className="user-rating-order">
          <span className="rating-score flex">
            <SvgIcon iconName={'star'} tag={'span'} />
            <span className="rate b">{user.rating}</span>
            <span className="rate-count ">{`(${ratingCount})`}</span>
          </span>
          <span></span>
        </div>
      )}
    </>
  )
}
