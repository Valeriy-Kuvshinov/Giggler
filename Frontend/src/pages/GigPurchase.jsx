import { PaymentDetails } from "../cmps/PaymentDetails"
import { PaymentInfo } from "../cmps/PaymentInfo"

import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'

import { orderService } from "../services/order.service.local"
import { gigService } from "../services/gig.service.local"
import { userService } from "../services/user.service"

export function GigPurchase() {
  const [ user, setUser ] = useState(null)
  const [ gig, setGig ] = useState(null)
  const params = useParams()
  const id = params.id

  function createOrder(){

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
