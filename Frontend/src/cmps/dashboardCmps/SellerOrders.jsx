import { useState, useEffect } from 'react'

import { SellerOrder } from './SellerOrder.jsx'

import { saveOrder } from '../../store/order.actions.js'
import { updateUser } from '../../store/user.actions.js'
import { socketService } from '../../services/socket.service.js'

export function SellerOrders({ loggedInUser, displayedOrders }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    function updateLastDeliveryForUser() {
        const updatedUser = { ...loggedInUser, lastDelivery: Date.now() }
        updateUser(updatedUser)
    }

    async function acceptOrder(order) {
        try {
            const updatedOrder = {
                ...order,
                orderState: 'accepted',
                acceptedAt: Date.now()
            }
            await saveOrder(updatedOrder)
            socketService.emit('notify_buyer_accepted', { userId: updatedOrder.buyerId, user: loggedInUser })
        } 
        catch (err) {
            console.error(`Error accepting order ${order._id}:`, err)
        }
    }

    async function denyOrder(order, reason) {
        try {
            const updatedOrder = {
                ...order,
                orderState: 'denied',
                deniedAt: Date.now(),
                reasonForDenial: reason
            }
            await saveOrder(updatedOrder)
            socketService.emit('notify_buyer_denied', { userId: updatedOrder.buyerId, user: loggedInUser })
        } 
        catch (err) {
            console.error(`Error denying order ${order._id}:`, err)
        }
    }

    async function completeOrder(order) {
        try {
            const updatedOrder = {
                ...order,
                orderState: 'completed',
                completedAt: Date.now()
            }
            updateLastDeliveryForUser()

            await saveOrder(updatedOrder)
            socketService.emit('notify_buyer_completed', { userId: updatedOrder.buyerId, user: loggedInUser })
        } 
        catch (err) {
            console.error(`Error completing order ${order._id}:`, err)
        }
    }

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <section className="user-orders">
            {windowWidth > 600 ? (
                <section className="desktop-view flex column">
                    {displayedOrders.map(order => (
                        <div className="user-order" key={order._id}>
                            <SellerOrder
                                order={order}
                                acceptOrder={acceptOrder}
                                denyOrder={denyOrder}
                                completeOrder={completeOrder}
                                windowWidth={windowWidth}
                            />
                        </div>
                    ))}
                </section>
            ) : (
                <section className="mobile-view flex column">
                    {displayedOrders.map(order => (
                        <div className="user-order" key={order._id}>
                            <SellerOrder
                                order={order}
                                acceptOrder={acceptOrder}
                                denyOrder={denyOrder}
                                completeOrder={completeOrder}
                                windowWidth={windowWidth}
                            />
                        </div>
                    ))}
                </section>
            )}
        </section>
    )
}