
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { UserGigs } from '../cmps/UserGigs.jsx'
import { UserInfo } from '../cmps/UserInfo.jsx'
import { UserOrders } from '../cmps/UserOrders.jsx'

import { loadGigs } from '../store/gig.actions.js'

import { gigService } from '../services/gig.service.js'
import { userService } from '../services/user.service.js'

export function UserProfile() {
  const { gigs } = useSelector((storeState) => storeState.gigModule)
  // const [gigs, setGigs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    loadGigs2()
    // loadUser()
  }, [])

  async function loadGigs2() {
    try {
      await loadGigs()
      // const gigs = await gigService.query()
      // setGigs(gigs)
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
  // console.log('gigs : ',gigs)
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