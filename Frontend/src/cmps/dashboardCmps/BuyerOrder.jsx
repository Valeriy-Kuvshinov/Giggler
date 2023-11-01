import { useState, useEffect } from 'react'

import { orderBackendService } from '../../services/order.backend.service.js'

export function BuyerOrder({ order }) {
    const [gigData, setGigData] = useState(null)
    const [sellerName, setSellerName] = useState('')

    useEffect(() => {
        (async () => {
            const orderDetails = await orderBackendService.getOrderDetails(order._id, 'seller')
            setGigData(orderDetails.gigData)
            setSellerName(orderDetails.name)
        })()
    }, [order])

    function getOrderClass(orderState) {
        const orderStateClasses = {
            'pending': 'pending user-order',
            'accepted': 'accepted user-order',
            'denied': 'denied user-order',
            'completed': 'completed user-order'
        }
        return orderStateClasses[orderState] || ''
    }

    function getActionDate(order) {
        let prefix = ''
        let dateStr = ''

        if (order.orderState === 'completed') {
            prefix = 'completed at '
            dateStr = new Date(order.completedAt).toLocaleDateString()
        }
        if (order.orderState === 'denied') {
            prefix = 'rejected at '
            dateStr = new Date(order.deniedAt).toLocaleDateString()
        }
        if (order.orderState === 'accepted') {
            prefix = 'accepted at '
            dateStr = new Date(order.acceptedAt).toLocaleDateString()
        }
        if (order.orderState === 'pending') {
            prefix = 'received at '
            dateStr = new Date(order.createdAt).toLocaleDateString()
        }
        return prefix + dateStr
    }

    function getDueDate(acceptedDate, daysToMake) {
        let days = 0
        if (daysToMake === 'Express 24H') days = 1
        else if (daysToMake === 'Up to 3 days') days = 3
        else if (daysToMake === 'Up to 7 days') days = 7
        return new Date(acceptedDate.getTime() + days * 24 * 60 * 60 * 1000).toLocaleDateString()
    }

    return (
        <tr className={getOrderClass(order.orderState)}>
            <td>{sellerName}</td>
            <td>{order.title}</td>
            <td>{getActionDate(order)}</td>

            <td>
                {(order.orderState === 'accepted' || order.orderState === 'completed') && gigData
                    ? getDueDate(new Date(order.acceptedAt), gigData.daysToMake)
                    : ''}
            </td>
            <td><span className={order.orderState}>{order.orderState}</span></td>
        </tr>
    )
}