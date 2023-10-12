import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { UserGigs } from '../cmps/UserGigs.jsx'
import { UserInfo } from '../cmps/UserInfo.jsx'
import { UserOrders } from '../cmps/UserOrders.jsx'

import { gigService } from '../services/gig.service.js'

export function UserProfile() {
  const user = useSelector(storeState => storeState.userModule.user)
  const [gigs, setGigs] = useState([])

  useEffect(() => {
    loadGigs()
  }, [])

  async function loadGigs() {
    try {
      const gigs = await gigService.query()
      setGigs(gigs)
    } catch (err) {
      console.log('couldnt load gigs : ', err)
    }
  }
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