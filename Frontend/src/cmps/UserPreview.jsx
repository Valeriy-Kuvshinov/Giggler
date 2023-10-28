import { useEffect, useState } from 'react'
import SvgIcon from '../cmps/SvgIcon'
import { userService } from '../services/user.service.js'
import { useSelector } from 'react-redux'

export function UserPreview({ is, owner, children }) {
  const orders = useSelector((storeState) => storeState.orderModule.orders)
  const [user, setUser] = useState(null)
  const [ratingCount, setRatingCount] = useState(null)
  let completedOrders = []
  if (is === 'gigDetailsTop' || is === 'gigDetailsBottom') {
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

  return (
    <>
      <div
        className={`user-preview ${
          is === 'gig-details' ? 'gap12' : is === 'gig-details-2' ? 'gap16' : ''
        }`}
      >
        <img
          className={`avatar-${is}`}
          src={user.imgUrl}
          alt={`${user.fullName} gig avatar`}
        />
        <div className={`user-${is}-wrapper`}>
          <span className="name-wrapper">
            {(is === 'gig-details' || is === 'gig-details-2') && (
              <span className="fullname b">{user.fullName}</span>
            )}
            <span className={`username ${is === 'explore' ? 'b' : ''}`}>{`${
              is === 'gig-details' ? '@' : is === 'gig-details-2' ? '@' : ''
            }${user.username}`}</span>
          </span>
          {is === 'gig-details-2' && (
            <span className="saying">{`Work Hard\, Work Fast and Cater Your needs as imagined`}</span>
          )}
          {(is === 'gig-details' || is === 'gig-details-2') && (
            <div className="rating-order-wrapper">
              <span className="rating-score flex">
                <SvgIcon iconName="star" />
                <span className="rate b">{user.rating}</span>
                <span className="rate-count ">{`(${ratingCount})`}</span>
              </span>
              {is === 'gig-details' && (
                <span className="active-orders">{`${completedOrders} Order${
                  completedOrders !== 1 ? 's' : ''
                } in Queue`}</span>
              )}
            </div>
          )}
        </div>
        {is === 'explore' && <span className="level">{user.level}</span>}
      </div>
      {is === 'explore' && children}
      {is === 'explore' && (
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
