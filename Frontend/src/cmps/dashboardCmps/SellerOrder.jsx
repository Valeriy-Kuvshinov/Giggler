import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { DenialOrderModal } from "./DenialOrderModal.jsx"

import { orderBackendService } from '../../services/order.backend.service.js'
import { gigService } from '../../services/gig.service.js'

export function SellerOrder({ order, acceptOrder, denyOrder, completeOrder, windowWidth }) {
    const [isDenied, setDenial] = useState(false)
    const [gigData, setGigData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [isDropdownVisible, setDropdownVisible] = useState(false)

    const dropdownMenuRef = useRef(null)

    useEffect(() => {
        (async () => {
            try {
                const orderDetails = await orderBackendService.getOrderDetails(order._id, 'buyer')

                setUserData({
                    username:orderDetails.userData.username,
                    firstName: orderDetails.userData.fullName.split(' ')[0],
                    lastName: orderDetails.userData.fullName.split(' ')[1] || '',
                    avatar: orderDetails.userData.imgUrl,
                    _id: orderDetails.userData._id
                })
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

    function getAvailableActions(order) {
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
        windowWidth > 600 ? (
            <tr className={orderBackendService.getOrderClass(order.orderState)}>
                <td>
                    {gigData && gigData.firstImgUrl && (
                        <img src={gigData.firstImgUrl} alt="gig" />
                    )}
                </td>
                <td>
                    {gigData ? (
                        <Link to={`/gig/${gigData._id}`}>
                            {gigData.title}
                        </Link>
                    ) : null}
                </td>
                <td><img src={userData && userData.avatar} alt="buyer" /></td>

                <td className="flex column">
                    {userData && (
                        <Link to={`/user/${userData._id}`}>
                            <span>{userData.firstName}</span>
                            <span>{userData.lastName}</span>
                        </Link>
                    )}
                </td>
                <td>{orderBackendService.getActionDate(order)}</td>
                <td>
                    {(order.orderState === 'accepted' || order.orderState === 'completed') && gigData
                        ? orderBackendService.getDueDate(new Date(order.acceptedAt), gigData.daysToMake)
                        : ''}
                </td>
                <td>{`${order.price}$`}</td>
                <td>
                    <div className="order-state-dropdown">
                        <span
                            className={`order-state-label ${order.orderState}`}
                            onClick={() => setDropdownVisible(!isDropdownVisible)}
                        >
                            {order.orderState}
                        </span>
                        {isDropdownVisible && (
                            <div ref={dropdownMenuRef} className="dropdown-menu flex column">
                                {getAvailableActions(order).map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={action.action}
                                        className={`dropdown-action ${action.label}`}
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </td>
                {isDenied && (
                    <DenialOrderModal
                        order={order}
                        denyOrder={(order, reason) => {
                            if (order) denyOrder(order, reason)
                            setDenial(false)
                        }}
                    />
                )}
            </tr>
        ) : (
            <div className={`user-order grid ${orderBackendService.getOrderClass(order.orderState)}`}>
                <img src={gigData && gigData.firstImgUrl} alt="gig" className="order-image" />
                <div className="order-price">
                    {`$${order.price}`}
                </div>
                <div className="order-title">
                    {gigData ? (
                        <Link to={`/gig/${gigData._id}`}>{gigData.title}</Link>
                    ) : null}
                </div>
                <div className="order-buyer flex row">
                    <img src={userData && userData.avatar} alt="buyer" className="buyer-avatar" />
                    {userData && (
                        <Link to={`/user/${userData._id}`} className="buyer-name flex row">
                            {`${userData.username}`}
                        </Link>
                    )}
                </div>
                <div className="order-date flex row">
                    {orderBackendService.getActionDate(order)}
                </div>
                {/* <div className="order-due flex row">
                    {(order.orderState === 'accepted' || order.orderState === 'completed') && gigData
                        ? `Due: ${orderBackendService.getDueDate(new Date(order.acceptedAt), gigData.daysToMake)}`
                        : ''}
                </div> */}
                <div className="order-state-dropdown flex column">
                    <span
                        className={order.orderState}
                        onClick={() => setDropdownVisible(!isDropdownVisible)}
                    >
                        {order.orderState}
                    </span>
                    {isDropdownVisible && (
                        <div ref={dropdownMenuRef} className="dropdown-menu">
                            {getAvailableActions(order).map((action, idx) => (
                                <button
                                    key={idx}
                                    onClick={action.action}
                                    className={`dropdown-action ${action.label}`}
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {isDenied && (
                    <DenialOrderModal
                        order={order}
                        denyOrder={(order, reason) => {
                            if (order) denyOrder(order, reason)
                            setDenial(false)
                        }}
                    />
                )}
            </div>
        )
    )
}