import { useState, useEffect } from 'react'

import { getGig } from '../store/gig.actions.js'

export function UserOrder({ order, acceptOrder, denyOrder }) {
    const [gig, setGig] = useState([])

    useEffect(() => {
        loadGig()
    }, [])

    async function loadGig() {
        try {
            const gig = await getGig(order.orderedGigId)
            setGig(gig)
        } catch (err) {
            console.log('couldnt load gig : ', err)
        }
    }

    if (gig === undefined) return <div>loading gig...</div>

    // console.log('gig : ',gig)

    function acceptTheOrder() {
        // console.log(order)
        acceptOrder(order)
    }

    function denyTheOrder() {
        // console.log(order)
        denyOrder(order)
    }

    return (<section className={(order.orderState === 'pending') ? 'pending user-order' :
        (order.orderState === 'accepted') ? 'accepted user-order' : 'denied user-order'}>

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