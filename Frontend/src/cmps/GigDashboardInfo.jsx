import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gigService } from '../services/gig.service.js'
import { reviewService } from '../services/review.service.js'
import { orderBackendService } from '../services/order.backend.service.js'
import { userService } from '../services/user.service.js'

import { InfoDiv } from "./InfoDiv.jsx"

import gigIcon from '../assets/img/svg/gig.icon.svg'
import addIcon from '../assets/img/svg/add.icon.svg'
import moneyIcon from '../assets/img/svg/money.icon.svg'
import kingIcon from '../assets/img/svg/king.icon.svg'

export function GigDashboardInfo() {
    const [totalGigs, setTotalGigs] = useState(0)
    const [monthlyGigs, setMonthlyGigs] = useState(0)
    const [avgGigPrice, setAvgGigPrice] = useState(0)
    const [bestGigByRating, setBestGigByRating] = useState(null)
    const [bestGigByOrders, setBestGigByOrders] = useState(null)
    const [bestGigByReviews, setBestGigByReviews] = useState(null)
    const [bestGigRatingOwner, setBestGigRatingOwner] = useState(null)
    const [bestGigOrdersOwner, setBestGigOrdersOwner] = useState(null)
    const [bestGigReviewsOwner, setBestGigReviewsOwner] = useState(null)

    useEffect(() => {
        const fetchGigs = async () => {
            const gigs = await gigService.query()
            const reviews = await reviewService.query()
            const orders = await orderBackendService.query()

            let monthlyCount = 0
            let totalGigPrice = 0
            const oneMonthAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)

            const gigOrderCounts = {}

            gigs.forEach(gig => {
                if (gig.createdAt > oneMonthAgo) monthlyCount++

                totalGigPrice += gig.price

                const gigReviews = reviews.filter(review => review.gigId === gig._id)
                const totalRating = gigReviews.reduce((acc, review) => acc + review.rating, 0)
                gig.averageRating = gigReviews.length ? totalRating / gigReviews.length : 0

                gig.totalReviews = reviews.filter(review => review.gigId === gig._id).length
            })

            const averagePrice = totalGigPrice / gigs.length

            const acceptedOrders = orders.filter(order => order.orderState === 'accepted')

            acceptedOrders.forEach(order => {
                if (!gigOrderCounts[order.orderedGigId]) gigOrderCounts[order.orderedGigId] = 0
                gigOrderCounts[order.orderedGigId]++
            })

            const bestGigByOrdersId = Object.keys(gigOrderCounts).reduce((a, b) => gigOrderCounts[a] > gigOrderCounts[b] ? a : b, gigs[0]._id)
            const bestOrderByOrders = gigs.find(gig => gig._id === bestGigByOrdersId)

            const bestGigRating = gigs.reduce((bestGig, currentGig) => {
                return currentGig.averageRating > bestGig.averageRating ? currentGig : bestGig
            }, gigs[0])

            const bestGigByReviewCount = gigs.reduce((bestGig, currentGig) => {
                return currentGig.totalReviews > bestGig.totalReviews ? currentGig : bestGig
            }, gigs[0])

            setTotalGigs(gigs.length)
            setAvgGigPrice(averagePrice.toFixed(2))
            setMonthlyGigs(monthlyCount)

            setBestGigByReviews(bestGigByReviewCount)
            setBestGigByRating(bestGigRating)
            setBestGigByOrders(bestOrderByOrders)

            const bestGigRatingOwner = await userService.getById(bestGigRating.ownerId)
            setBestGigRatingOwner(bestGigRatingOwner)

            const bestGigOrdersOwner = await userService.getById(bestOrderByOrders.ownerId)
            setBestGigOrdersOwner(bestGigOrdersOwner)

            const bestGigReviewsOwner = await userService.getById(bestGigByReviewCount.ownerId)
            setBestGigReviewsOwner(bestGigReviewsOwner)
        }
        fetchGigs()
    }, [])

    return (
        <section className="info-divs grid">
            <InfoDiv title="Total gigs"
                info={totalGigs ? `${totalGigs} gigs overall` : '0'}
                imgSrc={gigIcon} />

            <InfoDiv title="New gigs this month"
                info={monthlyGigs ? `${monthlyGigs} new gigs` : '0'}
                imgSrc={addIcon} />

            <InfoDiv title="Average gig price"
                info={avgGigPrice ? `$${avgGigPrice} per gig` : '$0 per gig'}
                imgSrc={moneyIcon} />

            <InfoDiv title="Best gig - by rating"
                info={bestGigByRating && bestGigRatingOwner
                    ? <Link to={`/gig/${bestGigByRating._id}`}>{`${bestGigByRating._id} - by ${bestGigRatingOwner.username}`}</Link>
                    : 'Loading...'}
                imgSrc={kingIcon} />

            <InfoDiv title="Best gig - by orders"
                info={bestGigByOrders && bestGigOrdersOwner
                    ? <Link to={`/gig/${bestGigByOrders._id}`}>{`${bestGigByOrders._id} - by ${bestGigOrdersOwner.username}`}</Link>
                    : 'Loading...'}
                imgSrc={kingIcon} />

            <InfoDiv title="Best gig - by reviews"
                info={bestGigByReviews && bestGigReviewsOwner
                    ? <Link to={`/gig/${bestGigByReviews._id}`}>{`${bestGigByReviews._id} - by ${bestGigReviewsOwner.username}`}</Link>
                    : 'Loading...'}
                imgSrc={kingIcon} />
        </section>
    )
}