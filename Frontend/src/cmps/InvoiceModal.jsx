import { useEffect, useState, useRef } from 'react'

import { utilService } from '../services/util.service.js'

import SvgIcon from "./SvgIcon.jsx"

export function InvoiceModal({ order, onClose }) {
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

    function onSavePdf(event) {
        event.stopPropagation()
        console.log("invoice saved to pdf!")
    }

    return (
        <div className="invoice-modal-wrapper">
            <section className="invoice-modal flex column" ref={modalRef}>
                <button onClick={onClose}>×</button>
                <div className="invoice-header">
                    <h1 className="flex row">
                        Giggler
                        <span className="flex">
                            <SvgIcon iconName={'greenDotIcon'} />
                        </span>
                    </h1>
                    <button title="Save to pdf" onClick={(event) => onSavePdf(event)}>
                        <SvgIcon iconName={'savePdfIcon'} />
                    </button>
                </div>
                <div className="invoice-info flex column">
                    <h2>Invoice ID: {order?._id}</h2>
                    <h2>Bill To: user@gmail.com</h2>
                    <h2>Order Title: {order?.title}</h2>
                    <h2>Order Seller: Gig owner</h2>
                    <h2>Order Accepted: {utilService.formatDate(order?.acceptedAt)}</h2>
                    <h2>Order Completed: {utilService.formatDate(order?.completedAt) || `Not completed yet...`}</h2>

                    <h2>Order Customer: Consumer</h2>
                    <h2>Payment Method: Visa 1111</h2>
                    <h2>Order Price: {`$${order?.price}`}</h2>
                    <h2>Total (VAT & fees): {`$${order?.price + 19}`}</h2>
                </div>
                <h3>Thank you for using Giggler!</h3>
            </section>
        </div>
    )
}