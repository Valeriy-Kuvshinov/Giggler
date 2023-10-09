import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { orderService } from '../services/order.service.local'
import { UserOrder } from './UserOrder'


export function UserOrders({ user }){

    const [orders,setOrders] = useState([])

    useEffect(()=>{
        orderService.query(user._id).then(orders => setOrders(orders))
    },[])

    function acceptOrder(order){
        console.log(`order ${order._id} accepted`)
        order.orderState='accepted'
        orderService.save(order)
    }

    function denyOrder(order){
        console.log(`order ${order._id} denied`)
        order.orderState='denied'
        orderService.save(order)
    }

    // const orders = useSelector(storeState => storeState.orderModule.orders)
    // console.log(orders)

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