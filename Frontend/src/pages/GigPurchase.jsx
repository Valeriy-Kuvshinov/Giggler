import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { PurchaseMain } from '../cmps/PurchaseMain.jsx'
import { PurchaseAside } from '../cmps/PurchaseAside.jsx'
import { Loader } from "../cmps/Loader.jsx"

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { orderService } from '../services/order.service.js'

import { loadGigs } from '../store/gig.actions.js'

export function GigPurchase() {
  const initialState = {
    crdNum: '1111222233334444',
    expDate: `${new Date().getMonth() + 1}/${new Date().getFullYear() % 100}`,
    pinCode: '123',
    firstName: 'Yaron',
    lastName: 'Biton'
  }
  const [paymentMethod, setPaymentMethod] = useState(true)
  const [formData, setFormData] = useState(initialState)

  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const gigs = useSelector((storeState) => storeState.gigModule.gigs)

  const navigate = useNavigate()
  const { id } = useParams()
  const gig = gigs.find((gig) => gig._id === id)

  const queryParams = new URLSearchParams(window.location.search)
  const packageChoice = queryParams.get('package')

  useEffect(() => {
    if (!id || id.length !== 24 || !loggedInUser) {      
      navigate('/explore')
      return
    }
    const loadData = async () => {
      try {
        await loadGigs()
      } catch (err) {
        console.error("Error loading gig: ", err)
      }
    }
    loadData()
  }, [id, navigate])

  async function createOrder() {
    const newOrder = orderService.createOrder(
      loggedInUser._id,
      gig.ownerId,
      gig.title,
      gig.daysToMake,
      gig._id,
      gig.price
    )
    try {
      await orderService.save(newOrder)
      socketService.emit('notify_seller_new_order', {userId: newOrder.sellerId , user: loggedInUser})
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

  function handlePaymentMethod(state) {
    setPaymentMethod(state)
  }
  function handleSubmit() {
    console.log('Form data submitted:', formData)
  }

  if (!gigs || !gig) return <Loader />

  return (
    <section className="gig-purchase layout-row max-width-container">
      <PurchaseMain
        paymentMethod={paymentMethod}
        handlePaymentMethod={handlePaymentMethod}
        formData={formData}
        setFormData={setFormData}
        initialState={initialState}
      />
      <PurchaseAside
        gig={gig}
        createOrder={createOrder}
        packageChoice={packageChoice}
        handleSubmit={handleSubmit}
        paymentMethod={paymentMethod}
      />
    </section>
  )
}