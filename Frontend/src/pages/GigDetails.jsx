import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GigHeader } from "../cmps/GigHeader.jsx"
import { AboutGig } from "../cmps/AboutGig.jsx"
import { AboutSeller } from "../cmps/AboutSeller.jsx"
import { GigOrder } from "../cmps/GigOrder.jsx"
import { GigReviews } from "../cmps/GigReviews.jsx"
import { gigService } from "../services/gig.service.local.js"

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
