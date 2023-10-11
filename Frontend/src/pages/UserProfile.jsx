import { useSelector } from 'react-redux'
import { useState , useEffect } from 'react'

import { UserGigs } from '../cmps/UserGigs.jsx'
import { UserInfo } from '../cmps/UserInfo.jsx'
import { UserOrders } from '../cmps/UserOrders.jsx'

import { userService } from '../services/user.service.js'

export function UserProfile() {
  // const user =userService.getLoggedinUser()
  const user = useSelector(storeState => storeState.userModule.user)
  const gigs = useSelector(storeState => storeState.gigModule.gigs)
  console.log(user)
  // console.log(user)
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