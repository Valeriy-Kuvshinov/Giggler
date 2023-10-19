import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { UserGigs } from "../cmps/UserGigs.jsx"
import { UserInfo } from "../cmps/UserInfo.jsx"
import { UserOrders } from "../cmps/UserOrders.jsx"
import { UserEditModal } from "../cmps/UserEditModal.jsx"

import { loadGigs } from "../store/gig.actions.js"

export function UserProfile() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const gigs = useSelector((storeState) => storeState.gigModule.gigs)

  // console.log('user ',user)

  useEffect(() => {
    loadGigs2()
  }, [])

  async function loadGigs2() {
    try {
      await loadGigs()
    } catch (err) {
      console.log("couldnt load gigs : ", err)
    }
  }

  if (user === null || gigs === null) return <div>loading...</div>

  return (
    <section className="profile layout-row">
      <div className="user-profile">
        <UserInfo user={user}/>
        <UserGigs gigs={gigs} user={user} />
      </div>
      <UserOrders/>
    </section>
  )
}
