import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gigService } from '../services/gig.service.js'
import { reviewService } from '../services/review.service.js'
import { orderBackendService } from '../services/order.backend.service.js'
import { InfoDiv } from "./InfoDiv.jsx"

export function GigDashboardInfo() {
    // State declarations
    const [mostExpensiveGig, setMostExpensiveGig] = useState(null)
    const [leastExpensiveGig, setLeastExpensiveGig] = useState(null)
    const [totalGigs, setTotalGigs] = useState(0)
    const [pendingGigs, setPendingGigs] = useState(0)
    const [deniedGigs, setDeniedGigs] = useState(0)
    const [weeklyGigs, setWeeklyGigs] = useState(0)
    const [monthlyGigs, setMonthlyGigs] = useState(0)
    const [avgGigPrice, setAvgGigPrice] = useState(0)
    const [bestGigByRating, setBestGigByRating] = useState(null)
    const [worstGigByRating, setWorstGigByRating] = useState(null)
    const [bestGigByOrders, setBestGigByOrders] = useState(null)
    const [worstGigByOrders, setWorstGigByOrders] = useState(null)

    useEffect(() => {
        const fetchGigs = async () => {
            const gigs = await gigService.query()
            const reviews = await reviewService.query()
            const orders = await orderBackendService.query()

            let expensiveGig = gigs[0]
            let cheapGig = gigs[0]
            let pendingCount = 0
            let deniedCount = 0
            let weeklyCount = 0
            let monthlyCount = 0
            let totalGigPrice = 0
            const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
            const oneMonthAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)

            const gigOrderCounts = {}

            gigs.forEach(gig => {
                if (gig.price > expensiveGig.price) expensiveGig = gig
                if (gig.price < cheapGig.price) cheapGig = gig

                if (gig.state === 'pending') pendingCount++
                if (gig.state === 'denied') deniedCount++

                if (gig.createdAt > oneWeekAgo) weeklyCount++
                if (gig.createdAt > oneMonthAgo) monthlyCount++

                totalGigPrice += gig.price

                const gigReviews = reviews.filter(review => review.gigId === gig._id)
                const totalRating = gigReviews.reduce((acc, review) => acc + review.rating, 0)
                gig.averageRating = gigReviews.length ? totalRating / gigReviews.length : 0
            })

            const averagePrice = totalGigPrice / gigs.length

            const acceptedOrders = orders.filter(order => order.orderState === 'accepted')

            acceptedOrders.forEach(order => {
                if (!gigOrderCounts[order.orderedGigId]) gigOrderCounts[order.orderedGigId] = 0
                gigOrderCounts[order.orderedGigId]++
            })

            const bestGigByOrdersId = Object.keys(gigOrderCounts).reduce((a, b) => gigOrderCounts[a] > gigOrderCounts[b] ? a : b, gigs[0]._id)
            const bestOrderByOrders = gigs.find(gig => gig._id === bestGigByOrdersId)

            const worstGigByOrdersId = Object.keys(gigOrderCounts).reduce((a, b) => gigOrderCounts[a] < gigOrderCounts[b] ? a : b, gigs[0]._id)
            const worstOrderByOrders = gigs.find(gig => gig._id === worstGigByOrdersId)

            const bestGigRating = gigs.reduce((bestGig, currentGig) => {
                return currentGig.averageRating > bestGig.averageRating ? currentGig : bestGig
            }, gigs[0])

            const worstGigRating = gigs.reduce((worstGig, currentGig) => {
                return currentGig.averageRating < worstGig.averageRating ? currentGig : worstGig
            }, gigs[0])

            setMostExpensiveGig(expensiveGig)
            setLeastExpensiveGig(cheapGig)
            setTotalGigs(gigs.length)
            setAvgGigPrice(averagePrice.toFixed(2))

            setPendingGigs(pendingCount)
            setDeniedGigs(deniedCount)
            setWeeklyGigs(weeklyCount)
            setMonthlyGigs(monthlyCount)

            setBestGigByRating(bestGigRating)
            setWorstGigByRating(worstGigRating)
            setBestGigByOrders(bestOrderByOrders)
            setWorstGigByOrders(worstOrderByOrders)
        }
        fetchGigs()
    }, [])

    return (
        <section className="gigs-info grid">
            <InfoDiv title="Total gigs" info={totalGigs ? totalGigs : 'Loading...'} />
            <InfoDiv title="Most expensive"
                info={<Link to={`/gig/${mostExpensiveGig?._id}`}>{mostExpensiveGig ? `${mostExpensiveGig._id} (by ${mostExpensiveGig.ownerId})` : 'Loading...'}</Link>} />
            <InfoDiv title="Least expensive"
                info={<Link to={`/gig/${leastExpensiveGig?._id}`}>{leastExpensiveGig ? `${leastExpensiveGig._id} (by ${leastExpensiveGig.ownerId})` : 'Loading...'}</Link>} />
            <InfoDiv title="Average gig Price" info={`$${avgGigPrice}`} />

            <InfoDiv title="Pending gigs" info={pendingGigs} />
            <InfoDiv title="Denied gigs" info={deniedGigs} />
            <InfoDiv title="New gigs in the past week" info={weeklyGigs} />
            <InfoDiv title="New gigs in the past month" info={monthlyGigs} />

            <InfoDiv title="Best gig (rating)"
                info={<Link to={`/gig/${bestGigByRating?._id}`}>{bestGigByRating ? `${bestGigByRating._id} (by ${bestGigByRating.ownerId})` : 'Loading...'}</Link>} />
            <InfoDiv title="Best gig (orders)"
                info={<Link to={`/gig/${bestGigByOrders?._id}`}>{bestGigByOrders ? `${bestGigByOrders._id} (by ${bestGigByOrders.ownerId})` : 'Loading...'}</Link>} />
            <InfoDiv title="Worst gig (rating)"
                info={<Link to={`/gig/${worstGigByRating?._id}`}>{worstGigByRating ? `${worstGigByRating._id} (by ${worstGigByRating.ownerId})` : 'Loading...'}</Link>} />
            <InfoDiv title="Worst gig (orders)"
                info={<Link to={`/gig/${worstGigByOrders?._id}`}>{worstGigByOrders ? `${worstGigByOrders._id} (by ${worstGigByOrders.ownerId})` : 'Loading...'}</Link>} />
        </section>
    )
}