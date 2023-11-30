import { Link } from "react-router-dom"

import SvgIcon from "./SvgIcon.jsx"

export function BuyerOrder({ order, details, onClickReceipt, onClickReview }) {
    if (!details || details.isLoading) return null

    return (
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
            <div className="seller-name">
                {`By ${details.userData.username}`}
            </div>
            <div className={`order-status ${order.orderState}`}>
                {order.orderState}
            </div>
        </div>
    )
}