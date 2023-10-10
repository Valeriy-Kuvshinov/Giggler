import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'

import { PaymentDetails } from "../cmps/PaymentDetails.jsx"
import { PaymentInfo } from "../cmps/PaymentInfo.jsx"

import { orderService } from "../services/order.service.local"

export function GigPurchase() {
  const user = useSelector(storeState => storeState.userModule.user)
  var gigs = useSelector(storeState => storeState.gigModule.gigs)
  const params = useParams()
  var gig=gigs.find((gig)=>gig._id===params.id)

  function createOrder(){
    const order=orderService.createOrder(user._id,user.fullName,gig.owner._id,gig._id,gig.price)
    orderService.save(order)
  }

  // console.log(gig)
  
  return (
    <section className="main-container">
      <section className="gig-purchase">
        <PaymentDetails createOrder={createOrder}/>
        <PaymentInfo gigId={params.id} createOrder={createOrder}/>
      </section>
    </section>
  )
}
