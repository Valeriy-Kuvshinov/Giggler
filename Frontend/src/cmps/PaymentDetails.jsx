import SvgIcon from './SvgIcon.jsx'

import { useState } from 'react'
import { useForm } from '../customHooks/useForm.js'

export function PaymentDetails() {
  const [paymentMethod, setPaymentMethod] = useState(true)

  const initialState = {
    crdNum: '1111222233334444',
    expDate: new Date().getMonth() + 1 + '/' + (new Date().getFullYear() % 100),
    pinCode: '123',
    firstName: 'Yaron',
    lastName: 'Biton',
  }

  const [fields, , handleChange] = useForm(initialState)
  const { crdNum, expDate, pinCode, firstName, lastName } = fields

  return (
    <section className="payment-details">
      <section className="details section-header">
        <span>Payment Options</span>
      </section>
      <section className="payment-methods">
        <article
          className="details credit-card"
          onClick={() => setPaymentMethod(true)}
        >
          <label className={`credit-type ${paymentMethod ? 'selected' : ''}`}>
            <input type="radio" className="credit" />
            {/* checked={paymentMethod} */}
            <span className="radio-btn"></span>
            <span className="text">Credit & Debit Cards</span>
            <SvgIcon iconName={'creditCardsIcon'} />
          </label>

          <div
            className={`details credit-info ${paymentMethod ? '' : 'hidden'}`}
          >
            <div className="credit-details">
              <div className="credit-number">
                <span>Card Number</span>
                <div className="card-number-input">
                  <span
                    className="card-logo"
                    style={{
                      backgroundImage:
                        'url("https://fiverr-res.cloudinary.com/image/upload/f_png,q_auto/v1/attachments/generic_asset/asset/2496be9dfb5983d9de91630d83bb21e0-1682945799754/generic.svg")',
                    }}
                  ></span>

                  <input
                    type="text"
                    name="crdNum"
                    value={crdNum}
                    onChange={handleChange}
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
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
          </div>
        </article>
        <article
          className="details paypal"
          onClick={() => setPaymentMethod(false)}
        >
          <label className={`credit-type ${!paymentMethod ? 'selected' : ''}`}>
            <input type="radio" className="credit" checked={paymentMethod} />
            <span className="radio-btn"></span>
            <SvgIcon iconName={'paypalIcon'} />
          </label>
        </article>
      </section>
    </section>
  )
}
