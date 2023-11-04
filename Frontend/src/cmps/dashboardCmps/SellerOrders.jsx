import { useDispatch } from 'react-redux'

import { SellerOrder } from './SellerOrder.jsx'

import { saveOrder } from '../../store/order.actions.js'
import { updateUser } from '../../store/user.actions.js'

export function SellerOrders({ user, displayedOrders }) {
    const dispatch = useDispatch()

    function updateLastDeliveryForUser() {
        const updatedUser = { ...user, lastDelivery: Date.now() }
        dispatch(updateUser(updatedUser))
    }

    async function acceptOrder(order) {
        try {
            const updatedOrder = {
                ...order,
                orderState: 'accepted',
                acceptedAt: Date.now()
            }
            dispatch(saveOrder(updatedOrder))

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
            dispatch(saveOrder(updatedOrder))

        } catch (err) {
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

            dispatch(saveOrder(updatedOrder))

        } catch (err) {
            console.error(`Error completing order ${order._id}:`, err)
        }
    }

    return (
        <section className="user-orders">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>GIG</th>
                        <th></th>
                        <th>BUYER</th>
                        <th>ACTION DATE</th>
                        <th>DUE ON</th>
                        <th>TOTAL</th>
                        <th>STATUS</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {displayedOrders.map(order => (
                        <SellerOrder
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