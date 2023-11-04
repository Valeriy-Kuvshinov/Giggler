import { useState, useEffect, useRef } from 'react'

import { DenialOrderModal } from "./DenialOrderModal.jsx"
import SvgIcon from '../SvgIcon.jsx'

import { orderBackendService } from '../../services/order.backend.service.js'
import { gigService } from '../../services/gig.service.js'

export function SellerOrder({ order, acceptOrder, denyOrder, completeOrder }) {
    const [isDenied, setDenial] = useState(false)
    const [gigData, setGigData] = useState(null)
    const [buyerFirstName, setBuyerFirstName] = useState('')
    const [buyerLastName, setBuyerLastName] = useState('')
    const [buyerAvatar, setBuyerAvatar] = useState('')
    const [isDropdownVisible, setDropdownVisible] = useState(false)

    const dropdownButtonRef = useRef(null)
    const dropdownMenuRef = useRef(null)

    useEffect(() => {
        (async () => {
            try {
                const orderDetails = await orderBackendService.getOrderDetails(order._id, 'buyer')
                setBuyerFirstName(orderDetails.name.split(' ')[0])
                setBuyerLastName(orderDetails.name.split(' ')[1] || '')
                setBuyerAvatar(orderDetails.avatar)

                const gig = await gigService.getById(order.orderedGigId)
                const firstImgUrl = gig.imgUrls[0]

                setGigData({ ...gig, firstImgUrl })
            } catch (err) {
                console.error('Failed to fetch order or gig details:', err)
            }
        })()
    }, [order])

    useEffect(() => {
        function handleDropdownClick(event) {
            if (
                dropdownButtonRef.current && !dropdownButtonRef.current.contains(event.target) &&
                dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target)
            ) {
                setDropdownVisible(false)
            }
        }
        document.addEventListener('mousedown', handleDropdownClick)
        return () => {
            document.removeEventListener('mousedown', handleDropdownClick)
        }
    }, [])

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

    const getAvailableActions = () => {
        let actions = []
        if (order.orderState === 'pending') {
            actions = [
                { label: 'Accept', action: () => acceptOrder(order) },
                { label: 'Deny', action: () => setDenial(true) }
            ]
        } else if (order.orderState === 'accepted') {
            actions = [
                { label: 'Complete', action: () => completeOrder(order) }
            ]
        }
        return actions
    }

    return (
        <tr className={getOrderClass(order.orderState)}>
            <td>
                {gigData && gigData.firstImgUrl && (
                    <img src={gigData.firstImgUrl} alt="gig" />
                )}
            </td>
            <td>{order.title}</td>

            <td><img src={buyerAvatar} alt="buyer" /></td>
            <td className="flex column">
                <span>{buyerFirstName}</span>
                <span>{buyerLastName}</span>
            </td>
            <td>{getActionDate(order)}</td>

            <td>
                {(order.orderState === 'accepted' || order.orderState === 'completed') && gigData
                    ? getDueDate(new Date(order.acceptedAt), gigData.daysToMake)
                    : ''}
            </td>
            <td><span className={order.orderState}>{order.orderState}</span></td>

            <td>
                {getAvailableActions().length > 0 && (
                    <>
                        <button ref={dropdownButtonRef} onClick={() => setDropdownVisible(!isDropdownVisible)}>
                            <SvgIcon iconName={'orderDropdownIcon'} />
                        </button>
                        {isDropdownVisible && (
                            <div ref={dropdownMenuRef} className="dropdown-menu">
                                {getAvailableActions().map((action, idx) => (
                                    <button key={idx} onClick={action.action}>
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
                {isDenied && (
                    <DenialOrderModal
                        order={order}
                        denyOrder={(order, reason) => {
                            if (order) denyOrder(order, reason)
                            setDenial(false)
                        }}
                    />
                )}
            </td>
        </tr>
    )
}