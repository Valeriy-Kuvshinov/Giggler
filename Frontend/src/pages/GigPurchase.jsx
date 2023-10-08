import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { PaymentDetails } from "../cmps/PaymentDetails.jsx"
import { PaymentInfo } from "../cmps/PaymentInfo.jsx"

import { orderService } from "../services/order.service.local"
import { gigService } from "../services/gig.service.local"

export function GigPurchase() {
  const [ gig, setGig ] = useState(null)
  const params = useParams()
  const id = params.id

  useEffect(()=>{
    gigService.getById(id).then((gig)=>setGig(gig))
  },[])
  function createOrder(){
    const order=orderService.createOrder('u101',gig.owner.id,gig._id,gig.price)
    orderService.save(order)
  }

  return (
    <section className="main-container">
      <section className="gig-purchase">
        <PaymentDetails createOrder={createOrder}/>
        <PaymentInfo gigId={id} createOrder={createOrder}/>
      </section>
    </section>
  )
}
