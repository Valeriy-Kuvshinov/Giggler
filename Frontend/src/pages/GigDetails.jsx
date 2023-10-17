import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'

import { GigHeader } from "../cmps/GigHeader.jsx"
import { AboutSeller } from "../cmps/AboutSeller.jsx"
import { GigOrder } from "../cmps/GigOrder.jsx"
import { GigReviews } from "../cmps/GigReviews.jsx"

import { loadUser } from "../store/user.actions.js"
import { loadReviews } from "../store/review.actions.js"
import { gigService } from "../services/gig.service.js"

export function GigDetails() {
  const params = useParams()
  const [gig, setGig] = useState(null)
  const owner = useSelector(storeState => storeState.userModule.user)
  const user = useSelector(storeState => storeState.userModule.watchedUser)
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)
  const filteredReviewIds = gig ? reviews.filter(review => review.gigId === gig._id).map(review => review._id) : []

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedGig = await gigService.getById(params.id)
        setGig(fetchedGig)

        await loadReviews()

        if (user === null && fetchedGig) await loadUser(fetchedGig.ownerId)
      } catch (err) {
        console.error("Error loading data:", err)
      }
    }
    fetchData()
  }, [params.id, user])

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