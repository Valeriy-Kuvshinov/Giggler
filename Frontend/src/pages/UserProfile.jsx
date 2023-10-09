import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { UserGigs } from '../cmps/UserGigs.jsx'
import { UserInfo } from '../cmps/UserInfo.jsx'

import { gigService } from '../services/gig.service.local.js'
import { UserOrders } from '../cmps/UserOrders.jsx'
import { userReducer } from '../store/user.reducer.js'

export function UserProfile() {
  const [gigs, setGigs] = useState([])

  const user = useSelector(storeState => storeState.userModule.user)
  // console.log('user : ',user)

  useEffect(() => {
    gigService.query({ userId: user._id }).then((gigs) => setGigs(gigs))
  }, [])

  return (
    <section className="main-container full">
      <div className="user-profile">
        <UserInfo user={user} />
        <UserGigs gigs={gigs} user={user} />
      </div>
        <UserOrders user={userReducer}/>
    </section>
  )
}