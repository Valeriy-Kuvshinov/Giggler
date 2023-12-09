// import {
//     Chart as ChartJS, ArcElement, LinearScale, BarElement, CategoryScale
//     , LineController, LineElement, PointElement, Tooltip, Legend, Filler
// } from 'chart.js'
// ChartJS.register(ArcElement, CategoryScale, LineController, LinearScale
//     , LineElement, PointElement, BarElement, Tooltip, Legend, Filler)
const noResultsImg = 'https://res.cloudinary.com/dgwgcf6mk/image/upload/v1701539881/Giggler/other/bzqrborygalzssnmogax.png'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Loader } from '../cmps/Loader.jsx'
import { SellerOrders } from '../cmps/dashboardCmps/SellerOrders.jsx'
import { SellerSummary } from '../cmps/dashboardCmps/SellerSummary.jsx'

import { loadOrders } from '../store/order.actions.js'

export function SellerDashboard() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const isLoading = useSelector(storeState => storeState.orderModule.isLoading)

    useEffect(() => {
        const fetchOrders = async () => {
            if (loggedInUser) {
                try {
                    await loadOrders({ sellerId: loggedInUser._id })
                } catch (err) {
                    console.error("Error loading orders:", err)
                }
            }
        }
        fetchOrders()
    }, [loggedInUser])

    const displayedOrders = orders.filter(order => order.sellerId === loggedInUser._id)

    if (isLoading) return <Loader />

    if (displayedOrders.length === 0) {
        return (
            <main className="seller-dashboard-page full flex column">
                <div className="no-results">
                    <h3>Whoops, looks like you don't have any orders yet.</h3>
                    <p>Please check again once your gigs gain traction.</p>
                    <img src={noResultsImg} alt="no results" />
                    <p>At the meantime, why not refine your profile or check out tips for success?</p>
                    <Link to={`/user/${loggedInUser._id}`}>Go to Profile</Link>
                </div>
            </main>
        )
    }

    return (
        <main className="seller-dashboard-page full flex column">
            <section className="dashboard-container layout-row">
                <SellerSummary
                    loggedInUser={loggedInUser}
                    displayedOrders={displayedOrders}
                />
                <h3>Manage Your Orders</h3>
                <SellerOrders
                    loggedInUser={loggedInUser}
                    displayedOrders={displayedOrders}
                />
            </section>
        </main>
    )
}