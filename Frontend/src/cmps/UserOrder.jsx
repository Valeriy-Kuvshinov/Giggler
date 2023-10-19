import { useState } from "react"

import { DenialOrderModal } from "./DenialOrderModal"

export function UserOrder({ order, acceptOrder, denyOrder }) {

    const [isDenied,setDenial]=useState(false)

    function acceptTheOrder() {
        // console.log(order)
        acceptOrder(order)
    }

    function denyTheOrder() {
        // console.log(order)
        setDenial(true)
        // denyOrder(order)
    }

    function denyIt(order,reason){
        if(order){
            denyOrder(order,reason)
        } 
            setDenial(false)
    }

    // console.log('order',order)

    return (<section className={(order.orderState === 'pending') ? 'pending user-order' :
        (order.orderState === 'accepted') ? 'accepted user-order' : 'denied user-order'}>

        <span>order by: {order.buyerName}</span>
        <span>ordered gig title: {order.title}</span>
        <span>ordered gig price: {order.price}</span>
        <span>time to make: {order.deliveryTime}</span>
        {order.orderState==='denied' && <span>reason for denial : {order.reasonForDenial}</span>}

        {order.orderState === 'pending' && 
        <div className='order-buttons'>
            <button onClick={acceptTheOrder}>accept order</button>
            <button onClick={denyTheOrder}>deny order</button>
        </div>}
        {isDenied && <DenialOrderModal order={order} denyOrder={denyIt}/>}
        {isDenied && <div className="deny-background" 
        // onClick={denyIt()}
        ></div>}
    </section>)
}