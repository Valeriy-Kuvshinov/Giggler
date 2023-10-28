import { useEffect } from "react"
import { useSelector } from "react-redux"
import { UserGigs } from "../cmps/UserGigs.jsx"
import { UserInfo } from "../cmps/UserInfo.jsx"

import { loadGigs } from "../store/gig.actions.js"

export function UserProfile() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const gigs = useSelector((storeState) => storeState.gigModule.gigs)

  useEffect(() => {
    loadGigs2()
  }, [])

  async function loadGigs2() {
    try {
      await loadGigs()
    }
    catch (err) {
      console.log("couldnt load gigs : ", err)
    }
  }

  if (user === null || gigs === null) return <div>loading...</div>

  return (
    <section className="profile-page full">
      <div className="user-profile flex layout-row">
        <UserInfo user={user} />
        <UserGigs gigs={gigs} user={user} />
      </div>
    </section>
  )
}