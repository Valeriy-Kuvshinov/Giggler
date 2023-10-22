import {
    Chart as ChartJS, ArcElement, LinearScale, BarElement, CategoryScale
    , LineController, LineElement, PointElement, Tooltip, Legend, Filler
} from 'chart.js'
ChartJS.register(ArcElement, CategoryScale, LineController, LinearScale
    , LineElement, PointElement, BarElement, Tooltip, Legend, Filler)
import { FinanceDashboard } from '../cmps/FinanceDashboard.jsx'
import { UserDashboard } from '../cmps/UserDashboard.jsx'
import { GigDashboard } from '../cmps/GigDashboard.jsx'

export function DashboardPage() {
    return (
        <main className="dashboard-page flex column">
            <div className='dashboard-container-header flex column'>
                <h1>Welcome dear admin!</h1>
                <h2>Here is our most updated business statistics:</h2>
            </div>

            <GigDashboard />

            <UserDashboard />

            <FinanceDashboard />
        </main>
    )
}