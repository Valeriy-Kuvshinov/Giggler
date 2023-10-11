import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { GigHeader } from "../cmps/GigHeader.jsx"
import { AboutGig } from "../cmps/AboutGig.jsx"
import { AboutSeller } from "../cmps/AboutSeller.jsx"
import { GigOrder } from "../cmps/GigOrder.jsx"
import { GigReviews } from "../cmps/GigReviews.jsx"
import { useEffect } from "react"

export function GigDetails() {
  const params = useParams()

  var gigs = useSelector((storeState) => storeState.gigModule.gigs)
  var gig = gigs.find((gig) => gig._id === params.id)

  // useEffect(() => {
  //   console.log("use effect")
  // }, [])
  console.log(gigs)

  if (!gig) return <h1>loading...</h1>


  return (
    <section className="gig-details main-container full">
      <section className="gig">
        <div className="gig-info">
          <GigHeader gig={gig} />
          <AboutGig gig={gig} />
          <AboutSeller gig={gig} />
          {gig.owner.reviews && <GigReviews reviews={gig.owner.reviews} />}
        </div>
        <GigOrder gig={gig} />
      </section>
    </section>
  )
}
