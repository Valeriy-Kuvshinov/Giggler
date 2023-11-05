import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Loader } from './Loader.jsx'

import { orderBackendService } from '../services/order.backend.service.js'
import { loadOrders } from '../store/order.actions.js'

export function BuyerOrders({ user }) {
    const dispatch = useDispatch()

    const isLoading = useSelector(storeState => storeState.orderModule.isLoading)
    const orders = useSelector(storeState => storeState.orderModule.orders)

    const [orderDetails, setOrderDetails] = useState({})

    useEffect(() => {
        if (user) {
            dispatch(loadOrders({ buyerId: user._id }))
        }
    }, [user, dispatch])

    const displayedOrders = orders.filter(order => order.buyerId === user._id)

    useEffect(() => {
        const fetchOrderDetails = async () => {
            for (const order of displayedOrders) {
                try {
                    const details = await orderBackendService.getOrderDetails(order._id, 'seller')
                    setOrderDetails((prevDetails) => ({
                        ...prevDetails,
                        [order._id]: {
                            gigData: details.gigData,
                            userData: details.userData,
                        },
                    }))
                } catch (err) {
                    console.error('Failed to fetch order or gig details:', err)
                }
            }
        }
        if (displayedOrders.length > 0) fetchOrderDetails()
    }, [displayedOrders])

    if (isLoading) return (
        <section className='buyer-orders-dropdown flex column'>
            <Loader />
        </section>
    )

    return (
        <section className='buyer-orders-dropdown flex column'>
            {displayedOrders.length > 0 ? (
                displayedOrders.map((order) => (
                    <div key={order._id} className="buyer-order grid">
                        <div className="order-image">
                            <img src={orderDetails[order._id]?.gigData?.imgUrls?.[0]} alt="Gig" />
                        </div>
                        <div className="order-title">
                            {orderDetails[order._id]?.gigData?.title}
                        </div>
                        <div className="seller-name">
                            {`By ${orderDetails[order._id]?.userData?.username}`}
                        </div>
                        <div className="order-status">
                            {order.orderState}
                        </div>
                    </div>
                ))
            ) : (
                <section className='buyer-orders-dropdown flex column'>
                    <Loader />
                </section>
            )}
        </section>
    )
}