import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gigService } from '../services/gig.service.js'
import { orderBackendService } from '../services/order.backend.service.js'
import { userService } from '../services/user.service.js'
import { InfoDiv } from "./InfoDiv.jsx"

export function UserDashboardInfo() {
    const [totalUsers, setTotalUsers] = useState(0)
    const [newUsersMonth, setNewUsersMonth] = useState(0)

    const [bestUserRating, setBestUserRating] = useState(null)
    const [bestUserOrders, setBestUserOrders] = useState(null)
    const [bestUserGigs, setBestUserGigs] = useState(null)
    const [bestUserBalance, setBestUserBalance] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const users = await userService.getUsers()
            const gigs = await gigService.query()
            const orders = await orderBackendService.query()

            const oneMonthAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)

            const newUsersThisMonth = users.filter(user => user.createdAt > oneMonthAgo).length

            const userOrderCounts = {}
            const userGigCounts = {}

            users.forEach(user => {
                userOrderCounts[user._id] = orders.filter(order => order.sellerId === user._id && order.orderState === 'accepted').length
                userGigCounts[user._id] = gigs.filter(gig => gig.ownerId === user._id).length
            })

            const getMaxMinUsersBy = (dataObj, field = null, isMax = true) => {
                return users.reduce((accUser, currentUser) => {
                    const accValue = field ? accUser[field] : dataObj[accUser._id]
                    const currValue = field ? currentUser[field] : dataObj[currentUser._id]
                    return isMax ? (currValue > accValue ? currentUser : accUser) : (currValue < accValue ? currentUser : accUser)
                })
            }
            setTotalUsers(users.length)
            setNewUsersMonth(newUsersThisMonth)

            setBestUserRating(getMaxMinUsersBy({}, 'rating'))
            setBestUserOrders(getMaxMinUsersBy(userOrderCounts))
            setBestUserGigs(getMaxMinUsersBy(userGigCounts))
            setBestUserBalance(getMaxMinUsersBy({}, 'balance'))
        }
        fetchData()
    }, [])

    return (
        <section className="users-info grid">
            <InfoDiv title="Total users" info={totalUsers} />
            <InfoDiv title="New users this month" info={newUsersMonth} />

            <InfoDiv title="Best user (rating)" info={bestUserRating ? bestUserRating.username : 'Loading...'} />
            <InfoDiv title="Best user (orders)" info={bestUserOrders ? bestUserOrders.username : 'Loading...'} />
            <InfoDiv title="Best user (gigs)" info={bestUserGigs ? bestUserGigs.username : 'Loading...'} />
            <InfoDiv title="Best user (balance)" info={bestUserBalance ? bestUserBalance.username : 'Loading...'} />
        </section>
    )
}