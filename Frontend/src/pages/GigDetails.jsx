import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'

import { GigHeader } from "../cmps/GigHeader.jsx"
import { AboutSeller } from "../cmps/AboutSeller.jsx"
import { GigOrder } from "../cmps/GigOrder.jsx"
import { GigReviews } from "../cmps/GigReviews.jsx"

import { loadGigs } from "../store/gig.actions.js"
import { loadUser } from "../store/user.actions.js"
import { loadReviews } from "../store/review.actions.js"

export function GigDetails() {
  const params = useParams()
  const owner = useSelector(storeState => storeState.userModule.user)
  const user = useSelector(storeState => storeState.userModule.watchedUser)
  const gigs = useSelector(storeState => storeState.gigModule.gigs)
  const gig = gigs.find((gig) => gig._id === params.id)
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)
  const filteredReviewIds = reviews.filter((review) => review.gigId === gig._id).map(review => review._id)

  // console.log('filtered reviews from backend ', filteredReviewIds)
  // console.log('the reviews : ', reviews)

  useEffect(() => {
    loadTheGig()
    loadTheReviews()
  }, [])

  async function loadTheGig() {
    try {
      await loadGigs()
    } catch (err) {
      console.log('couldnt load gig : ', err)
    }
  }

  async function loadTheUser() {
    try {
      await loadUser(gig.ownerId)
    } catch (err) {
      console.log('couldnt load user ', err)
    }
  }

  async function loadTheReviews() {
    try {
      await loadReviews()
    } catch (err) {
      console.log('couldnt load reviews ', err)
    }
  }

  // console.log('the gig : ', gig)
  // console.log('the gig creator : ', owner)
  // console.log('the logged in user : ', user)
  if (user === null && gig) loadTheUser()

  if (!gig || !owner || !user) return <h1>loading...</h1>

  return (
    <section className="gig-details main-container full">
      <section className="gig">
        <div className="gig-info">
          <GigHeader gig={gig} owner={user} />

          <section style={{ overflow: 'hidden' }}>
            <h3>About This Gig</h3>
            <p>{gig.description}</p>
          </section>

          <AboutSeller owner={user} />

          <GigReviews reviews={filteredReviewIds} gig={gig} />
        </div>
        <GigOrder gig={gig} />
      </section>
    </section>
  )
}