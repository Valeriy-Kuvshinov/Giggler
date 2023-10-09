import { useState, useEffect } from 'react'

import { gigService } from "../services/gig.service.local"

export function UserOrder({ order , acceptOrder , denyOrder }){

    const [gig,setGig]=useState(null)

    useEffect(()=>{
        gigService.getById(order.orderedGigId).then(gig=>setGig(gig))
    },[])
    // console.log(gig)

    if (gig===null) return <div>loading order...</div>

    function acceptTheOrder(){
        // console.log(order)
        acceptOrder(order)
    }

    function denyTheOrder(){
        // console.log(order)
        denyOrder(order)
    }

    return (<section className={(order.orderState==='pending') ?'pending user-order' : 
           (order.orderState==='accepted') ? 'accepted user-order' : 'denied user-order'}> 
           <span>order by: {order.buyerName}</span>
           <span>ordered gig title: {gig.title}</span>
           <span>ordered gig price: {gig.price}</span>
           <span>time to make: {gig.deliveryTime}</span>
           <div className='order-buttons'>
           <button onClick={acceptTheOrder}>accept order</button>
           <button onClick={denyTheOrder}>deny order</button>
           </div>
           </section>)
}