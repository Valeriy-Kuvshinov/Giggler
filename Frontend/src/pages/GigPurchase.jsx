import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { PurchaseMain } from '../cmps/PurchaseMain.jsx'
import { PurchaseAside } from '../cmps/PurchaseAside.jsx'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { orderBackendService } from '../services/order.backend.service.js'

import { saveOrder } from '../store/order.actions.js'
import { loadGigs } from '../store/gig.actions.js'

export function GigPurchase() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const gigs = useSelector((storeState) => storeState.gigModule.gigs)
  const params = useParams()
  const gig = gigs.find((gig) => gig._id === params.id)

  const queryParams = new URLSearchParams(window.location.search)
  const packageChoice = queryParams.get('package')

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

  async function createOrder() {
    const orderToSave = orderBackendService.createOrder(
      user._id,
      user.fullName,
      gig.ownerId,
      gig.title,
      gig.deliveryTime,
      gig._id,
      gig.price
    )

    try {
      const savedOrder = await saveOrder(orderToSave)
      showSuccessMsg(
        {
          title: 'ORDER ADDED',
          body: `Thank you for using Giggler!`,
        },
        {
          userMsgLeft: '55%',
          messageAreaPadding: '2em 1.5em 2em 7em',
          msgStatusTranslateX: '-12em',
        }
      )
    } catch (err) {
      showErrorMsg(
        {
          title: 'FAILED TO ORDER',
          body: `Please try again later.`,
        },
        {
          userMsgLeft: '55%',
          messageAreaPadding: '1em 0.5em 1em 6em',
          msgStatusTranslateX: '-13em',
        }
      )
    }
  }

  if (gig === undefined || gigs === undefined) return <div>loading...</div>

  return (
    <section className="gig-purchase layout-row max-width-container">
      <PurchaseMain createOrder={createOrder} />
      <PurchaseAside
        gig={gig}
        createOrder={createOrder}
        packageChoice={packageChoice}
      />
    </section>
  )
}
