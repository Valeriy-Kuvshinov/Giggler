import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { BuyerOrder } from './BuyerOrder.jsx'
import { Loader } from '../Loader.jsx'

import { loadOrders } from '../../store/order.actions.js'

export function BuyerOrders() {
    const user = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const displayedOrders = orders.filter(order => order.buyerId === user._id)

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

    if (orders.length === 0) return <Loader />

    return (
        <section className="user-orders">
            <table>
                <thead>
                    <tr>
                        <th>SELLER</th>
                        <th>GIG</th>
                        <th>ACTION DATE</th>
                        <th>DUE ON</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedOrders.map(order => (
                        <BuyerOrder
                            key={order._id}
                            order={order}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    )
}