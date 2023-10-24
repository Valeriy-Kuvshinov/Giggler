import { useState } from "react"

import { DenialOrderModal } from "./DenialOrderModal.jsx"


export function UserOrder({ order, acceptOrder, denyOrder, completeOrder }) {
    const [isDenied, setDenial] = useState(false);

    function getOrderClass(orderState) {
        const orderStateClasses = {
            'pending': 'pending user-order',
            'accepted': 'accepted user-order',
            'denied': 'denied user-order',
            'completed': 'completed user-order'
        };
        return orderStateClasses[orderState] || '';
    }

    return (
        <section className={getOrderClass(order.orderState)}>
            <span>order by: {order.buyerName}</span>
            <span>ordered gig title: {order.title}</span>
            <span>ordered gig price: {order.price}</span>
            <span>time to make: {order.deliveryTime}</span>
            {order.orderState === 'denied' && <span>reason for denial : {order.reasonForDenial}</span>}
            {order.orderState === 'completed' && <span>Order has been completed.</span>}

            {order.orderState === 'pending' && (
                <div className='order-buttons flex'>
                    <button onClick={() => acceptOrder(order)}>accept order</button>
                    <button onClick={() => setDenial(true)}>deny order</button>
                </div>
            )}

            {order.orderState === 'accepted' && (
                <div className='order-buttons flex'>
                    <button onClick={() => completeOrder(order)}>complete order</button>
                </div>
            )}

            {isDenied && <DenialOrderModal order={order} denyOrder={(order, reason) => {
                if (order) denyOrder(order, reason);
                setDenial(false);
            }} />}
            {isDenied && <div className="deny-background"></div>}
        </section>
    );
}