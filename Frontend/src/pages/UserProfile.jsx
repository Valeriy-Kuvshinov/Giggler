import { useEffect } from "react"
import { useSelector } from "react-redux"
import { UserGigs } from "../cmps/UserGigs.jsx"
import { UserInfo } from "../cmps/UserInfo.jsx"

import { loadGigs } from "../store/gig.actions.js"
import { useParams } from "react-router"
import { loadUser } from "../store/user.actions.js"

export function UserProfile() {
  const watchedUser= useSelector((storeState) => storeState.userModule.watchedUser)
  const gigs = useSelector((storeState) => storeState.gigModule.gigs)
  const params=useParams()

  useEffect(() => {
    loadGigs2()
    loadUser2()
  }, [])

  async function loadGigs2() {
    try {
      await loadGigs()
    }
    catch (err) {
      console.log("couldnt load gigs : ", err)
    }
  }

  async function loadUser2(){
    try{
      await loadUser(params.id)
    }
    catch (err) {
      console.log("couldnt load user : ", err)
    }
  }

  if (watchedUser === null || gigs === null) return <div>loading...</div>

  return (
    <section className="profile-page full">
      <div className="user-profile flex layout-row">
        <UserInfo user={watchedUser} />
        <UserGigs gigs={gigs} user={watchedUser} />
      </div>
    </section>
  )
}