import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { orderBackendService } from "../services/order.backend.service.js"
import { loadOrders } from "../store/order.actions.js"

import { Loader } from "./Loader.jsx"
import SvgIcon from "./SvgIcon.jsx"
import { InvoiceModal } from "./InvoiceModal.jsx"
import { ReviewSubmit } from "./ReviewSubmit.jsx"

export function BuyerOrders({ loggedInUser, onClose }) {
  const [orderDetails, setOrderDetails] = useState({})
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedGig, setSelectedGig] = useState(null)
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
  const [isReviewModalOpen, setIsRevieweModalOpen] = useState(false)

  const orders = useSelector((storeState) => storeState.orderModule.orders)

  useEffect(() => {
    const fetchOrders = async () => {
      if (loggedInUser) {
        try {
          await loadOrders({ buyerId: loggedInUser._id })
        } catch (err) {
          console.error("Error loading orders:", err)
        }
      }
    }
    fetchOrders()
  }, [loggedInUser])

  useEffect(() => {
    const fetchOrderDetails = async () => {
      for (const order of orders) {
        if (order.buyerId === loggedInUser._id) {
          setOrderDetails((prevDetails) => ({
            ...prevDetails,
            [order._id]: { isLoading: true },
          }))
          try {
            const details = await orderBackendService.getOrderDetails(
              order._id,
              "seller"
            )
            setOrderDetails((prevDetails) => ({
              ...prevDetails,
              [order._id]: {
                isLoading: false,
                gigData: details.gigData,
                userData: details.userData,
              },
            }))
          } catch (err) {
            console.error("Failed to fetch order or gig details:", err)
            setOrderDetails((prevDetails) => ({
              ...prevDetails,
              [order._id]: { isLoading: false, error: err },
            }))
          }
        }
      }
    }
    if (orders.some((order) => order.buyerId === loggedInUser._id)) {
      fetchOrderDetails()
    }
  }, [orders, loggedInUser])
  // Check if all the relevant orders have their details loaded
  const allDetailsLoaded = orders.every(
    (order) =>
      order.buyerId !== loggedInUser._id ||
      (orderDetails[order._id] && !orderDetails[order._id].isLoading)
  )

  function onClickReceipt(event, order) {
    event.stopPropagation()
    setSelectedOrder(order)
    setIsInvoiceModalOpen(true)
  }

  function onClickReview(event, order) {
    event.stopPropagation()
    const orderedGigData = orderDetails[order._id].gigData
    setSelectedGig(orderedGigData)
    setSelectedOrder(order)
    setIsRevieweModalOpen(true)
  }

  function closeInvoice() {
    setIsInvoiceModalOpen(false)
  }

  function closeReview() {
    setIsRevieweModalOpen(false)
  }

  if (!allDetailsLoaded) {
    return (
      <section className="buyer-orders-list flex column">
        <Loader />
      </section>
    )
  }

  return (
    <section className="buyer-orders-list flex column" onClick={onClose}>
      <div className="list-contents flex column">
        {orders
          .filter((order) => order.buyerId === loggedInUser._id)
          .map((order) => {
            const details = orderDetails[order._id]
            if (details && !details.isLoading) {
              return (
                <div key={order._id} className="buyer-order grid">
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
                  {details ? (
                    <Link
                      className="order-title"
                      to={`/gig/${details.gigData._id}`}
                    >
                      {details.gigData.title}
                    </Link>
                  ) : null}
                  <div className="seller-name">
                    {`By ${details.userData.username}`}
                  </div>
                  <div className={`order-status ${order.orderState}`}>{order.orderState}</div>
                </div>
              )
            } else {
              return <p>No orders yet, go & explore the place!</p>
            }
          })}
      </div>
      {isInvoiceModalOpen && <InvoiceModal order={selectedOrder} onClose={closeInvoice} />}
      {isReviewModalOpen && <ReviewSubmit gig={selectedGig}
        loggedInUser={loggedInUser} order={selectedOrder} onClose={closeReview} />}
    </section>
  )
}