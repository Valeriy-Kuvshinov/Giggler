import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { UserOrder } from './UserOrder.jsx'

import { loadOrders } from '../../store/order.actions.js'
import { orderBackendService } from '../../services/order.backend.service.js'
import { userService } from '../../services/user.service.js'

export function UserOrders() {
    const user = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const sellerOrders = orders.filter(order => order.sellerId === user._id)

    useEffect(() => {
        loadUserOrders()
    }, [])

    async function loadUserOrders() {
        try {
            await loadOrders()
        } catch (err) {
            console.error('Could not load orders:', err)
        }
    }

    function updateLastDeliveryForUser() {
        const updatedUser = { ...user, lastDelivery: Date.now() }
        userService.update(updatedUser)
    }

    async function acceptOrder(order) {
        try {
            const updatedOrder = { ...order, orderState: 'accepted', acceptedAt: Date.now() }
            updateLastDeliveryForUser()
            await orderBackendService.save(updatedOrder)

            loadUserOrders()
        } catch (err) {
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
            updateLastDeliveryForUser()
            await orderBackendService.save(updatedOrder)

            loadUserOrders()
        } catch (err) {
            console.error(`Error denying order ${order._id}:`, err)
        }
    }

    async function completeOrder(order) {
        try {
            const updatedOrder = { ...order, orderState: 'completed', completedAt: Date.now() }
            updateLastDeliveryForUser()
            await orderBackendService.save(updatedOrder)

            loadUserOrders()
        } catch (err) {
            console.error(`Error completing order ${order._id}:`, err)
        }
    }

    if (orders.length === 0) return <div>Loading...</div>

    return (
        <section className="user-orders">
            <table>
                <thead>
                    <tr>
                        <th>BUYER</th>
                        <th>GIG</th>
                        <th>ACTION DATE</th>
                        <th>DUE ON</th>
                        <th>STATUS</th>
                        <th>SET</th>
                    </tr>
                </thead>
                <tbody>
                    {sellerOrders.map(order => (
                        <UserOrder
                            key={order._id}
                            order={order}
                            acceptOrder={acceptOrder}
                            denyOrder={denyOrder}
                            completeOrder={completeOrder}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    )
}