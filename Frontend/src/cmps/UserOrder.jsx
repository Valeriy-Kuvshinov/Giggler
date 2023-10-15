
export function UserOrder({ order, acceptOrder, denyOrder }) {


    function acceptTheOrder() {
        // console.log(order)
        acceptOrder(order)
    }

    function denyTheOrder() {
        // console.log(order)
        denyOrder(order)
    }

    // console.log('order',order)

    return (<section className={(order.orderState === 'pending') ? 'pending user-order' :
        (order.orderState === 'accepted') ? 'accepted user-order' : 'denied user-order'}>

        <span>order by: {order.buyerName}</span>
        <span>ordered gig title: {order.title}</span>
        <span>ordered gig price: {order.price}</span>
        <span>time to make: {order.deliveryTime}</span>

        {order.orderState === 'pending' && 
        <div className='order-buttons'>
            <button onClick={acceptTheOrder}>accept order</button>
            <button onClick={denyTheOrder}>deny order</button>
        </div>}
    </section>)
}