import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'

import { PaymentDetails } from "../cmps/PaymentDetails.jsx"
import { PaymentInfo } from "../cmps/PaymentInfo.jsx"

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { orderBackendService } from "../services/order.backend.service.js"

import { saveOrder } from "../store/order.actions.js"
import { loadGigs } from "../store/gig.actions.js"

export function GigPurchase() {
  const user = useSelector(storeState => storeState.userModule.user)
  const gigs = useSelector(storeState => storeState.gigModule.gigs)
  const params = useParams()
  const gig = gigs.find((gig) => gig._id === params.id)
  // console.log(gig)

  useEffect(() => {
    loadGig2()
  }, [])

  async function loadGig2() {
    try {
      await loadGigs()
    } catch (err) {
      console.log('couldnt load gig : ', err)
    }
  }

  function createOrder() {
    const orderToSave = orderBackendService.
      createOrder(user._id, user.fullName, gig.ownerId, gig.title, gig.deliveryTime, gig._id, gig.price)

    saveOrder(orderToSave)
      .then(savedOrder => {
        showSuccessMsg(`order added (id: ${savedOrder._id})`)
      })
      .catch(err => {
        console.log('Cannot add Order', err)
        showErrorMsg('Cannot add Order')
      })
  }
  
  if (gig === undefined || gigs === undefined) return <div>loading...</div>

  // console.log('user : ',user)
  // console.log('gig : ',gig)

  return (
    <section className="main-container">
      <section className="gig-purchase">
        <PaymentDetails createOrder={createOrder} />
        <PaymentInfo gig={gig} createOrder={createOrder} />
      </section>
    </section>
  )
}