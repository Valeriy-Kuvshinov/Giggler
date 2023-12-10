import { Link } from "react-router-dom"

import { useDeviceType } from "../customHooks/DeviceTypeContext.jsx"

import SvgIcon from "./SvgIcon.jsx"

export function BuyerOrder({ order, details, onClickReceipt, onClickReview, isFrom }) {
    const deviceType = useDeviceType()

    if (!details || details.isLoading) return null

    return (
        <>
            {isFrom === 'orders' ? (
                <div className={`buyer-order ${deviceType} grid`}>
                    <Link
                        className="order-title"
                        to={`/gig/${details.gigData._id}`}
                    >
                        {details.gigData.title}
                    </Link>
                    <div className="order-image">
                        <img src={details.gigData.imgUrls?.[0]} alt="Gig" />
                    </div>

                    <div className="order-id flex row">
                        <span>ID:</span>
                        <span>{order._id}</span>
                    </div>

                    <div className="category-name flex row">
                        <span>Category:</span>
                        <span>{details.gigData.category}</span>
                    </div>

                    <div className="seller-name flex row">
                        <span>Seller:</span>
                        <span>
                            <Link to={`/user/${details.userData._id}`}>
                                {`@${details.userData.username}`}
                            </Link>
                        </span>
                    </div>

                    <div className={`order-status ${order.orderState} flex row`}>
                        <span>Status:</span>
                        <span className={`${order.orderState}`}>{order.orderState}</span>
                    </div>

                    <div className="order-options flex row">
                        {(order.orderState === 'accepted' ||
                            order.orderState === 'completed' ||
                            order.orderState === 'reviewed') && (
                                <span className="invoice-icon" title="Order Invoice"
                                    onClick={(event) => onClickReceipt(event, order)}>
                                    <SvgIcon iconName={'receiptIcon'} />
                                </span>
                            )}
                        {(order.orderState === 'completed') && (
                            <span className="review-icon" title="Review Order"
                                onClick={(event) => onClickReview(event, order)}>
                                <SvgIcon iconName={'reviewIcon'} />
                            </span>
                        )}
                    </div>
                </div>
            ) : (
                <div className="buyer-order grid">
                    <div className="order-image">
                        <img src={details.gigData.imgUrls?.[0]} alt="Gig" />
                        {(order.orderState === 'accepted' ||
                            order.orderState === 'completed' ||
                            order.orderState === 'reviewed') && (
                                <span className="invoice-icon" title="Order Invoice"
                                    onClick={(event) => onClickReceipt(event, order)}>
                                    <SvgIcon iconName={'receiptIcon'} />
                                </span>
                            )}
                        {(order.orderState === 'completed') && (
                            <span className="review-icon" title="Review Order"
                                onClick={(event) => onClickReview(event, order)}>
                                <SvgIcon iconName={'reviewIcon'} />
                            </span>
                        )}
                    </div>
                    <Link
                        className="order-title"
                        to={`/gig/${details.gigData._id}`}
                    >
                        {details.gigData.title}
                    </Link>
                    <div className="seller-name flex row">
                        <span>By</span>
                        <span>
                            <Link to={`/user/${details.userData._id}`}>
                                {`${details.userData.username}`}
                            </Link>
                        </span>
                    </div>
                    <div className={`order-status ${order.orderState}`}>
                        {order.orderState}
                    </div>
                </div>
            )}
        </>
    )
}