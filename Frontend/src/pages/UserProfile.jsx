import { useState, useEffect } from 'react'

import { UserGigs } from '../cmps/UserGigs.jsx'
import { UserInfo } from '../cmps/UserInfo.jsx'

import { userService } from '../services/user.service.js'
import { gigService } from '../services/gig.service.local.js'

export function UserProfile() {
  const [gigs, setGigs] = useState([])
  
  const currentUser=userService.getLoggedinUser()
  console.log(currentUser)

  useEffect(() => {
    gigService.query().then((gigs) => setGigs(gigs))
  }, [])

  return (
    <section className="main-container full">
      <div className="user-profile">
        <UserInfo />
        <UserGigs gigs={gigs} />
      </div>
    </section>
  )
}