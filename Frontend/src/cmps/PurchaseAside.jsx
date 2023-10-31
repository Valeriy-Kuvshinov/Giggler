import SvgIcon from './SvgIcon.jsx'
import { packages } from '../services/gig.service.js'
import { Link } from 'react-router-dom'

export function PurchaseAside({
  gig,
  createOrder,
  packageChoice,
  handleSubmit,
  paymentMethod,
}) {
  if (gig === null) return <div>loading...</div>

  function onConfirmPayment() {
    createOrder()
  }
  console.log('packages: ', packages)
  console.log('packageChoice: ', packageChoice)

  return (
    <aside className="purchase-aside-wrapper">
      <section className="purchase-aside">
        <section className="gig">
          <div className="purchase-header">
            <img src={gig.imgUrls[0]} alt={gig.title} />
            <p>{gig.title}</p>
          </div>
          <div className="purchase-package-price">
            <span className="b">{packages[packageChoice].type}</span>
            <span>${packages[packageChoice].price * gig.price}</span>
          </div>

          <ul className="features">
            {packages[packageChoice].features.map((feature, idx) => (
              <li key={idx}>
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
            <div className="service-fee">
              <span className="row-title">
                Service fee
                {/* <SvgIcon iconName={'questionMarkIcon'} /> */}
              </span>
              <span className="price">
                ${parseFloat(packages[packageChoice].price * gig.price * 0.1).toFixed(2)}
              </span>
            </div>

            <div className="vat-fee">
              <span className="row-title">
                VAT
                {/* <SvgIcon iconName={'questionMarkIcon'} /> */}
              </span>
              <span className="price">
                ${parseFloat(packages[packageChoice].price * gig.price * 0.1).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="summary-footer">
            <div className="total-fee">
              <span>You'll pay</span>
              <span>${parseFloat(packages[packageChoice].price * gig.price * 1.2).toFixed(2)}</span>
            </div>

            <div className="delivery-time">
              <span>Total Delivery Time</span>
              <span>{packages[packageChoice].time}</span>
            </div>
          </div>
          <Link to={`/`}>
            <button
              className={`confirm-btn ${!paymentMethod ? 'paypal' : ''}`}
              onClick={() => {
                onConfirmPayment()
                handleSubmit()
              }}
            >
              {paymentMethod && 'Confirm & Pay'}
              {!paymentMethod && <SvgIcon iconName={'paypalIconWhite'} />}
            </button>
          </Link>
          <div className="secure-payment">
            <SvgIcon iconName={'lockIcon'} />
            <span>SSL Secure Payment</span>
          </div>
        </section>
      </section>
    </aside>
  )
}
