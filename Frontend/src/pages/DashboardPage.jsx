import {
    Chart as ChartJS, ArcElement, LinearScale, BarElement, CategoryScale
    , LineController, LineElement, PointElement, Tooltip, Legend, Filler
} from 'chart.js'
ChartJS.register(ArcElement, CategoryScale, LineController, LinearScale
    , LineElement, PointElement, BarElement, Tooltip, Legend, Filler)

import { SellerOrders } from '../cmps/dashboardCmps/SellerOrders.jsx'

export function DashboardPage() {
    return (
        <main className="dashboard-page full flex column">
            <section className='dashboard-container'>
                <h3>Seller's Orders Manager</h3>
                <SellerOrders />
            </section>
        </main>
    )
}