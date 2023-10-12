import { useState , useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'

import { PaymentDetails } from "../cmps/PaymentDetails.jsx"
import { PaymentInfo } from "../cmps/PaymentInfo.jsx"

import {showErrorMsg,showSuccessMsg} from '../services/event-bus.service.js'
import { orderBackendService } from "../services/order.backend.service.js"
import { gigService } from "../services/gig.service.js"
import { userService } from "../services/user.service.js"

import { saveOrder } from "../store/order.actions.js"

export function GigPurchase() {
  const params = useParams()
  const [gig,setGig]=useState(null)
  const [user,setUser]=useState(null)

  useEffect(()=>{
    loadGig()
    loadUser()
  },[])

  async function loadGig(){
    try{
      const gig=await gigService.getById(params.id)
      setGig(gig)
    } catch (err){
      console.log('couldnt load gig : ',err)
    }
  }
  async function loadUser(){
    try{
      const user=await userService.getLoggedinUser()
      setUser(user)
    } catch (err){
      console.log('couldnt load user : ',err)
    }
  }

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

  if(gig===null||user===null) return <div>loading...</div>

  // console.log('gig : ',gig)
  
  return (
    <section className="main-container">
      <section className="gig-purchase">
        <PaymentDetails createOrder={createOrder}/>
        <PaymentInfo gigId={params.id} createOrder={createOrder}/>
      </section>
    </section>
  )
}
