import orderIcon from '../assets/img/svg/order.icon.svg'
import acceptIcon from '../assets/img/svg/accept.icon.svg'
import denyIcon from '../assets/img/svg/deny.icon.svg'

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

    const oneWeek = 7 * 24 * 60 * 60 * 1000
    const startOfWeek = startOfDay - oneWeek

    const oneMonth = 30 * 24 * 60 * 60 * 1000
    const startOfMonth = startOfDay - oneMonth

    return (
        <section className="info-divs grid">
            <InfoDiv title="New orders this week"
                info={orders.filter(order => order.createdAt >= startOfWeek).length}
                imgSrc={orderIcon} />
            <InfoDiv title="New orders this month"
                info={orders.filter(order => order.createdAt >= startOfMonth).length}
                imgSrc={orderIcon} />

            <InfoDiv
                title="Orders denied"
                info={orders.filter(order => order.orderState === 'denied').length}
                imgSrc={denyIcon} />
            <InfoDiv
                title="Orders accepted"
                info={orders.filter(order => order.orderState === 'accepted').length}
                imgSrc={acceptIcon} />
        </section>
    )
}