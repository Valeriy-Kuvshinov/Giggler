import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gigService } from '../services/gig.service.js'
import { orderBackendService } from '../services/order.backend.service.js'
import { userService } from '../services/user.service.js'
import { InfoDiv } from "./InfoDiv.jsx"

import userIcon from '../assets/img/svg/user.icon.svg'
import newUserIcon from '../assets/img/svg/new.user.icon.svg'
import kingIcon from '../assets/img/svg/king.icon.svg'

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
        <section className="info-divs grid">
            <InfoDiv title="Total users"
                info={totalUsers ? `${totalUsers} users overall` : '0'}
                imgSrc={userIcon} />
            <InfoDiv title="New users this month"
                info={newUsersMonth ? `${newUsersMonth} new users` : '0'}
                imgSrc={newUserIcon} />

            <InfoDiv title="Best user - by rating"
                info={bestUserRating ? <>
                    {bestUserRating.username}
                    <br />
                    (ID: {bestUserRating._id})
                </> : 'Loading...'}
                imgSrc={kingIcon} />

            <InfoDiv title="Best user - by orders"
                info={bestUserOrders ? <>
                    {bestUserOrders.username}
                    <br />
                    (ID: {bestUserOrders._id})
                </> : 'Loading...'}
                imgSrc={kingIcon} />

            <InfoDiv title="Best user - by gigs"
                info={bestUserGigs ? <>
                    {bestUserGigs.username}
                    <br />
                    (ID: {bestUserGigs._id})
                </> : 'Loading...'}
                imgSrc={kingIcon} />

            <InfoDiv title="Best user - by balance"
                info={bestUserBalance ? <>
                    {bestUserBalance.username}
                    <br />
                    (ID: {bestUserBalance._id})
                </> : 'Loading...'}
                imgSrc={kingIcon} />
        </section>
    )
}