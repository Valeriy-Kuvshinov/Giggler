import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { GigHeader } from "../cmps/GigHeader.jsx"
import { AboutGig } from "../cmps/AboutGig.jsx"
import { AboutSeller } from "../cmps/AboutSeller.jsx"
import { GigOrder } from "../cmps/GigOrder.jsx"
import { GigReviews } from "../cmps/GigReviews.jsx"
import { useEffect, useState } from "react"

import { gigBackendService } from "../services/gig.backend.service copy.js"

export function GigDetails() {
  const params = useParams()
  const [gig,setGig]=useState(null)

  useEffect(() => {
    loadGig()
  }, [])

  async function loadGig(){
    try{
      const gig=await gigBackendService.getById(params.id)
      setGig(gig)
    } catch (err) {
      console.log('couldnt load gig : ',err)
    }
  }

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
