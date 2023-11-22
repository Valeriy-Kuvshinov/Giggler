import { useEffect, useState, useRef } from 'react'

import { utilService } from '../services/util.service.js'
import { userService } from '../services/user.service.js'

import SvgIcon from "./SvgIcon.jsx"

export function InvoiceModal({ order, onClose }) {
    const [seller, setSeller] = useState(null)
    const [buyer, setBuyer] = useState(null)

    const modalRef = useRef()

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClose])

    function handleModalClick(event) {
        event.stopPropagation()
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (order?.sellerId) {
                    const sellerInfo = await userService.getById(order.sellerId)
                    setSeller(sellerInfo)
                }
                if (order?.buyerId) {
                    const buyerInfo = await userService.getById(order.buyerId)
                    setBuyer(buyerInfo)
                }
            } catch (err) {
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
        <div className="invoice-modal-wrapper" onClick={handleModalClick}>
            <section className="invoice-modal flex column" ref={modalRef}>
                <button className="close-modal" onClick={onClose}>×</button>
                <div className="invoice-header flex row">
                    <h1 className="flex row">
                        Giggler
                        <span className="flex">
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
                        <div className='info-div-one flex column'>
                            <h2>Invoice ID</h2>
                            <p>{order?._id}</p>
                        </div>
                        <div className='info-div-two flex column'>
                            <h2>Bill to</h2>
                            <p>{buyer?.email || `${buyer?.fullName} (email not included)`}</p>
                        </div>
                    </div>

                    <div className='body-middle grid'>
                        <div className='info-div-one flex column'>
                            <h2>Order Title</h2>
                            <p>{order?.title}</p>
                        </div>
                        <div className='info-div-two flex column'>
                            <h2>Service Provider</h2>
                            <p>{seller?.fullName}</p>
                        </div>
                        <div className='info-div-three flex column'>
                            <h2>Order Accepted</h2>
                            <p>{utilService.formatDate(order?.acceptedAt)}</p>
                        </div>
                        <div className='info-div-four flex column'>
                            <h2>Order Completed</h2>
                            <p>{utilService.formatDate(order?.completedAt) || `Not completed yet...`}</p>
                        </div>
                    </div>

                    <div className='body-end grid'>
                        <div className='info-div-one flex column'>
                            <h2>Payment Method</h2>
                            <p>{order?.paymentMethod || `Visa 1111`}</p>
                        </div>
                        <div className='info-div-two flex column'>
                            <h2>Order Price</h2>
                            <p>{`$${order?.price}`}</p>
                        </div>
                        <div className='info-div-three flex column'>
                            <h2>Total (VAT & fees)</h2>
                            <p>{`$${order?.price + 19}`}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}