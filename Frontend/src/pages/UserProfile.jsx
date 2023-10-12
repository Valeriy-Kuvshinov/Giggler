
import { useState, useEffect } from 'react'

import { UserGigs } from '../cmps/UserGigs.jsx'
import { UserInfo } from '../cmps/UserInfo.jsx'
import { UserOrders } from '../cmps/UserOrders.jsx'

<<<<<<< HEAD
import { gigService } from '../services/gig.service.js'
=======
import { gigBackendService } from '../services/gig.backend.service.js'
import { userService } from '../services/user.service.js'
>>>>>>> 27c72419cfba54abedd192e09dd4ece943422fbd

export function UserProfile() {
  const [gigs, setGigs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    loadGigs()
    loadUser()
  }, [])

  async function loadGigs() {
    try {
      const gigs = await gigService.query()
      setGigs(gigs)
    } catch (err) {
      console.log('couldnt load gigs : ', err)
    }
  }

  async function loadUser(){
    try{
      const users = await userService.getLoggedinUser()
      setUser(users)
    } catch (err) {
      console.log('couldnt load users : ', err)
    }
  }
  console.log('user : ',user)
  if (user === null || gigs === null) return <div>loading...</div>

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