import { Link } from 'react-router-dom'

import { packages } from '../services/gig.service.js'

import SvgIcon from './SvgIcon.jsx'

export function PurchaseAside({ gig, createOrder, packageChoice,
  handleSubmit, paymentMethod }) {
  function onConfirmPayment() {
    createOrder()
  }

  return (
    <aside className="purchase-aside-wrapper">
      <section className="purchase-aside">
        <section className="purchased-gig">
          <div className="purchase-header flex">
            <img src={gig.imgUrls[0]} alt={gig.title} />
            <p>{gig.title}</p>
          </div>
          <div className="purchase-package-price flex">
            <span className="b">{packages[packageChoice].type}</span>
            <span>${packages[packageChoice].price * gig.price}</span>
          </div>

          <ul className="features">
            {packages[packageChoice].features.map((feature, idx) => (
              <li className="flex row" key={idx}>
                <SvgIcon
                  iconName={
                    packages[packageChoice].featuresCond[idx]
                      ? 'checked'
                      : 'unchecked'
                  }
                />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section className="payment-summary">
          <div className="summary-table">
            <div className="service-fee flex">
              <span className="row-title">
                Service fee
              </span>
              <span className="price">
                ${parseFloat(packages[packageChoice].price * gig.price * 0.1).toFixed(2)}
              </span>
            </div>

            <div className="vat-fee flex">
              <span className="flex">
                VAT
              </span>
              <span className="flex">
                ${parseFloat(packages[packageChoice].price * gig.price * 0.1).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="summary-footer">
            <div className="total-fee flex">
              <span>You'll pay</span>
              <span>${parseFloat(packages[packageChoice].price * gig.price * 1.2).toFixed(2)}</span>
            </div>

            <div className="delivery-time flex">
              <span>Total Delivery Time</span>
              <span>{gig.daysToMake}</span>
            </div>
          </div>
          <Link to={`/`}>
            <button
              className={`confirm-btn ${!paymentMethod ? 'paypal flex' : ''}`}
              onClick={() => {
                onConfirmPayment()
                handleSubmit()
              }}
            >
              {paymentMethod && 'Confirm & Pay'}
              {!paymentMethod && <SvgIcon iconName={'paypalIconWhite'} />}
            </button>
          </Link>
          <div className="secure-payment flex">
            <SvgIcon iconName={'lockIcon'} />
            <span>SSL Secure Payment</span>
          </div>
        </section>
      </section>
    </aside>
  )
}