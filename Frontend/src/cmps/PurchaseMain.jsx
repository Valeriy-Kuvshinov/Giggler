import SvgIcon from './SvgIcon.jsx'
import creditCardImage from '../../src/assets/img/credit.card.png'
import { useState } from 'react'

export function PurchaseMain() {
  const [paymentMethod, setPaymentMethod] = useState(true)

  const initialState = {
    crdNum: '1111222233334444',
    expDate: `${new Date().getMonth() + 1}/${new Date().getFullYear() % 100}`,
    pinCode: '123',
    firstName: 'Yaron',
    lastName: 'Biton',
  }

  const handlePaymentMethodChange = (isCreditCard) => {
    setPaymentMethod(isCreditCard)
  }

  return (
    <section className="purchase-main">
      <section className="details section-header">
        <span>Payment Options</span>
      </section>
      <section className="payment-methods">
        <article
          className="details credit-card"
          onClick={() => handlePaymentMethodChange(true)}
        >
          <label className={`credit-type ${paymentMethod ? 'selected' : ''}`}>
            <input
              type="radio"
              className="credit"
              checked={paymentMethod}
              onChange={() => handlePaymentMethodChange(true)}
            />
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
                      backgroundImage: `url(${creditCardImage})`,
                      width: '2em',
                      height: '2em',
                    }}
                  ></span>
                  <input
                    type="text"
                    name="crdNum"
                    value={initialState.crdNum}
                    readOnly
                  />
                </div>
              </div>

              <div className="private">
                <div className="credit-date">
                  <span>Expiration Date</span>
                  <input
                    type="text"
                    name="expDate"
                    value={initialState.expDate}
                    readOnly
                  />
                </div>

                <div className="credit-date">
                  <span>Security Code</span>
                  <input
                    type="text"
                    name="pinCode"
                    value={initialState.pinCode}
                    readOnly
                  />
                </div>
              </div>

              <div className="private">
                <div className="buyer-info">
                  <span>First Name</span>
                  <input
                    type="text"
                    name="firstName"
                    value={initialState.firstName}
                    readOnly
                  />
                </div>

                <div className="buyer-info">
                  <span>Last Name</span>
                  <input
                    type="text"
                    name="lastName"
                    value={initialState.lastName}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
        <article
          className="details paypal"
          onClick={() => handlePaymentMethodChange(false)}
        >
          <label className={`credit-type ${!paymentMethod ? 'selected' : ''}`}>
            <input
              type="radio"
              className="credit"
              checked={!paymentMethod}
              onChange={() => handlePaymentMethodChange(false)}
            />
            <span className="radio-btn"></span>
            <SvgIcon iconName={'paypalIcon'} />
          </label>
        </article>
      </section>
    </section>
  )
}
