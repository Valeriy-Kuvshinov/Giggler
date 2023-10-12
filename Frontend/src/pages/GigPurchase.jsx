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
import { loadGigs } from "../store/gig.actions.js"

export function GigPurchase() {
  const params = useParams()
  
  const user = useSelector(storeState => storeState.userModule.user)
  const gigs = useSelector(storeState => storeState.gigModule.gigs)
  const gig=gigs.find((gig)=>gig._id===params.id)
  // const [gig,setGig]=useState(null)
  // const [user,setUser]=useState(null)

  useEffect(()=>{
    loadGig2()
    // loadUser2()
  },[])

  async function loadGig2(){
    try{
      await loadGigs()
      // await getGig(params.id)
      // const gig=await gigService.getById(params.id)
      // setGig(gig)
    } catch (err){
      console.log('couldnt load gig : ',err)
    }
  }
  // async function loadUser2(){
  //   try{
  //     await loadUser()
  //     // const user=await userService.getLoggedinUser()
  //     // setUser(user)
  //   } catch (err){
  //     console.log('couldnt load user : ',err)
  //   }
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
  
  if(gig===undefined||gigs===undefined||user===null) return <div>loading...</div>
  
  // console.log('gig : ',gig)
  
  return (
    <section className="main-container">
      <section className="gig-purchase">
        <PaymentDetails createOrder={createOrder}/>
        <PaymentInfo gig={gig} createOrder={createOrder}/>
      </section>
    </section>
  )
}
