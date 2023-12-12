import { useEffect, useState, useRef } from 'react'
import outsideClick from '../customHooks/outsideClick.js'

import { utilService } from '../services/util.service.js'
import { userService } from '../services/user.service.js'

import SvgIcon from "./SvgIcon.jsx"

export function InvoiceModal({ order, onClose }) {
    const [seller, setSeller] = useState(null)
    const [buyer, setBuyer] = useState(null)

    const modalRef = useRef()
    outsideClick(modalRef, onClose)

    function handleModalClick(event) {
        event.stopPropagation()
    }

    useEffect(() => {
        async function fetchUserDetails() {
            try {
                if (order?.sellerId) {
                    const sellerInfo = await userService.getById(order.sellerId)
                    setSeller(sellerInfo)
                }
                if (order?.buyerId) {
                    const buyerInfo = await userService.getById(order.buyerId)
                    setBuyer(buyerInfo)
                }
            }
            catch (err) {
                console.error("Error fetching user's details:", err)
            }
        }
        if (order?.sellerId || order?.buyerId) fetchUserDetails()
    }, [order])

    function onSavePdf(event) {
        event.stopPropagation()
        console.log("invoice saved to pdf!")
    }

    return (
        <div className="modal-wrapper" onClick={handleModalClick}>
            <section className="invoice-modal flex column" ref={modalRef}>
                <button className="close-modal" onClick={onClose}>×</button>
                <div className="invoice-header flex row">
                    <h1 className="flex row">
                        Giggler
                        <span className="dot flex">
                            <SvgIcon iconName={'greenDotIcon'} />
                        </span>
                    </h1>
                    <h3 className="flex">Thank you for the purchase!</h3>
                    <button title="Save to pdf" onClick={(event) => onSavePdf(event)}>
                        <SvgIcon iconName={'savePdfIcon'} />
                    </button>
                </div>
                <div className="invoice-body flex column">
                    <div className='body-start grid'>
                        <div className='info-div flex'>
                            <h2>Invoice ID:</h2>
                            <p>{order?._id}</p>
                        </div>
                        <div className='info-div flex'>
                            <h2>Bill to:</h2>
                            <p>{buyer?.email || `${buyer?.fullName} (email not included)`}</p>
                        </div>
                    </div>

                    <div className='body-middle grid'>
                        <div className='info-div flex'>
                            <h2>Order title:</h2>
                            <p>{order?.title}</p>
                        </div>
                        <div className='info-div flex'>
                            <h2>Service provider:</h2>
                            <p>{seller?.fullName}</p>
                        </div>
                        <div className='info-div flex'>
                            <h2>Order accepted:</h2>
                            <p>{utilService.formatDate(order?.acceptedAt)}</p>
                        </div>
                        <div className='info-div flex'>
                            <h2>Order completed:</h2>
                            <p>{utilService.formatDate(order?.completedAt) || `Not completed yet...`}</p>
                        </div>
                    </div>

                    <div className='body-end grid'>
                        <div className='info-div flex'>
                            <h2>Payment method:</h2>
                            <p>{order?.paymentMethod || `Visa 1111`}</p>
                        </div>
                        <div className='info-div flex'>
                            <h2>Order price:</h2>
                            <p>{`$${order?.price}`}</p>
                        </div>
                        <div className='info-div flex'>
                            <h2>Total (VAT & fees):</h2>
                            <p>{`$${order?.price + 19}`}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}