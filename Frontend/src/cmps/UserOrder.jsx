import { useState, useEffect } from 'react'

import { DenialOrderModal } from "./DenialOrderModal.jsx"

import { gigService } from '../services/gig.service.js'

export function UserOrder({ order, acceptOrder, denyOrder, completeOrder }) {
    const [isDenied, setDenial] = useState(false)
    const [gigData, setGigData] = useState(null)

    useEffect(() => {
        (async () => {
            const fetchedGig = await gigService.getById(order.orderedGigId)
            setGigData(fetchedGig)
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
            <td>{order.buyerName}</td>
            <td>{order.title}</td>
            <td>{getActionDate(order)}</td>

            <td>{order.orderState === 'accepted' && gigData ? getDueDate(new Date(order.acceptedAt), gigData.daysToMake) : ''}</td>
            <td><span className={order.orderState}>{order.orderState}</span></td>

            <td>
                {order.orderState === 'pending' && (
                    <>
                        <button onClick={() => acceptOrder(order)}>Accept</button>
                        <button onClick={() => setDenial(true)}>Deny</button>
                    </>
                )}
                {order.orderState === 'accepted' && (
                    <button onClick={() => completeOrder(order)}>Complete</button>
                )}
                {isDenied && <DenialOrderModal order={order} denyOrder={(order, reason) => {
                    if (order) denyOrder(order, reason)
                    setDenial(false)
                }} />}
            </td>
        </tr>
    )
}