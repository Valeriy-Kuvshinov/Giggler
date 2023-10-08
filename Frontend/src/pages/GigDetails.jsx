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
      loadGig()
   },[])

   async function loadGig(){
    const gig =await gigService.getById(params.id)
    setGig(gig)
   }

   if(gig===null) return <h1>loading...</h1>

  return (
    <section className="gig-details main-container full">
      <section className="gig">
      <div className="gig-info">
      <GigHeader gig={gig} />
      <AboutGig gig={gig}/>
      <AboutSeller gig={gig}/>
      {(gig.owner.reviews)&&<GigReviews reviews={gig.owner.reviews}/>}
      </div>
      <GigOrder gig={gig}/>
      </section>
    </section>
  )
}
