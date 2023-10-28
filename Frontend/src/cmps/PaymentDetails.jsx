import SvgIcon from "./SvgIcon.jsx"

import { useState } from "react"
import { useForm } from "../customHooks/useForm.js"

export function PaymentDetails() {
  const [paymentMethod, setPaymentMethod] = useState(true)

  const initialState = {
    crdNum: "1111222233334444",
    expDate: new Date().getMonth() + 1 + "/" + (new Date().getFullYear() % 100),
    pinCode: "123",
    firstName: "yaron",
    lastName: "biton",
  }

  const [fields, , handleChange] = useForm(initialState)
  const { crdNum, expDate, pinCode, firstName, lastName } = fields

  return (
    <section className="payment-details">
      <section className="details one">
        <span>Payment Options</span>
      </section>

      <section className="details two" onClick={() => setPaymentMethod(true)}>
        <div className="credit-type">
          <input type="radio" className="credit" />
          <span className="radio-btn"></span>
          <span className="text">Credit & Debit Cards</span>
          <SvgIcon iconName={'creditCardsIcon'} />
        </div>
      </section>

      <section className={`details three ${paymentMethod ? '' : 'hidden'}`}>
        <div className="credit-details">
          <div className="credit-number">
            <span>Card Number</span>
            <input
              type="text"
              name="crdNum"
              value={crdNum}
              onChange={handleChange}
              placeholder="0000 0000 0000 0000"
            />
          </div>

          <div className="private">
            <div className="credit-date">
              <span>Expiration Date</span>
              <input
                type="text"
                name="expDate"
                value={expDate}
                onChange={handleChange}
                placeholder="MM/YY"
              />
            </div>

            <div className="credit-date">
              <span>Security Code</span>
              <input
                type="text"
                name="pinCode"
                value={pinCode}
                onChange={handleChange}
                placeholder="XXX"
              />
            </div>
          </div>

          <div className="private">
            <div className="buyer-info">
              <span>First Name</span>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              />
            </div>

            <div className="buyer-info">
              <span>Last Name</span>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="details four" onClick={() => setPaymentMethod(false)}>
        <div className="credit-type">
          <input type="radio" className="credit" />
          <span className="radio-btn"></span>
          <SvgIcon iconName={'paypalIcon'} />
        </div>
      </section>
    </section>
  )
}