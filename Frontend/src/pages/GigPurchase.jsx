import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'

import { PaymentDetails } from "../cmps/PaymentDetails.jsx"
import { PaymentInfo } from "../cmps/PaymentInfo.jsx"

import { orderService } from "../services/order.service.local"
import { orderBackendService } from "../services/order.backend.service.js"
import {showErrorMsg,showSuccessMsg} from '../services/event-bus.service.js'

import { saveOrder } from "../store/order.actions.js"

export function GigPurchase() {
  const user = useSelector(storeState => storeState.userModule.user)
  var gigs = useSelector(storeState => storeState.gigModule.gigs)
  const params = useParams()
  var gig=gigs.find((gig)=>gig._id===params.id)

  // function createOrder(){
  //   const order=orderService.createOrder(user._id,user.fullName,gig.owner._id,gig._id,gig.price)
  //   orderService.save(order)
  // }

  function createOrder() {
    const orderToSave = orderBackendService.
    createOrder(user._id,user.fullName,gig.owner._id,gig._id,gig.price)

    saveOrder(orderToSave)
        .then(savedOrder => {
            showSuccessMsg(`order added (id: ${savedOrder._id})`)
        })
        .catch(err => {
            console.log('Cannot add Order', err)
            showErrorMsg('Cannot add Order')
        })
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
