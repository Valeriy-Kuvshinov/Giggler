import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gigService } from '../services/gig.service.js'
import { orderBackendService } from '../services/order.backend.service.js'
import { userService } from '../services/user.service.js'
import { InfoDiv } from "./InfoDiv.jsx"

export function UserDashboardInfo() {
    const [totalUsers, setTotalUsers] = useState(0)
    const [newUsersWeek, setNewUsersWeek] = useState(0)
    const [newUsersMonth, setNewUsersMonth] = useState(0)
    const [usersWithNoGigs, setUsersWithNoGigs] = useState(0)

    const [bestUserRating, setBestUserRating] = useState(null)
    const [bestUserOrders, setBestUserOrders] = useState(null)
    const [bestUserGigs, setBestUserGigs] = useState(null)
    const [bestUserBalance, setBestUserBalance] = useState(null)

    const [worstUserRating, setWorstUserRating] = useState(null)
    const [worstUserOrders, setWorstUserOrders] = useState(null)
    const [worstUserGigs, setWorstUserGigs] = useState(null)
    const [worstUserBalance, setWorstUserBalance] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const users = await userService.getUsers()
            const gigs = await gigService.query()
            const orders = await orderBackendService.query()

            const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)
            const oneMonthAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)

            const newUsersThisWeek = users.filter(user => user.createdAt > oneWeekAgo).length
            const newUsersThisMonth = users.filter(user => user.createdAt > oneMonthAgo).length

            const usersWithoutGigs = users.filter(user =>
                !gigs.some(gig => gig.ownerId === user._id)
            ).length

            const userOrderCounts = {}
            const userGigCounts = {}

            users.forEach(user => {
                userOrderCounts[user._id] = orders.filter(order => order.sellerId === user._id).length
                userGigCounts[user._id] = gigs.filter(gig => gig.ownerId === user._id).length
            })

            const getMaxMinUsersBy = (field, isMax = true) => {
                return users.reduce((accUser, currentUser) => {
                    return isMax ?
                        (currentUser[field] > accUser[field] ? currentUser : accUser) :
                        (currentUser[field] < accUser[field] ? currentUser : accUser)
                })
            }
            setTotalUsers(users.length)
            setNewUsersWeek(newUsersThisWeek)
            setNewUsersMonth(newUsersThisMonth)
            setUsersWithNoGigs(usersWithoutGigs)

            setBestUserRating(getMaxMinUsersBy('rating'))
            setBestUserOrders(getMaxMinUsersBy(userOrderCounts, true))
            setBestUserGigs(getMaxMinUsersBy(userGigCounts, true))
            setBestUserBalance(getMaxMinUsersBy('balance'))

            setWorstUserRating(getMaxMinUsersBy('rating', false))
            setWorstUserOrders(getMaxMinUsersBy(userOrderCounts, false))
            setWorstUserGigs(getMaxMinUsersBy(userGigCounts, false))
            setWorstUserBalance(getMaxMinUsersBy('balance', false))
        }
        fetchData()
    }, [])

    return (
        <section className="users-info grid">
            <InfoDiv title="Total users" info={totalUsers} />
            <InfoDiv title="New users in the past week" info={newUsersWeek} />
            <InfoDiv title="New users in the past month" info={newUsersMonth} />
            <InfoDiv title="Users with no gigs (customers)" info={usersWithNoGigs} />

            <InfoDiv title="Best user (rating)" info={bestUserRating ? bestUserRating.username : 'Loading...'} />
            <InfoDiv title="Best user (orders)" info={bestUserOrders ? bestUserOrders.username : 'Loading...'} />
            <InfoDiv title="Best user (gigs)" info={bestUserGigs ? bestUserGigs.username : 'Loading...'} />
            <InfoDiv title="Best user (balance)" info={bestUserBalance ? bestUserBalance.username : 'Loading...'} />

            <InfoDiv title="Worst user (rating)" info={worstUserRating ? worstUserRating.username : 'Loading...'} />
            <InfoDiv title="Worst user (orders)" info={worstUserOrders ? worstUserOrders.username : 'Loading...'} />
            <InfoDiv title="Worst user (gigs)" info={worstUserGigs ? worstUserGigs.username : 'Loading...'} />
            <InfoDiv title="Worst user (balance)" info={worstUserBalance ? worstUserBalance.username : 'Loading...'} />
        </section>
    )
}