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
      createOrder(user._id, user.fullName, gig.ownerId
        , gig.title, gig.deliveryTime, gig._id, gig.price)
    saveOrder(orderToSave)
      .then(savedOrder => {
        showSuccessMsg(
          `Your order has been sent.\n Thank you for using Giggler!`,
          {
            userMsgLeft: "55%",
            messageAreaPadding: "1em 0.5em 1em 5em",
            msgStatusTranslateX: "-13em"
          })
      })
      .catch(err => {
        console.log('Cannot add Order', err)
        showErrorMsg('Cannot add Order', {
          userMsgLeft: "50%",
          messageAreaPadding: "1em 0.5em 1em 5em",
          msgStatusTranslateX: "-13em"
        })
      })
  }

  if (gig === undefined || gigs === undefined) return <div>loading...</div>

  return (
    <section className="gig-purchase layout-row">
      <PaymentDetails createOrder={createOrder} />
      <PaymentInfo gig={gig} createOrder={createOrder} />
    </section>
  )
}