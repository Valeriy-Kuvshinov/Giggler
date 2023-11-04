import {
    Chart as ChartJS, ArcElement, LinearScale, BarElement, CategoryScale
    , LineController, LineElement, PointElement, Tooltip, Legend, Filler
} from 'chart.js'
ChartJS.register(ArcElement, CategoryScale, LineController, LinearScale
    , LineElement, PointElement, BarElement, Tooltip, Legend, Filler)

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { Loader } from '../cmps/Loader.jsx'
import { SellerOrders } from '../cmps/dashboardCmps/SellerOrders.jsx'

import { loadOrders } from '../store/order.actions.js'

export function DashboardPage() {
    const dispatch = useDispatch()

    const user = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const isLoading = useSelector(storeState => storeState.orderModule.isLoading)

    useEffect(() => {
        if (user) {
            dispatch(loadOrders({ sellerId: user._id }))
        }
    }, [user, dispatch])

    const displayedOrders = orders.filter(order => order.sellerId === user._id)

    if (isLoading) return <Loader />

    return (
        <main className="dashboard-page full flex column">
            <section className='dashboard-container'>
                <h3>Seller's Orders Manager</h3>
                <SellerOrders
                    user={user}
                    displayedOrders={displayedOrders}
                />
            </section>
        </main>
    )
}