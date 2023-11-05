import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Loader } from './Loader.jsx'

import { orderBackendService } from '../services/order.backend.service.js'
import { loadOrders } from '../store/order.actions.js'

export function BuyerOrders({ user }) {
    const dispatch = useDispatch()

    const orders = useSelector((storeState) => storeState.orderModule.orders)

    const [orderDetails, setOrderDetails] = useState({})

    useEffect(() => {
        if (user) {
            dispatch(loadOrders({ buyerId: user._id }))
        }
    }, [user, dispatch])

    useEffect(() => {
        const fetchOrderDetails = async () => {
            for (const order of orders) {
                if (order.buyerId === user._id) {
                    setOrderDetails((prevDetails) => ({
                        ...prevDetails,
                        [order._id]: { isLoading: true },
                    }))

                    try {
                        const details = await orderBackendService.getOrderDetails(order._id, 'seller')
                        setOrderDetails((prevDetails) => ({
                            ...prevDetails,
                            [order._id]: {
                                isLoading: false,
                                gigData: details.gigData,
                                userData: details.userData,
                            },
                        }))
                    } catch (err) {
                        console.error('Failed to fetch order or gig details:', err)
                        setOrderDetails((prevDetails) => ({
                            ...prevDetails,
                            [order._id]: { isLoading: false, error: err },
                        }))
                    }
                }
            }
        }
        if (orders.some((order) => order.buyerId === user._id)) {
            fetchOrderDetails()
        }
    }, [orders, user, dispatch])

    // Check if all the relevant orders have their details loaded
    const allDetailsLoaded = orders.every(
        (order) => order.buyerId !== user._id || (orderDetails[order._id] && !orderDetails[order._id].isLoading)
    )

    if (!allDetailsLoaded) {
        return (
            <section className="buyer-orders-dropdown flex column">
                <Loader />
            </section>
        )
    }

    return (
        <section className="buyer-orders-dropdown flex column">
            <div className='buyer-orders'>
                {orders
                    .filter((order) => order.buyerId === user._id)
                    .map((order) => {
                        const details = orderDetails[order._id]
                        if (details && !details.isLoading) {
                            return (
                                <div key={order._id} className="buyer-order grid">
                                    <div className="order-image">
                                        <img src={details.gigData.imgUrls?.[0]} alt="Gig" />
                                    </div>
                                    <div className="order-title">
                                        {details ? (
                                            <Link to={`/gig/${details.gigData._id}`}>
                                                {details.gigData.title}
                                            </Link>
                                        ) : null}
                                    </div>
                                    <div className="seller-name">
                                        {`By ${details.userData.username}`}
                                    </div>
                                    <div className="order-status">
                                        {order.orderState}
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <p>No orders yet, go & explore the place!</p>
                            )
                        }
                    })}
            </div>
        </section>
    )
}