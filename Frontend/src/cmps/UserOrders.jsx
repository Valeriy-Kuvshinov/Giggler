import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { orderService } from '../services/order.service.local'
import { orderBackendService } from '../services/order.backend.service'
import { UserOrder } from './UserOrder'


export function UserOrders({ user }){

    const [orders,setOrders]=useState([])

    useEffect(()=>{
        orderBackendService.query().then((orders)=>setOrders(orders))
    },[orders])

    // console.log('orders from backend : ',orders)

    function acceptOrder(order){
        console.log(`order ${order._id} accepted`)
        order.orderState='accepted'
        orderBackendService.save(order)
    }

    function denyOrder(order){
        console.log(`order ${order._id} denied`)
        order.orderState='denied'
        orderBackendService.save(order)
    }

    // const orders = useSelector(storeState => storeState.orderModule.orders)
    // console.log(orders.length)

    // if(orders.length===0) return <div>loading... </div>

    return (<section className="user-orders">
             <ul>
                <div className='orders-title'>
                Active Orders
                </div>
                {orders.map((order)=>
                    <li key={order._id}>
                        <UserOrder order={order} acceptOrder={acceptOrder} denyOrder={denyOrder}/>
                    </li>
                )}
             </ul>
            </section>)
}