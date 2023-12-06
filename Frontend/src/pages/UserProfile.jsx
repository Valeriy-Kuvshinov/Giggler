import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"

import { UserGigs } from "../cmps/UserGigs.jsx"
import { UserInfo } from "../cmps/UserInfo.jsx"
import { Loader } from "../cmps/Loader.jsx"

import { loadGigs } from "../store/gig.actions.js"
import { loadUser } from "../store/user.actions.js"

export function UserProfile() {
  const navigate = useNavigate()
  const { id } = useParams()

  const watchedUser = useSelector((storeState) => storeState.userModule.watchedUser)
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const gigs = useSelector((storeState) => storeState.gigModule.gigs)

  useEffect(() => {
    if (!id || id.length !== 24) {
      navigate('/explore')
      return
    }
    async function loadData() {
      try {
        await loadUser(id)
        await loadGigs()
      }
      catch (err) {
        console.error("Error loading data: ", err)
      }
    }
    loadData()
  }, [id, navigate])

  if (!gigs || !watchedUser) return <Loader />

  return (
    <section className={`profile-page full ${loggedInUser?._id !== watchedUser?._id ? 'visitor' : ''}`}>
      <div className="user-profile flex row layout-row">
        <UserInfo watchedUser={watchedUser} loggedinUser={loggedInUser} />
        <UserGigs watchedUser={watchedUser} loggedinUser={loggedInUser} gigs={gigs} />
      </div>
    </section>
  )
}