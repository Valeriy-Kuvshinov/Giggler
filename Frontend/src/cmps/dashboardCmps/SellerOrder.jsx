import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { DenialOrderModal } from "./DenialOrderModal.jsx"
import SvgIcon from '../SvgIcon.jsx'

import { orderBackendService } from '../../services/order.backend.service.js'
import { gigService } from '../../services/gig.service.js'

export function SellerOrder({ order, acceptOrder, denyOrder, completeOrder }) {
    const [isDenied, setDenial] = useState(false)
    const [gigData, setGigData] = useState(null)
    const [userData, setUserData] = useState(null)
    const [isDropdownVisible, setDropdownVisible] = useState(false)

    const dropdownButtonRef = useRef(null)
    const dropdownMenuRef = useRef(null)

    useEffect(() => {
        (async () => {
            try {
                const orderDetails = await orderBackendService.getOrderDetails(order._id, 'buyer')

                setUserData({
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

    return (
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
            <td><span className={order.orderState}>{order.orderState}</span></td>

            <td>
                {orderBackendService.getAvailableActions(order).length > 0 && (
                    <>
                        <button ref={dropdownButtonRef} onClick={() => setDropdownVisible(!isDropdownVisible)}>
                            <SvgIcon iconName={'orderDropdownIcon'} />
                        </button>
                        {isDropdownVisible && (
                            <div ref={dropdownMenuRef} className="dropdown-menu">
                                {orderBackendService.getAvailableActions(order).map((action, idx) => (
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