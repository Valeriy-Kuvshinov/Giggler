import { useEffect, useState, useRef } from 'react'

export function InvoiceModal({ onClose }) {
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

    return (
        <div className="invoice-modal-wrapper">
            <section className="invoice-modal flex column" ref={modalRef}>
                <button onClick={onClose}>×</button>

                <h2>Share This Gig</h2>
                <p>Spread the word about this Gig on Giggler</p>
            </section>
        </div>
    )
}