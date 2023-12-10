const noResultsImg = 'https://res.cloudinary.com/dgwgcf6mk/image/upload/v1701539881/Giggler/other/bzqrborygalzssnmogax.png'

import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useDeviceType } from "../customHooks/DeviceTypeContext.jsx"

import { orderService } from "../services/order.service.js"
import { loadOrders } from "../store/order.actions.js"

import { Loader } from "../cmps/Loader.jsx"
import { BuyerOrder } from "../cmps/BuyerOrder.jsx"
import { InvoiceModal } from "../cmps/InvoiceModal.jsx"
import { ReviewSubmit } from "../cmps/ReviewSubmit.jsx"

export function BuyerDashboard() {
    const [orderDetails, setOrderDetails] = useState({})
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [selectedGig, setSelectedGig] = useState(null)
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
    const [isReviewModalOpen, setIsRevieweModalOpen] = useState(false)

    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector((storeState) => storeState.orderModule.orders)

    const deviceType = useDeviceType()

    useEffect(() => {
        async function fetchOrders() {
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
        async function fetchOrderDetails() {
            for (const order of orders) {
                if (order.buyerId === loggedInUser._id) {
                    setOrderDetails((prevDetails) => ({
                        ...prevDetails,
                        [order._id]: { isLoading: true },
                    }))
                    try {
                        const details = await orderService.getOrderDetails(
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

    const displayedOrders = orders.filter(order => order.buyerId === loggedInUser._id)

    if (!allDetailsLoaded) return <Loader />

    if (displayedOrders.length === 0) {
        return (
            <main className="seller-dashboard-page full flex column">
                <div className="no-results">
                    <h3>Whoops, you haven't ordered anything yet!</h3>
                    <img src={noResultsImg} alt="no results" />
                    <p>Perhaps your next service is one click away from discovery!</p>
                    <Link to={`/explore`}>Explore the Market</Link>
                </div>
            </main>
        )
    }

    return (
        <main className="buyer-dashboard-page full flex column">
            <h3>Manage Your Orders</h3>
            <section className={`buyer-orders-list ${deviceType} layout-row flex column`}>
                {orders.map(order => order.buyerId === loggedInUser._id &&
                    <BuyerOrder
                        key={order._id}
                        order={order}
                        details={orderDetails[order._id]}
                        onClickReceipt={onClickReceipt}
                        onClickReview={onClickReview}
                        isFrom='orders'
                    />)
                }
            </section>
            {isInvoiceModalOpen &&
                <InvoiceModal order={selectedOrder} onClose={closeInvoice} />}
            {isReviewModalOpen &&
                <ReviewSubmit gig={selectedGig}
                    loggedInUser={loggedInUser} order={selectedOrder} onClose={closeReview} />}
        </main>
    )
}