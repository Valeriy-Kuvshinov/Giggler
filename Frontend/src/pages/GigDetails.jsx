import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { GigHeader } from "../cmps/GigHeader.jsx"
import { AboutSeller } from "../cmps/AboutSeller.jsx"
import { GigOrder } from "../cmps/GigOrder.jsx"
import { GigReviews } from "../cmps/GigReviews.jsx"

import { gigBackendService } from "../services/gig.backend.service.js"
import { userService } from "../services/user.service.js"

export function GigDetails() {
  const params = useParams()
  const [gig, setGig] = useState(null)
  const [owner, setOwner] = useState(null)

  useEffect(() => {
    loadGig()
  }, [])

  async function loadGig() {
    try {
      const gig = await gigBackendService.getById(params.id)
      setGig(gig)

      const ownerData = await userService.getById(gig.ownerId)
      setOwner(ownerData)
    } catch (err) {
      console.log('couldnt load gig : ', err)
    }
  }
  if (!gig || !owner) return <h1>loading...</h1>

  return (
    <section className="gig-details main-container full">
      <section className="gig">
        <div className="gig-info">
          <GigHeader gig={gig} owner={owner} />

          <section style={{ overflow: 'hidden' }}>
            <h3>About This Gig</h3>
            <p>{gig.description}</p>
          </section>

          <AboutSeller owner={owner} />
          {gig.reviews && <GigReviews reviews={gig.reviews} />}
        </div>
        <GigOrder gig={gig} />
      </section>
    </section>
  )
}