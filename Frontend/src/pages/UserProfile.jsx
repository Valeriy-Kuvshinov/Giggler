import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { UserGigs } from '../cmps/UserGigs.jsx'
import { UserInfo } from '../cmps/UserInfo.jsx'
import { UserOrders } from '../cmps/UserOrders.jsx'

export function UserProfile() {
  const user = useSelector(storeState => storeState.userModule.user)
  // console.log(user)
  const gigs = useSelector(storeState => storeState.gigModule.gigs)
  // console.log(gigs)

  return (
    <section className="main-container full">
      <div className="user-profile">
        <UserInfo user={user} />
        <UserGigs gigs={gigs} user={user} />
      </div>
      <UserOrders user={user} />
    </section>
  )
}