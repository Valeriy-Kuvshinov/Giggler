import { useState, useEffect } from "react"
import { InfoDiv } from "./InfoDiv.jsx"
import { orderBackendService } from '../services/order.backend.service.js'

export function FinanceDashboardInfo() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        async function fetchOrders() {
            const allOrders = await orderBackendService.query()
            setOrders(allOrders)
        }
        fetchOrders()
    }, [])

    const today = new Date()
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()

    const oneDay = 24 * 60 * 60 * 1000
    const endOfYesterday = startOfDay - oneDay
    const startOfYesterday = endOfYesterday - oneDay

    const oneWeek = 7 * 24 * 60 * 60 * 1000
    const startOfWeek = startOfDay - oneWeek
    const endOfLastWeek = startOfWeek
    const startOfLastWeek = endOfLastWeek - oneWeek

    const oneMonth = 30 * 24 * 60 * 60 * 1000
    const startOfMonth = startOfDay - oneMonth
    const endOfLastMonth = startOfMonth
    const startOfLastMonth = endOfLastMonth - oneMonth

    // Calculate profits
    const orderProfitToday = orders.filter(order => order.createdAt >= startOfDay)
        .reduce((sum, order) => sum + order.price, 0)

    const orderProfitYesterday = orders.filter(order => order.createdAt >= startOfYesterday && order.createdAt < endOfYesterday)
        .reduce((sum, order) => sum + order.price, 0)

    const orderProfitThisWeek = orders.filter(order => order.createdAt >= startOfWeek)
        .reduce((sum, order) => sum + order.price, 0)

    const orderProfitLastWeek = orders.filter(order => order.createdAt >= startOfLastWeek && order.createdAt < endOfLastWeek)
        .reduce((sum, order) => sum + order.price, 0)

    const orderProfitThisMonth = orders.filter(order => order.createdAt >= startOfMonth)
        .reduce((sum, order) => sum + order.price, 0)

    const orderProfitLastMonth = orders.filter(order => order.createdAt >= startOfLastMonth && order.createdAt < endOfLastMonth)
        .reduce((sum, order) => sum + order.price, 0)

    const getDifferenceDisplay = (current, previous) => {
        const difference = current - previous
        const sign = difference >= 0 ? '+' : '-'
        return `(${sign}$${Math.abs(difference).toFixed(2)})`
    }

    return (
        <section className="finance-info grid">
            <InfoDiv title="New orders today" info={orders.filter(order => order.createdAt >= startOfDay).length} />
            <InfoDiv title="New orders this week" info={orders.filter(order => order.createdAt >= startOfWeek).length} />
            <InfoDiv title="New orders this month" info={orders.filter(order => order.createdAt >= startOfMonth).length} />
            <InfoDiv
                title="Order profits (daily)"
                info={`$${orderProfitToday.toFixed(2)} ${getDifferenceDisplay(orderProfitToday, orderProfitYesterday)}`}
            />
            <InfoDiv
                title="Order profits (weekly)"
                info={`$${orderProfitThisWeek.toFixed(2)} ${getDifferenceDisplay(orderProfitThisWeek, orderProfitLastWeek)}`}
            />
            <InfoDiv
                title="Order profits (monthly)"
                info={`$${orderProfitThisMonth.toFixed(2)} ${getDifferenceDisplay(orderProfitThisMonth, orderProfitLastMonth)}`}
            />
            <InfoDiv
                title="Orders pending"
                info={orders.filter(order => order.orderState === 'pending').length}
            />
            <InfoDiv
                title="Orders denied"
                info={orders.filter(order => order.orderState === 'denied').length}
            />
            <InfoDiv
                title="Orders accepted"
                info={orders.filter(order => order.orderState === 'accepted').length}
            />
        </section>
    )
}