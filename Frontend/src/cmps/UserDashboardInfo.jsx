import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gigService } from '../services/gig.service.js'
import { orderBackendService } from '../services/order.backend.service.js'
import { InfoDiv } from "./InfoDiv.jsx"

export function UserDashboardInfo() {
    const [mostExpensiveGig, setMostExpensiveGig] = useState(null)
    const [leastExpensiveGig, setLeastExpensiveGig] = useState(null)
    const [mostPopularGig, setMostPopularGig] = useState(null)
    const [mostTrendingGig, setMostTrendingGig] = useState(null)
    const [totalGigs, setTotalGigs] = useState(0)
    const [pendingGigs, setPendingGigs] = useState(0)
    const [deniedGigs, setDeniedGigs] = useState(0)
    const [weeklyGigs, setWeeklyGigs] = useState(0)
    const [monthlyGigs, setMonthlyGigs] = useState(0)
    const [avgGigPrice, setAvgGigPrice] = useState(0)

    useEffect(() => {
        const fetchGigs = async () => {
            const gigs = await gigService.query()
            const orders = await orderBackendService.query()

            let expensiveGig = gigs[0]
            let cheapGig = gigs[0]
            let popularGig = gigs[0]
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

                if (gig.reviews.length > popularGig.reviews.length) popularGig = gig

                if (gig.state === 'pending') pendingCount++
                if (gig.state === 'denied') deniedCount++

                if (gig.createdAt > oneWeekAgo) weeklyCount++
                if (gig.createdAt > oneMonthAgo) monthlyCount++

                totalGigPrice += gig.price
            })

            const averagePrice = totalGigPrice / gigs.length
            setAvgGigPrice(averagePrice.toFixed(2))

            orders.forEach(order => {
                if (!gigOrderCounts[order.orderedGigId]) gigOrderCounts[order.orderedGigId] = 1
                else gigOrderCounts[order.orderedGigId]++
            })

            const trendingGigId = Object.keys(gigOrderCounts).reduce((a, b) => gigOrderCounts[a] > gigOrderCounts[b] ? a : b)
            const trendingGig = gigs.find(gig => gig._id === trendingGigId)

            setMostExpensiveGig(expensiveGig)
            setLeastExpensiveGig(cheapGig)
            setMostPopularGig(popularGig)
            setTotalGigs(gigs.length)
            setPendingGigs(pendingCount)
            setDeniedGigs(deniedCount)
            setWeeklyGigs(weeklyCount)
            setMonthlyGigs(monthlyCount)
            setMostTrendingGig(trendingGig)
        }
        fetchGigs()
    }, [])

    return (
        <section className="gigs-info grid">
            <InfoDiv title="Total Gigs" info={totalGigs ? totalGigs : 'Loading...'} />
            <InfoDiv title="Pending Gigs" info={pendingGigs} />
            <InfoDiv title="Denied Gigs" info={deniedGigs} />
            <InfoDiv title="Gigs in the past week" info={weeklyGigs} />
            <InfoDiv title="Gigs in the past month" info={monthlyGigs} />
            <InfoDiv title="Most popular (reviews)" info={<Link to={`/gig/${mostPopularGig?._id}`}>{mostPopularGig ? `${mostPopularGig._id} (by ${mostPopularGig.ownerId})` : 'Loading...'}</Link>} />
            <InfoDiv title="Most trending (orders)" info={<Link to={`/gig/${mostTrendingGig?._id}`}>{mostTrendingGig ? `${mostTrendingGig._id} (by ${mostTrendingGig.ownerId})` : 'Loading...'}</Link>} />
            <InfoDiv title="Average Gig Price" info={`$${avgGigPrice}`} />
            <InfoDiv title="Most expensive" info={<Link to={`/gig/${mostExpensiveGig?._id}`}>{mostExpensiveGig ? `${mostExpensiveGig._id} (by ${mostExpensiveGig.ownerId})` : 'Loading...'}</Link>} />
            <InfoDiv title="Least expensive" info={<Link to={`/gig/${leastExpensiveGig?._id}`}>{leastExpensiveGig ? `${leastExpensiveGig._id} (by ${leastExpensiveGig.ownerId})` : 'Loading...'}</Link>} />
        </section>
    )
}