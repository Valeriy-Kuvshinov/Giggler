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
   const [ gig, setGig ] = useState(null)

   useEffect(()=>{
      gigService.query().then((gigs)=>{
          var gigIdx = gigs.findIndex(gig => gig._id===params.id)
        setGig(gigs[gigIdx])
    })
   },[])
   if(gig===null) return

  return (
    <section className="gig-details main-container full">
      <section className="gig">
      <div className="gig-info">
      <GigHeader gig={gig} />
      <AboutGig/>
      <AboutSeller gig={gig}/>
      <GigReviews/>
      </div>
      <GigOrder/>
      </section>
    </section>
  )
}
