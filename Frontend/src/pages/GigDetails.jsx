import { GigHeader } from "../cmps/GigHeader"
import { AboutGig } from "../cmps/AboutGig"
import { AboutSeller } from "../cmps/AboutSeller"
import { GigOrder } from "../cmps/GigOrder"
import { GigReviews } from "../cmps/GigReviews"

import { gigService } from "../services/gig.service.local"

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export function GigDetails() {

   const params = useParams()
   const { gig, setGig } = useState({})

   useEffect(()=>{
    console.log(params._id)
      console.log(gigService.query())
   },[])

  return (
    <section className="gig-details main-container full">
      <section className="gig">
      <div className="gig-info">
      <GigHeader/>
      <AboutGig/>
      <AboutSeller/>
      <GigReviews/>
      </div>
      <GigOrder/>
      </section>
    </section>
  )
}
