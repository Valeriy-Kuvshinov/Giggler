import {
    Chart as ChartJS, ArcElement, LinearScale, BarElement, CategoryScale
    , LineController, LineElement, PointElement, Tooltip, Legend, Filler
} from 'chart.js'
ChartJS.register(ArcElement, CategoryScale, LineController, LinearScale
    , LineElement, PointElement, BarElement, Tooltip, Legend, Filler)

import { useSelector } from 'react-redux'

import { Loader } from '../cmps/Loader.jsx'
import { SellerOrders } from '../cmps/dashboardCmps/SellerOrders.jsx'

export function DashboardPage() {
    const user = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const displayedOrders = orders.filter(order => order.sellerId === user._id)

    if (displayedOrders.length === 0) return <Loader />

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